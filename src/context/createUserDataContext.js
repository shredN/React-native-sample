import React, { useReducer } from 'react';

export default (reducer, action, defaultValue) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);

        const actions = {};

        for (let key in action) {
            actions[key] = action[key](dispatch);
        }

        return (
            <Context.Provider value={{ state, ...actions }}>
                {children}
            </Context.Provider>
        )
    };

    return { Context: Context, Provider: Provider };
};