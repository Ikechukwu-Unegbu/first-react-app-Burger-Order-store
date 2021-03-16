import React from 'react';

import Burger from '../Burger/Burger';
import classes from './CheckoutSummary.css';
import Button from '../UI/Button/Button';

const checkoutSummmary = (props)=>{
  return (
    <div className={classes.checkoutSummmary}>
      <h2 style={{textAlign:'center'}}>We hope you enjoy your burger</h2>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <div style={{textAlign:'center'}}>
        <Button btnType="Danger" clicked>Cancel</Button>
        <Button btnType="Success" clicked>Continue</Button>
      </div>
    </div>
  );
}

export default checkoutSummmary;