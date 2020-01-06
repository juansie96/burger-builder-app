import React from 'react';
import styles from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import ToggleSideDrawer from '../SideDrawer/ToggleSideDrawer/ToggleSideDrawer'

const toolbar = (props) => (
    <header className = {styles.Toolbar}>
        <ToggleSideDrawer clicked = {props.toggleSD}/>
        <div className={styles.Logo}>
            <Logo />
        </div>
        <nav className={styles.DesktopOnly}><NavigationItems /></nav>
    </header>
);

export default toolbar;