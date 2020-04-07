import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'
import { Route } from 'react-router-dom';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentWillMount() {
    this.parseIngredientsMS();
  }

  // Instructor method to parse the query ingredients to the state
  parseIngredientsMS = () => {
    const ingredients = {};

    const query = new URLSearchParams(this.props.location.search);

    let price = 0;

    for (let param of query) {
        if (param[0] === 'price') {
            price = param[1];
        } else {
                ingredients[param[0]] = +param[1];
        }
    }

    this.setState({ ingredients: ingredients, totalPrice: price });
  };

  // Personal method to parse the query ingredients to the state
  parseIngredientsJS = () => {
    const ingredients = {};
    const searchQuery = this.props.history.location.search;

    let arrQuery = searchQuery.split("&");
    arrQuery[0] = arrQuery[0].replace("?", "");

    let ingredient, ingKey, ingValue;
    arrQuery.forEach((ing) => {
      ingredient = ing.split("=");
      ingKey = ingredient[0];
      ingValue = parseInt(ingredient[1]);
      ingredients[ingKey] = ingValue;
    });

    this.setState({ ingredients: ingredients });
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
        <div>
            <CheckoutSummary
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
            />

            <Route 
            path={this.props.match.url + '/contact-data'} 
            render={() => ( <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...this.props} /> )} /> 
        </div>
      
    );
  }
}

export default Checkout;