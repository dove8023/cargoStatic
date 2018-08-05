const ordersInitState = {
    rows: [],
    count: 0,
    loading: false
}

const orders = (state = ordersInitState, action) => {
    switch (action.type) {
        case "FETCH_ORDER_PENDING":
            return {
                ...state,
                loading: true
            }
        case "FETCH_ORDER_FULFILLED":
            return {
                ...state,
                loading: false,
                ...action.payload
            }
        // case "UPDATE_ORDER_PENDING":
        //     return state;
        // case "UPDATE_ORDER_FULFILLED":
        //     let id = action.payload.id;
        //     let rows = state.rows.map((item) => {
        //         return item.id == id ? action.payload : item;
        //     })
        //     return {
        //         ...state,
        //         rows
        //     }
        default:
            return state;
    }
}


export default orders;