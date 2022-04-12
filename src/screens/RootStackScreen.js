import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Signin } from './SignInScreen';

const RootStack = createNativeStackNavigator();

function RootStackScreen({ navigation }) {
    return (
        <RootStack.Navigator headerMode='none'>
            <RootStack.Screen name="SignInScreen" component={Signin} />
        </RootStack.Navigator>
    )
};

export default RootStackScreen;