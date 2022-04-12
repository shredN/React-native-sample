import React, { createContext, useState } from 'react';
import { useSelector } from 'react-redux';

export const CartContext = createContext();

export function CartProvider(props) {
    const { products } = useSelector(state => state.productReducer);
    const [items, setItems] = useState([]);

    function addItemToCart(id) {
        const product = products.find((product) => (product.id == id));
        setItems((prevItems) => {
            const item = prevItems.find((item) => (item.id == id));
            if (!item) {
                return [...prevItems, {
                    id,
                    qty: 1,
                    product,
                    totalPrice: getNumber(product.price)
                }];
            }
            else {
                return prevItems.map((item) => {
                    if (item.id == id) {
                        item.qty++;
                        item.totalPrice += getNumber(product.price);
                    }
                    return item;
                });
            }
        });

    }

    function removeItemFromCart(id) {
        const product = products.find((product) => (product.id == id));
        setItems((prevItems) => {
            const item = prevItems.find((item) => (item.id == id));
            return prevItems.map((item) => {
                if (item.id == id) {
                    item.qty--;
                    item.totalPrice -= getNumber(product.price);
                }
                return item;
            });
        });

    }

    function getNumber(num) {
        num = num.replace(/\,/g, '');
        return parseInt(num, 10);
    }

    function getItemsCount() {
        return items.reduce((sum, item) => (sum + item.qty), 0);
    }

    function getTotalPrice() {
        return items.reduce((sum, item) => (sum + item.totalPrice), 0);
    }

    return (
        <CartContext.Provider
            value={{ items, setItems, getItemsCount, addItemToCart, getTotalPrice, removeItemFromCart }}>
            {props.children}
        </CartContext.Provider>
    );
}

