import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.module.css'

const navigationItem = (props) => (
    <li className = {styles.NavigationItem}>
        <NavLink
        to={props.link}
        exact={props.exact}
        activeClassName={styles.active}
        className = {props.active ? styles.active : null}>
            {props.children}</NavLink>
    </li>
);

export default navigationItem;