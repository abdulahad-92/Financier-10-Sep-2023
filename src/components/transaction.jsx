import React from 'react'
import Pen from './icons/pen.svg'
import Trash from './icons/trash.svg'

export default function Transaction(props) {
  return (
    <div id={props.Id} className={props.class}>
        <div id = "transaction_details">
            <h1 className={props.arr[0]}>{props.description}</h1><h1 className={props.arr[0]}>{props.cash}</h1>
        </div>
            <span  className="edit_box" onClick={props.modify}><i className="edit"><img src={Pen} alt="" srcSet="" /></i></span>
            <span  className="trash_box" onClick = {props.dlt}><i className="trash"><img src={Trash} alt="" srcSet="" /></i></span>
            <span id={props.arr[1]}></span>
    </div>
  )
}
