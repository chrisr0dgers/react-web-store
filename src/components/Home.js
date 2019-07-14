import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart, updateStock } from './actions/cartActions'
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/home.scss";

class Home extends Component {

    handleClick = (id,stock) => {
        this.props.addToCart(id);
        // this.props.updateStock(stock);
        alert('Item added to cart!');
        
        // return stock - 1;
    }

    render() {

        let itemList = this.props.items.map(item => {
            return (
                    <div className="col-lg-4 col-md-4 col-sm-6 mb-3 text-center" key={item.id}>
                        <div className="card-image">
                            <img className="m-auto d-block" src={item.img} alt={item.title} />
                        </div>
                    
                        <div className="card-content py-2">
                            <h3 className="card-title mb-1 mt-2">{item.title}</h3>
                            <p>{item.desc}</p>
                            <p className="mb-0"><b>Category: {item.cat}</b></p>
                            <p><b>Price: £{item.price}</b></p>
                            {/* <p><b>{item.stock}</b></p> */}
                        <span to="/" className="addToCart p-2 text-light mb-2" onClick={() => { this.handleClick(item.id,item.stock) }}><FontAwesomeIcon icon={faShoppingCart} />&nbsp;Add to cart</span>
                        </div>
                        <hr></hr>
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