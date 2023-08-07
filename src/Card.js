import React, {useState} from 'react';
import axios from 'axios';
import './Card.css'
const Card = ({name, image}) => {
    


    return (
        <div className="card" >
            <img 
       className="card"
       alt={name}
       src={image}
       />
        </div>
       
    )
}

export default Card;