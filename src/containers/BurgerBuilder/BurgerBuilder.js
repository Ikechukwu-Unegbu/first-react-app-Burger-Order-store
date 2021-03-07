import React, {Component} from 'react';
import Auxi from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axious-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES ={
  salad:0.5,
  cheese:1,
  meat:2,
  bacon:0.7
};

class BurgerBuilder extends Component{
  // constructor(props){
  //   super(props);
  //   this.state ={...}
  // }

  state = {
    ingredients:{
      salad:0,
      bacon:0,
      cheese:0,
      meat:0
    },
    totalPrice:4,
    purchasable:false,
    purchasing:false,
    loading:false
  }

  uptdatePurchaseState(ingredients){
   
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el)=>{
        return sum + el;
      }, 0);
      this.setState({purchasable:sum>0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceDeduction;

    this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
    this.uptdatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) =>{
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0){
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
    this.uptdatePurchaseState(updatedIngredients);
  }
  
  purchaseHandler =() =>{
    this.setState({purchasing:true});
  }

  purchaseCancelHandler = () =>{
    this.setState({purchasing:false});
  }

  purchaseContinueHandler = () =>{

    this.setState({loading:true});

    const order = {
      ingredients:this.state.ingredients,
      price:this.state.totalPrice,
      customer:{
        name:'Ikechukwu Vincent',
        address:{
          streets:'Opp. Ankys Bread',
          zipcode:'4895409',
          coutry:'Nigeria'
        }, 
        email:'test@test.com'
      },
      deliveryMethod:'By air'
    }
    //alert('you continue!');
    // axios.post('/orders.json', order)
    //   .then(response => {
    //     this.setState({loading:false,
    //         purchasing:false});
    //   })
    //   .catch(error => {
    //     this.setState({loading:false});
    //   });

  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary =  <OrderSummary 
    ingredients={this.state.ingredients}
    purchaseCancelled={this.purchaseCancelHandler}
    purchaseContinue={this.purchaseContinueHandler}
    price={this.state.totalPrice}/>

    if(this.state.loading){
      orderSummary = <Spinner/>;
    }
    return (
      <Auxi>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          ingredientsAdded={this.addIngredientHandler}
          ingredientsRemoved={this.removeIngredientHandler} 
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}/>
      </Auxi>
    );
  }
}
 
export default BurgerBuilder;