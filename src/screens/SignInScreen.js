import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Input, Button } from 'react-native-elements';
import { AuthContext } from '../components/context';
import { Users } from '../../models/loginUser';

export function Signin({ navigation }) {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = React.useContext(AuthContext);

    const loginHandle = (userName, password) => {

        const foundUser = Users.filter(item => {
            return userName == item.username && password == item.password;
        });

        if (user.length == 0 || password.length == 0) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }

        if (foundUser.length == 0) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                { text: 'Okay' }
            ]);
            return;
        }
        signIn(foundUser);
    };

    return (
        <View style={styles.master}>
            <Text style={styles.header}>Demo App</Text>
            <Input
                placeholder="Username"
                onChangeText={setUser}
                value={user}
                leftIcon={<Icon name="envelope" type="font-awesome" size={24} />}
            />
            <Input
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                leftIcon={<Icon name="key" type="font-awesome" size={24} />}
                secureTextEntry
            />

            <Button
                title="Login"
                type="clear"
                onPress={() => {
                    loginHandle(user, password);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    master: {
        padding: 16,
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    header: {
        fontSize: 32,
        marginBottom: 18,
        alignSelf: 'center',
    },
    text: {
        fontSize: 16,
        marginTop: 16,
    },
    link: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
