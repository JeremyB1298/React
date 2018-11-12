import React from 'react'
import App from './App';

function ResetButton (props){
 
  
      return (
            <button
            onClick={() => props.onClick()}>
            Reset
            </button>
        )
    

}

export default ResetButton