import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart, updateStock } from './actions/cartActions'
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/home.scss";

class Home extends Component {

    handleClick = (id,stock) => {
        this.props.addToCart(id);
        this.props.updateStock(stock);
        alert('Item added to cart!');
        return stock - 1;
    }

    render() {
        let itemList = this.props.items.map(item => {
            return (
                    <div className="col-lg-3 mb-3" key={item.id}>
                        <div className="card-image">
                            <img className="w-100" src={item.img} alt={item.title} />
                        <i className="fas fa-shopping-cart"></i>
                            <span className="card-title">{item.title}</span>
                        
                        </div>
                    
                        <div className="card-content py-2">
                            <p>{item.desc}</p>
                            <p className="mb-0"><b>Category: {item.cat}</b></p>
                            <p><b>Price: £{item.price}</b></p>
                            {/* <p><b>{item.stock}</b></p> */}
                        <span to="/" className="addToCart p-2 text-light mb-2" onClick={() => { this.handleClick(item.id,item.stock) }}><FontAwesomeIcon icon={faShoppingCart} />&nbsp;Add to cart</span>
                        </div>
                    </div>


            )
        })

        return (
            <div className="container">
                <h3 className="text-center py-3 text-uppercase">Our items</h3>
                <div className="row">
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.items
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id) => { dispatch(addToCart(id)) },
        updateStock: (stock) => { dispatch(updateStock(stock)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)