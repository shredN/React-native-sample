import React, { useContext } from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';
 
import { CartContext } from '../context/CartContext';
 
export function Product2({ productName, id, price, image, onPress }) {
 
  const { addItemToCart } = useContext(CartContext);
 
  function onAddToCart() {
    addItemToCart(id);
  }
 

  return (
    <>
      <View style={styles.mainContainer}>
      <View style={styles.infoContainer}>
      <Text style={styles.name}>{productName}</Text>
        <Text style={styles.price}>Price: $ {price}</Text>
        </View>
        <View style={styles.fixToText}>
          <Button
            onPress={onPress}
            title="View Details"
            color="#2196f2"
            accessibilityLabel="Learn more about this purple button" />
          <Button
            onPress={onAddToCart}
            title="Add to cart"
            color="#2196f2"
            accessibilityLabel="Learn more about this purple button" />
        </View>
      </View>
    </>
 
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
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 6,
  },
  thumb: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  infoContainer: {
    flex:1,
    alignItems: 'flex-start',
  },
  mainContainer:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    shadowOffset: {width: 0, height: 0},
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
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
});