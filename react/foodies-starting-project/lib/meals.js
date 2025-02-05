import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs';

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM meals').all(); //'all' is used if you are fetching data, multiple rows, 'get' is for just one row
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug); //? is a place holder, helps to prevent injection of sql
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, {lover:true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    //saving image to the file system
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error) {
            throw new Error('Saving image failed!');
        }
    });

    //save other data to the database
    meal.image = `/images/${fileName}`; //just save the path in the db

    db.prepare(`
        INSERT INTO meals (title, summary, instructions, creator, creator_email, image,slug)
        VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
        `).run(meal);
    
}