import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./css/checkout.scss";
//import { addShipping } from './actions/cartActions'
class Recipe extends Component{
    
    constructor(props) {
        super(props)

        this.textInput = React.createRef();
        this.state = {
            value: ''
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.setState({ value: this.textInput.current.value })
        if (this.state.value === 'PROMO') {
            if (this.props.total >= 0) {
                this.props.substractShipping();
                alert('£5 discount added!');
                document.querySelector('.submitPromo').innerHTML = "DISCOUNT ADDED!";
                document.querySelector('.shippingCost').innerHTML = "£5 discount";
            }
        } 
    };
               
    

    render(){
  
        return(
            <div className="container">
                <div className="collection row">
                    <div className="collection-item list-unstyled">
                            <label>
                                <form onSubmit={this.handleSubmit}>
                                    <input type="text" ref={this.textInput} />
                                    <button className="submitPromo text-light py-1">Submit</button>
                                    <p className="smText">Promo code for £5 discount (Hint: PROMO)</p>
                                </form>
                            </label>
                    </div>
                    <div className="collection-item list-unstyled w-100"><b>Total: £{Math.round(this.props.total)}</b></div>
                    <div className="shippingCost ml-0 smText"></div>
                </div>
                <div className="checkout row  mb-4">
                    <button className="checkOut py-1 text-light mt-2">Checkout</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        addedItems: state.addedItems,
        total: state.total
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'})},
        substractShipping: ()=>{dispatch({type: 'SUB_SHIPPING'})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Recipe)