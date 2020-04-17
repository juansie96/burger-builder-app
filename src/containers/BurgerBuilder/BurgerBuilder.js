import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionCreator from "../../store/actions/index";
import { connect } from "react-redux";

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // axios.get('https://react-my-burger-1c4ec.firebaseio.com/ingredients.json').then(response => {
    //     this.setState({ingredients: response.data})
    // }).catch(error => {this.setState({error: true})});
  }

  updatePurchaseState(ingredients) {
    const ingredientValues = Object.values(ingredients);

    const sum = ingredientValues.reduce((sum, el) => {
      return sum + el;
    }, 0);

    console.log(sum);

    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    
    this.props.history.push('/checkout');
    
  };

  render() {
    const disabledButtons = { ...this.props.ings };

    for (let key in disabledButtons) {
      disabledButtons[key] = disabledButtons[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded. Try again later.</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addIngRef={this.props.onIngredientAdded}
            removeIngRef={this.props.onIngredientRemoved}
            disabled={disabledButtons}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }

    if (this.state.loading) orderSummary = <Spinner />;

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(actionCreator.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actionCreator.removeIngredient(ingName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
