import React from 'react';
import styles from './ToggleSideDrawer.module.css';

const toggleSideDrawer = (props) => (
    <div className={styles.DrawerToggle} onClick = {props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);
export default toggleSideDrawer