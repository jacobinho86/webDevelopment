'use server';  //this directive creates a 'server action', meaning, it will only execute in the server side
import { revalidatePath } from "next/cache";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";

function isInvalidText(text){
  return !text || text.trim() === '';
}

/*all of these functions will be server actions!*/
export async function shareMeal(prevState, formData) {
        
    //formData.get method expects identefiers of the form 'name' property
    const meal = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      creator: formData.get('name'), 
      creator_email: formData.get('email'),
    };

    if (isInvalidText(meal.title) || 
      isInvalidText(meal.summary) ||
      isInvalidText(meal.instructions) ||
      isInvalidText(meal.creator) ||
      isInvalidText(meal.creator_email) ||
      !meal.creator_email.includes('@') ||
      !meal.image || meal.image.size === 0) {
        return {
          message: 'Invalid Input.'
        }; //returning a serializeble object to the form
    }

    await saveMeal(meal);
    revalidatePath('/meals'); //tell nextjs to recreate the cache version of the calling page
    redirect('/meals');
}