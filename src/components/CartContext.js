import { useState, createContext, useEffect } from "react"

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])
    const [cartTotal, setCartTotal] = useState(0)
    const [chosenRestaurant, setChosenRestaurant] = useState('')
    //
    const [userInfo, setUserInfo] = useState([])

    const calculateTotal = (price) => {
        setCartTotal(cartTotal + price)
    }

    useEffect(() => {
        const cartItems = window.localStorage.getItem('cartItems');
        if (cartItems !== null) {
            setCartItems(JSON.parse(cartItems));
        }
        const cartTotal = window.localStorage.getItem('cartTotal');
        if(cartTotal !== null) {
            setCartTotal(JSON.parse(cartTotal));
        }
        const chosenRestaurant = window.localStorage.getItem('chosenRestaurant');
        if(chosenRestaurant !== null) {
            setCartTotal(JSON.parse(chosenRestaurant));
        }
      }, []);

    useEffect(() => {
        window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }, [cartItems]);

    useEffect(() => {
        window.localStorage.setItem('cartTotal', JSON.stringify(cartTotal));
    }, [cartTotal]);

    useEffect(() => {
        window.localStorage.setItem('chosenRestaurant', JSON.stringify(chosenRestaurant));
    }, [chosenRestaurant]);


    const addToCart = (name, price, quantity) => {
        const exists = cartItems.find(element => element.name === name)
        if (exists) {
            setCartItems(
                cartItems.map((element) => 
                    element.name === name ? {...exists, quantity: exists.quantity + quantity} : element,
                    calculateTotal(price*quantity)
                )
            )
        } else {
            setCartItems((prevState) => [...prevState, {name, price, quantity}])
            calculateTotal(price*quantity)
        }
        
    }

    const clearCart = () => {
        setCartItems([])
        setCartTotal(0)
    }

    const setRestaurant = (chosenRestaurantId) => {
        setChosenRestaurant(chosenRestaurantId)
    }

    

    return(
        <CartContext.Provider value={{ cartItems, addToCart, clearCart, cartTotal, userInfo, setRestaurant}}>{children}</CartContext.Provider>
    );
}

export default CartContext;