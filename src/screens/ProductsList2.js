import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Button } from 'react-native';

import { Product2 } from './../components/Product2';
import { AuthContext } from '../components/context';
import { useSelector, useDispatch } from 'react-redux';
import { addProducts } from '../redux/ProductActions';
import { NEWPRODUCTS } from '../constants/Products';

export function ProductsList2({ navigation }) {

    const { signOut } = React.useContext(AuthContext);
    const { products } = useSelector(state => state.productReducer);
    const dispatch = useDispatch();

    function renderProduct({ item: product }) {
        return (
            <Product2 {...product}
                onPress={() => {
                    navigation.navigate('ProductDetails', {
                        productId: product.id,
                    });
                }}
            />
        );
    }

    useEffect(() => {
        fetch('https://mocki.io/v1/d46dc365-f752-46ee-b0cd-c136aec38e00')
            .then((response) => response.json())
            .then((json) => dispatch(addProducts(json)))
            .catch((error) => dispatch(addProducts(NEWPRODUCTS))); // if error take from static file
    }, []);

    return (
        <>
            <View style={styles.fixToText}>
                <Button
                    title="signout"
                    type="clear"
                    onPress={() => {
                        signOut();
                    }} />
            </View>
            <FlatList
                style={styles.productsList}
                contentContainerStyle={styles.productsListContainer}
                keyExtractor={(item) => item.id.toString()}
                data={products}
                renderItem={renderProduct} /></>
    );
}

const styles = StyleSheet.create({
    productsList: {
        backgroundColor: '#eeeeee',
    },
    productsListContainer: {
        backgroundColor: '#eeeeee',
        paddingVertical: 8,
        marginHorizontal: 8,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});
