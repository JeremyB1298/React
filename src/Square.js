import React from 'react'
import App from './App';

function Square (props){
 
  
      return (
            <button
                className = "case"
                onClick={() => props.onClick()}
            >
            {props.value}
            </button>
        )
    

}

export default Square