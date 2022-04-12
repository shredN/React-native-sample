import createUserDataContext from "./createUserDataContext";

const authReducer = (state, action) => {
    switch (action.type) {
        case 'signout':
            return { token: null, email: '' };
        case 'signin':
            return {
                token: action.payload.token,
                email: action.payload.email,
            };
        default:
            return state;
    }
};

const signin = dispatch => {
    return ({ email, password }) => {
        console.log('Signin');
        dispatch({
            type: 'signin',
            payload: {
                token: 'some access token here',
                email,
            },
        });
    };
};

const signout = dispatch => {
    return () => {
        dispatch({ type: 'signout' });
    };
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout },
    { token: null, email: '' },
);