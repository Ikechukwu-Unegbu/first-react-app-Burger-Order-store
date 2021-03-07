import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxi from '../Auxi/Auxi';

const withErrorHandler = (WrappedComponent)=>{

  return (props)=>{
    return(
      <Auxi>
        <Modal>
          Something went wrong...
        </Modal>
        <WrappedComponent {...props}/>
      </Auxi>
    );
  }
}