import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


class BurgerBuilder extends Component {

    state = {
        ingredients: null, 
        totalPrice: 4, 
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://react-my-burger-1c4ec.firebaseio.com/ingredients.json').then(response => {
            this.setState({ingredients: response.data})
        }).catch(error => {this.setState({error: true})});
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

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {

        this.setState({ loading: true });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Juan Manuel Sierra',
                age: '22',
                email: 'juansie.96@gmail.com'
            }
        }

        axios.post('/orders.json', order)
        .then(response => this.setState({ loading: false, purchasing: false }))
        .catch(error => this.setState({ loading: false, purchasing: false }));
        
    }


    render (){

        const disabledButtons = {...this.state.ingredients};

        for (let key in disabledButtons) {
            disabledButtons[key] = disabledButtons[key]<=0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded. Try again later.</p> : < Spinner / >

        if (this.state.ingredients) {
            burger = (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    addIngRef={this.addIngredientHandler} 
                    removeIngRef={this.removeIngredientHandler} 
                    disabled={disabledButtons} 
                    price={this.state.totalPrice} 
                    purchasable={this.state.purchasable} 
                    ordered={this.purchaseHandler}/>
            </Aux>
        ); 
            orderSummary = <OrderSummary 
                    ingredients={this.state.ingredients}
                    purchaseCanceled = {this.purchaseCancelHandler}
                    purchaseContinued = {this.purchaseContinueHandler}
                    price = {this.state.totalPrice} />;
        }

        if (this.state.loading) orderSummary = < Spinner / > ;

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    { orderSummary }
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);