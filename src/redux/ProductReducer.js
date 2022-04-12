const INITIAL_STATE = {
    products: []
};

function productReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'UPDATE-PRODUCTS':
            // const {
            //     current,
            //     possible,
            // } = state,

            // const addedProducts = possible.splice(action.payload, 1);
            // current.push(addedProducts);
            // const newState = {current, possible};
            // return newState;
            return { ...state, products: action.payload };

        default:
            return state;
    }
}

// export default combineReducers({
//     prdcts: productReducer
// });

export default productReducer;