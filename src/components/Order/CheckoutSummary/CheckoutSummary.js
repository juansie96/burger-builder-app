import React from 'react';

import styles from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';


const checkoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>Hope it test wells!</h1>
            <div style={{width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} /> 
                <Button
                    buttonType="Danger"
                    clicked>CANCEL
                </Button>
                <Button
                    buttonType="Success"
                    clicked>CONTINUE
                </Button>
            </div>
        </div>
    );
}

export default checkoutSummary;