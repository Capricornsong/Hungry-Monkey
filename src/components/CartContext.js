import { useState, createContext, useEffect } from "react"

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])
    const [cartTotal, setCartTotal] = useState(0)

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
      }, []);

    useEffect(() => {
        window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }, [cartItems]);

    useEffect(() => {
        window.localStorage.setItem('cartTotal', JSON.stringify(cartTotal));
    }, [cartTotal]);

    const addToCart = (name, price, quantity) => {
        const exists = cartItems.find(element => element.name === name)
        if (exists) {
            setCartItems(
                cartItems.map((element) => 
                    element.name === name ? {...exists, quantity: exists.quantity + quantity} : element,
                    calculateTotal(price*exists.quantity)
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

    

    return(
        <CartContext.Provider value={{ cartItems, addToCart, clearCart, cartTotal}}>{children}</CartContext.Provider>
    );
}

export default CartContext;