import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


class BurgerBuilder extends Component {

    state = {
        ingredients: {
            bacon: 0,
            cheese: 0,
            meat: 0,
            salad: 0
        }, totalPrice: 4, purchasable: false
    }

    updatePurchaseState(ingredients) {

        const ingredientValues = Object.values(ingredients);

        const sum = ingredientValues.reduce((sum,el) => {return sum + el} , 0);

        console.log(sum);

        this.setState({purchasable: sum>0})

    }

    addIngredientHandler = (type) => {

        const updatedCount = this.state.ingredients[type] + 1;

        // Nuevo object para no mutar el objeto original
        const newIngredients = {...this.state.ingredients};


        newIngredients[type] = updatedCount;

        //Update new price
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        // Update state
        this.setState({ingredients: newIngredients, totalPrice: updatedPrice})

        this.updatePurchaseState(newIngredients);
    }

    removeIngredientHandler = (type) => {

        const updatedCount = this.state.ingredients[type] - 1;

        // Nuevo object para no mutar el objeto original
        const newIngredients = { ...this.state.ingredients };

        newIngredients[type] = updatedCount;

        // Update new price
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        
        // Update state
        this.setState({ ingredients: newIngredients, totalPrice: updatedPrice })

        this.updatePurchaseState(newIngredients);
        
    }

    render (){

        const disabledButtons = {...this.state.ingredients};

        for (let key in disabledButtons) {
            disabledButtons[key] = disabledButtons[key]<=0;
        }
        

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>

                <BuildControls addIngRef={this.addIngredientHandler} removeIngRef={this.removeIngredientHandler} disabled= {disabledButtons} price={this.state.totalPrice} purchasable={this.state.purchasable}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;