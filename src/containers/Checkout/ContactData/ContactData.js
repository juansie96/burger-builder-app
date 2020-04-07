import React, { Component } from 'react';

import axios from "../../../axios-orders";
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {
     
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }, loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Juan Manuel Sierra',
                address: {
                    street: 'Angelo de Peredo 73',
                    zipcode: '5000',
                    country: 'Argentina'
                },
                email: 'juanmsierra96@gmail.com',
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
        .then(response => this.setState({ loading: false }))
        .catch(error => this.setState({ loading: false }));

        this.props.history.push("/");

    }

    render() {

        let form = (
            <form>
              <input className={styles.Input} type="text" name="name" placeholder="Enter your name..." />
              <input className={styles.Input} type="email" name="email" placeholder="Enter your email..." />
              <input className={styles.Input} type="text" name="street" placeholder="Enter your street..." />
              <input className={styles.Input} type="text" name="postal" placeholder="Enter your postal..." />
              <Button 
              buttonType="Success"
              clicked={this.orderHandler}>ORDER</Button>
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