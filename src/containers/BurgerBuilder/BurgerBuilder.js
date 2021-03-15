import React, {Component} from 'react';
import Auxi from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axious-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
    ingredients:null,
    totalPrice:4,
    purchasable:false,
    purchasing:false,
    loading:false,
    error:null
  }

  //A good place for fetch data from a backend server
  //is componentDidMount()
  componentDidMount(){
    axios.get('https://react-burger-ik-default-rtdb.firebaseio.com/ingredients.json')
      .then(response=> {
          this.setState({ingredients:response.data})
      })
      .catch(err=>{
        this.setState({error:err});
      });
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
    alert('you continue!');
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading:false,
            purchasing:false});
      })
      .catch(error => {
        this.setState({loading:false});
      });

  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    //Adding a variable to control what loads while the 
    //apps waits for ingredients from the backend server
    let burger = this.state.error? <p>ingredients can't be loaded</p>: <Spinner/>;

    if(this.state.ingredients){
      burger = (
        <Auxi>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls 
            ingredientsAdded={this.addIngredientHandler}
            ingredientsRemoved={this.removeIngredientHandler} 
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}/>
          </Auxi>);

          orderSummary =  <OrderSummary 
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.state.totalPrice}/>
    }
    if(this.state.loading){
      orderSummary = <Spinner/>;
    }    

    return (
      <Auxi>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxi>
    );
  }
}
 
export default withErrorHandler(BurgerBuilder, axios);