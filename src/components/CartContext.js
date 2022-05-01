import { useState, createContext, useEffect } from "react"

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        const cartItems = window.localStorage.getItem('cartItems');
        if (cartItems !== null) {
            setCartItems(JSON.parse(cartItems));
        }
      }, []);

    useEffect(() => {
        window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }, [cartItems]);

    const addToCart = (name, price, quantity) => {
        const exists = cartItems.find(element => element.name === name)
        if (exists) {
            setCartItems(
                cartItems.map((element) => 
                    element.name === name ? {...exists, quantity: exists.quantity + quantity} : element
                )
            )
        } else {
            setCartItems((prevState) => [...prevState, {name, price, quantity}])
        }
        
    }

    const clearCart = () => {
        setCartItems([])
    }

    const calculateTotal = () => {

    }

    return(
        <CartContext.Provider value={{ cartItems, addToCart, clearCart}}>{children}</CartContext.Provider>
    );
}

export default CartContext;