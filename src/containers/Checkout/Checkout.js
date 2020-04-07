import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {},
  };

  componentDidMount() {
    this.parseIngredientsMS();
  }

  // Instructor method to parse the query ingredients to the state
  parseIngredientsMS = () => {
    const ingredients = {};

    const query = new URLSearchParams(this.props.location.search);
    for (let param of query) {
      ingredients[param[0]] = +param[1];
    }

    this.setState({ ingredients: ingredients });
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
      <CheckoutSummary
        ingredients={this.state.ingredients}
        checkoutCancelled={this.checkoutCancelledHandler}
        checkoutContinued={this.checkoutContinuedHandler}
      />
    );
  }
}

export default Checkout;