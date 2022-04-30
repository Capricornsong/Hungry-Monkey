import { useState, createContext, useEffect } from "react"

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }, [cartItems]);

      useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (cartItems) {
            setCartItems(cartItems);
        }
      }, []);

    const addToCart = (name, price) => {
        setCartItems((prevState) => [...prevState, {name, price}])
    }

    return(
        <CartContext.Provider value={{ cartItems, addToCart}}>{children}</CartContext.Provider>
    );
}

export default CartContext;