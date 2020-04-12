import React, { Component } from 'react';

import axios from "../../../axios-orders";
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
     
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your name...'
                    },
                    value: '',
                    validation: {
                        required: true
                    }, 
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    }, 
                    valid: false,
                    touched: false
                },
                zipcode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    }, 
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    }, 
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email'
                    },
                    value: '',
                    validation: {
                        required: true
                    }, 
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    validation: {},
                    valid: true,
                    value: 'fastest'
                }
        },
            formIsValid:false,
            loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true });


        const orderData = {};

        for (let orderFormElement in this.state.orderForm) {
            orderData[orderFormElement] = this.state.orderForm[orderFormElement].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: orderData
        }

        // Guardamos
        axios.post('/orders.json', order)
        .then(response => this.setState({ loading: false }))
        .catch(error => this.setState({ loading: false }));

        this.props.history.push("/");

    }

    // Metodo para checkear la validez del form input
    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) {
            isValid = true; 
        }

        if (rules.required !== undefined) {
           isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
           isValid = value.length >= rules.minLength && isValid   
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {

        // Cargamos el objeto orderForm en una nueva variable para no mutar el original
        const updatedOrderForm = { ...this.state.orderForm };

        // Hacemos lo mismo con el elemento que se actualizo del orderform
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] }


        // Actualizamos valor, checkeamos validez y actualizamos estado
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;

        // Cargamos el formElement actualizado
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        this.setState( { orderForm: updatedOrderForm, formIsValid: formIsValid } );

    }

    render() {

        const formElementsArray = [];
        
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
              {formElementsArray.map(formElement => (
                  <Input 
                    key={formElement.id}
                    formElement={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
              ))}
              <Button buttonType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.state.loading) form = ( <Spinner /> );
        
        return (
          <div className={styles.ContactData}>
            <h4>Enter your Contact Data</h4>
            { form }
          </div>
        );
    }


}

export default ContactData;