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

                        <div className="col-lg-12 list-unstyled mb-3 cartItem" key={item.id}>
                            <div className="cartItem_img float-left pr-2">
                                <img src={item.img} alt={item.img} className="w-75" />
                            </div>

                            <div className="cartItem_details float-left">
                                <h3 className="title">{item.title}</h3>
                                <p>{item.desc}</p>
                                <div className="add-remove">
                                    
                                </div>
                                <ul className="p-0 m-0 list-unstyled">
                                    <li className="d-inline-block mr-2"><b>Price:</b> £{item.price}</li>
                                    <li className="d-inline-block mr-3"><b>Quantity:</b> {item.quantity}</li>
                                    <li className="d-inline-block">
                                        <Link className="mr-2 cartItem_details--add" to="/cart"><FontAwesomeIcon onClick={() => { this.handleAddQuantity(item.id) }} icon={faArrowUp} /></Link>
                                        <Link className="cartItem_details--subtract" to="/cart"><FontAwesomeIcon onClick={() => { this.handleSubtractQuantity(item.id) }} icon={faArrowDown} /></Link>
                                    </li>
                                </ul>
                                <p>Items left in stock: {itemStock}</p>
                                <button className="removeItem py-1 text-light mt-2 remove" onClick={() => { this.handleRemove(item.id) }}>Remove</button>

                                <hr></hr>
                            </div>
                            
                        </div>

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
                    <h3 className="my-2 mt-4">Your cart contains {this.props.items.length} item(s):</h3>
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