import React from 'react';
import styles from './Input.module.css'

const input = (props) => {

    let inputElement = null;
    const inputClasses = [styles.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) inputClasses.push(styles.Invalid)

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={styles.ValidationError}> Please enter a valid {props.formElement} </p>;
    }

    switch (props.elementType) {
        
        case ('input'): 
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;

        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;

        case ('select'):
            inputElement = (
                <select
                    className={styles.InputElement}
                    value={props.value}
                    onChange={props.changed} >
                    {/* Create a select option for each option on the array. */}
                   { props.elementConfig.options.map(option => (
                        <option
                            key={option.value}
                            value={option.value}>
                                {option.displayValue}
                        </option>
                    )) };
                </select>
            );
            break;

        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}></label>
            { inputElement }
            { validationError }
        </div>
    );
} 

export default input;