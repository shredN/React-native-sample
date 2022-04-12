export const addProducts = prodIndex => dispatch => (
    dispatch({
        type: 'UPDATE-PRODUCTS',
        payload: prodIndex,
    })
);