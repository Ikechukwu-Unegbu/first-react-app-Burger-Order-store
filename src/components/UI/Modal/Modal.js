import React, {Component} from 'react';
import classes from './Modal.css';
import Auxi from '../../../hoc/Auxi/Auxi';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component{
 shouldComponentUpdate(nextProps, nextState){
   return nextProps.show !== this.props.show || this.props.children !== nextProps.children;
 }

 componentWillUpdate(){
   console.log('modal will update');
 }
 
  render(){
    return(
      <Auxi> 
        <Backdrop show={this.props.show}
                clicked={this.props.modalClosed}/>
        <div 
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1':'0'
              }}
              className={classes.Modal}>
    
          {this.props.children}
        </div>
     </Auxi>
   
    );
  }
}
export default Modal;