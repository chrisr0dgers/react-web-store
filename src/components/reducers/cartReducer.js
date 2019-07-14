import Item1 from '../../images/item1.jpg'
import Item2 from '../../images/item2.jpg'
import Item3 from '../../images/item3.jpg'
import Item4 from '../../images/item4.jpg'
import Item5 from '../../images/item5.jpg'
import Item6 from '../../images/item6.jpg'
import Item7 from '../../images/item1.jpg'
import Item8 from '../../images/item2.jpg'
import Item9 from '../../images/item3.jpg'
import Item10 from '../../images/item4.jpg'
import Item11 from '../../images/item5.jpg'
import Item12 from '../../images/item5.jpg'
import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_SHIPPING, UPDATE_STOCK } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        { id: 1, title: 'Leather Jacket', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 54.99, cat: 'Coats & Jackets',stock: 6, img: Item1 },
        { id: 2, title: 'Blue T-shirts', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 8, cat: 'T-shirts',stock: 11, img: Item2 },
        { id: 3, title: 'Black Jeans', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 32.99, cat: 'Jeans',stock: 8, img: Item3 },
        { id: 4, title: 'Brown Shoes', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 29.99, cat: 'Shoes',stock: 7, img: Item4 },
        { id: 5, title: 'Blue Jeans', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 32.99, cat: 'Jeans',stock: 2, img: Item5 },
        { id: 6, title: 'Black Shoes', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 25, cat: 'Shoes', stock: 10, img: Item6 },
        { id: 7, title: 'Trainers', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 38.99, cat: 'Shoes', stock: 9, img: Item7 },
        { id: 9, title: 'Parka Jacket', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 49.99, cat: 'Coats & Jackets', stock: 8, img: Item8 },
        { id: 10, title: 'Bed Slippers', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 9.99, cat: 'Shoes', stock: 20, img: Item9 },
        { id: 11, title: 'Pink T-shirt', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 8, cat: 'T-shirts', stock: 5, img: Item10 },
        { id: 12, title: 'Yellow T-shirt', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 8, cat: 'T-shirts', stock: 6, img: Item11 },
        { id: 13, title: 'Red T-shirt', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 8, cat: 'T-shirts', stock: 6, img: Item12 }
        
    ],
    addedItems: [],
    total: 0

}
const cartReducer = (state = initState, action) => {

    if (action.type === UPDATE_STOCK){

    }

    //INSIDE HOME COMPONENT
    if (action.type === ADD_TO_CART) {
        let addedItem = state.items.find(item => item.id === action.id)
        //check if the action id exists in the addedItems
        let existed_item = state.addedItems.find(item => action.id === item.id)
        if (existed_item) {
            addedItem.quantity += 1
            // addedItem.stock -= 1;
            return {
                ...state,
                total: state.total + addedItem.price
            }
        }
        else {
            addedItem.quantity = 1;
            // addedItem.stock -= 1;
            //calculating the total
            let newTotal = state.total + addedItem.price

            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal
            }

        }
    }
    if (action.type === REMOVE_ITEM) {
        let itemToRemove = state.addedItems.find(item => action.id === item.id)
        let new_items = state.addedItems.filter(item => action.id !== item.id)

        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)
        console.log(itemToRemove)
        return {
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if (action.type === ADD_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)
        addedItem.quantity += 1
        let newTotal = state.total + addedItem.price
        return {
            ...state,
            total: newTotal
        }
    }
    if (action.type === SUB_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)
        //if the qt == 0 then it should be removed
        if (addedItem.quantity === 1) {
            let new_items = state.addedItems.filter(item => item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                total: newTotal
            }
        }

    }

    if (action.type === ADD_SHIPPING) {
        return {
            ...state,
            total: state.total + 5
        }
    }

    if (action.type === 'SUB_SHIPPING') {
        return {
            ...state,
            total: state.total - 5
        }
    }

    else {
        return state
    }

}

export default cartReducer