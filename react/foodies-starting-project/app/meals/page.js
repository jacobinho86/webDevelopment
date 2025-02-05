import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';

async function Meals() {
    const meals = await getMeals();

    return <MealsGrid meals={meals} />;
}

export default function MealsPage() {

   

    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious Melas, Created{' '}
                    <span className={classes.highlight}>by You!</span>
                </h1>
                <p>Choose your favorite recipe and cook it yourself. Have fun!</p>
                <p className={classes.cta}> 
                    <Link href="/meals/share">
                        Share Your Favorite Recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
                    <Meals />
                </Suspense>
            </main>
        </>
    );
}