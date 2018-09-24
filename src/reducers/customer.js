const typesInitState = {
    rows: [],
    loading: false
}

export default (state = typesInitState, action) => {
    switch (action.type) {
        case "FETCH_CUSTOMER_PENDING":
            return {
                ...state,
                loading: true
            }
        case "FETCH_CUSTOMER_FULFILLED":
            return {
                ...state,
                loading: false,
                ...action.payload
            }
        // case "UPDATE_CUSTOMER_PENDING":
        //     return state;
        // case "UPDATE_CUSTOMER_FULFILLED":
        //     let id = action.payload.id;
        //     let rows = state.rows.map((item) => {
        //         return item.id == id ? action.payload : item;
        //     })
        //     return {
        //         ...state,
        //         rows
        //     }
        // case "ADD_CUSTOMER_PENDING":
        //     return state;
        // case "ADD_CUSTOMER_FULFILLED":
        //     return {
        //         ...state,
        //         rows: [...state.rows, action.payload]
        //     };
        default:
            return state;
    }
}