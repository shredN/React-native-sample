/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ProductsList2 } from './src/screens/ProductsList2.js';
import { ProductDetails } from './src/screens/ProductDetails';
import { Cart } from './src/screens/Cart.js';
import { CartIcon } from './src/components/CartIcon.js';
import { CartProvider } from './src/context/CartContext.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from './src/components/context.js';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import RootStackScreen from './src/screens/RootStackScreen.js';
import { Provider } from 'react-redux';
import { store } from './src/redux/store.js';

import AsyncStorage from '@react-native-community/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          userName: action.id,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (foundUser) => {
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;

      try {
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('userName', userName);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
  }))

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      let userName = null;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        userName = await AsyncStorage.getItem('userName');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken , id: userName});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <Provider store={store}>

        <CartProvider>
          <NavigationContainer>
            {loginState.userToken !== null ? (<Stack.Navigator>
              <Stack.Screen name='Products' component={ProductsList2}
                options={({ navigation }) => ({
                  title: 'Products-'.concat(loginState.userName),
                  headerTitleStyle: styles.headerTitle,
                  headerRight: () => <CartIcon navigation={navigation} />
                })} />
              <Stack.Screen name='ProductDetails' component={ProductDetails}
                options={({ navigation }) => ({
                  title: 'Product details-'.concat(loginState.userName),
                  headerTitleStyle: styles.headerTitle,
                  headerRight: () => <CartIcon navigation={navigation} />,
                })} />
              <Stack.Screen name='Cart' component={Cart}
                options={({ navigation }) => ({
                  title: 'My cart-'.concat(loginState.userName),
                  headerTitleStyle: styles.headerTitle,
                  headerRight: () => <CartIcon navigation={navigation} />,
                })} />
            </Stack.Navigator>) : (
              <Stack.Navigator>
                <Stack.Screen name='Auth'
                  component={RootStackScreen}
                  options={{ headerShown: false }} />
              </Stack.Navigator>
            )}

          </NavigationContainer>
        </CartProvider>
      </Provider>

    </AuthContext.Provider>

  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
  }
});

export default App;
