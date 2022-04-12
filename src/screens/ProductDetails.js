import React, { useEffect, useState, useContext } from 'react';
import {
    Text,
    Image,
    View,
    ScrollView,
    SafeAreaView,
    Button,
    Linking,
    StyleSheet
} from 'react-native';

import { CartContext } from '../context/CartContext';
import { useSelector } from 'react-redux';
//mport { cake-102.jpg } from '../../../assets/products';

export function ProductDetails({ route }) {
    const { products } = useSelector(state => state.productReducer);
    const { productId } = route.params;
    const [product, setProduct] = useState({});

    const { addItemToCart } = useContext(CartContext);

    useEffect(() => {
        setProduct(products.find((product) => (product.id == productId)));
    });

    function onAddToCart() {
        addItemToCart(product.id);
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <Image
                    style={styles.image}
                    source={require('../../assets/img/Huawei-Matebook-X.jpg')}
                />
                <Text style={{ fontSize: 20, flex: 1, marginTop: 20 }}> CLICK BELOW LINK TO KNOW MORE </Text>
                <Text style={{ color: 'red', marginLeft: 20 }} onPress={() => { Linking.openURL(product.video.trim()) }}>
                    {product.video}
                </Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.price}>$ {product.price}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                    <Button
                        onPress={onAddToCart}
                        title="Add to cart"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 1,
        marginVertical: 20,
    },
    image: {
        height: 300,
        width: '100%'
    },
    infoContainer: {
        padding: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        fontWeight: '400',
        color: '#787878',
        marginBottom: 16,
    },
});
