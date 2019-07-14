import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem, addQuantity, subtractQuantity } from './actions/cartActions'
import Recipe from './recipe'
import { faArrowUp, faArrowDown  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/cart.scss";

class Cart extends Component {

    //to remove the item completely
    handleRemove = (id) => {
        this.props.removeItem(id);
    }
    //to add the quantity
    handleAddQuantity = (id) => {
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id) => {
        this.props.subtractQuantity(id);
    }
    render() {

        let addedItems = this.props.items.length ?
            (
                this.props.items.map(item => {
                    let itemStock = item.stock - item.quantity;
                    return (

                        <li className="col-lg-3 list-unstyled mb-3" key={item.id}>
                            <div className="item-img">
                                <img src={item.img} alt={item.img} className="w-100" />
                            </div>

                            <div className="item-desc">
                                <span className="title">{item.title}</span>
                                <p>{item.desc}</p>
                                <p><b>Price: {item.price}$</b></p>
                                <p>
                                    <b>Quantity: {item.quantity}</b>
                                </p>
                                <p>Items left in stock: {itemStock}</p>
                                <div className="add-remove">
                                    <Link className="mr-3" to="/cart"><FontAwesomeIcon onClick={() => { this.handleAddQuantity(item.id) }} icon={faArrowUp} /></Link>
                                    <Link  to="/cart"><FontAwesomeIcon onClick={() => { this.handleSubtractQuantity(item.id) }} icon={faArrowDown} /></Link>
                                </div>
                                <button className="removeItem py-1 text-light mt-2 remove" onClick={() => { this.handleRemove(item.id) }}>Remove</button>
                            </div>
                            
                        </li>

                    )
                })
            ) :

            (
                <div className="col-lg-6 ">
                    <p>Basket is empty</p>
                </div>
                
            )
        return (
            <div className="container">
                <div className="cart">
                    <h3 className="my-2">Your cart contains {this.props.items.length} items:</h3>
                    <hr></hr>
                    <ul className="row p-0">
                        {addedItems}
                    </ul>
                </div>
                <Recipe />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        items: state.addedItems,
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) => { dispatch(removeItem(id)) },
        addQuantity: (id) => { dispatch(addQuantity(id)) },
        subtractQuantity: (id) => { dispatch(subtractQuantity(id)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)