import React from 'react'
import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = props => {

    let transformatedIngredients = Object.keys(props.ingredients).map(
        igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (transformatedIngredients.length === 0) transformatedIngredients = <p>Please add ingredients</p>;

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformatedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

export default burger;