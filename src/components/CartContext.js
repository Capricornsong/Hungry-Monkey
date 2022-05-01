import { useState, createContext, useEffect } from "react"

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        const cartItems = window.localStorage.getItem('cartItems');
        if (cartItems !== null) {
            setCartItems(JSON.parse(cartItems));
        }
      }, []);

    useEffect(() => {
        window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }, [cartItems]);

    const addToCart = (name, price) => {
        setCartItems((prevState) => [...prevState, {name, price}])
    }

    const clearCart = () => {
        setCartItems([])
    }

    return(
        <CartContext.Provider value={{ cartItems, addToCart, clearCart}}>{children}</CartContext.Provider>
    );
}

export default CartContext;