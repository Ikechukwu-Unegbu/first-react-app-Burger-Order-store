import React from 'react';

import classes from './NavigationItems.css';
import NavItem from './NavItem/NavItem';

const navigationItems =()=>(
  <ul className={classes.NavigationItems}>
    <NavItem link="/" active>Burger Builder</NavItem>
    <NavItem link="/">Account</NavItem>
  </ul>
);

export default navigationItems;