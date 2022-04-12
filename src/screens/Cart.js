import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

import { CartContext } from '../context/CartContext';

export function Cart({ navigation }) {

    const { items, getItemsCount, getTotalPrice, removeItemFromCart, addItemToCart } = useContext(CartContext);


    function Totals() {
        let [total, setTotal] = useState(0);
        useEffect(() => {
            setTotal(getTotalPrice());
        });
        return (
            <View style={styles.cartLineTotal}>
                <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
                <Text style={styles.lineRight}>$ {total}</Text>
            </View>
        );
    }

    function renderItem({ item }) {

        function onAddToCart() {
            addItemToCart(item.id);
        }

        function onRmFrmCart() {
            removeItemFromCart(item.id);
        }

        return (
            item.qty !== 0 && (
                <View style={styles.mainContainer}>
                    <View style={styles.cartLine} >
                        <Text style={styles.lineLeft}>{item.product.productName}</Text>
                        <Text style={styles.lineRight}>$ {item.totalPrice}</Text>
                    </View>
                    <View {...styles.addRemoveOption}>
                        <Text style={styles.lineLeft}>
                            <Button
                                onPress={onRmFrmCart}
                                title="-"
                                color='#2196f2'
                                accessibilityLabel="remove from cart" />
                            <Text style={styles.lineRight}>{item.qty}</Text>
                            <Button
                                onPress={onAddToCart}
                                title="+"
                                color='#2196f2'
                                accessibilityLabel="remove from cart" />
                        </Text>
                    </View>


                </View>)
        );
    }

    return (
        <FlatList
            style={styles.itemsList}
            contentContainerStyle={styles.itemsListContainer}
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.product.id.toString()}
            ListFooterComponent={Totals}
        />
    );
}

const styles = StyleSheet.create({
    cartLine: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    cartLineTotal: {
        flexDirection: 'row',
        borderTopColor: '#dddddd',
        borderTopWidth: 1
    },
    lineTotal: {
        fontWeight: 'bold',
    },
    addRemoveOption: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    lineLeft: {
        fontSize: 20,
        lineHeight: 40,
        color: '#333333'
    },
    button: {
        backgroundColor: '#DDDDDD',
    },
    lineRight: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 40,
        color: '#333333',
        textAlign: 'right',
    },
    itemsList: {
        backgroundColor: '#eeeeee',
    },
    itemsListContainer: {
        backgroundColor: '#eeeeee',
        paddingVertical: 8,
        marginHorizontal: 8,
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 14,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 16,
        marginRight: 16,
    },
});