const typesInitState = {
    rows: [],
    loading: false
}

const types = (state = typesInitState, action) => {
    switch (action.type) {
        case "FETCH_TYPE_PENDING":
            return {
                ...state,
                loading: true
            }
        case "FETCH_TYPE_FULFILLED":
            return {
                ...state,
                loading: false,
                ...action.payload
            }
        case "UPDATE_TYPE_PENDING":
            return state;
        case "UPDATE_TYPE_FULFILLED":
            let id = action.payload.id;
            let rows = state.rows.map((item) => {
                return item.id == id ? action.payload : item;
            })
            return {
                ...state,
                rows
            }
        case "ADD_TYPE_PENDING":
            return state;
        case "ADD_TYPE_FULFILLED":
            return {
                ...state,
                rows: [...state.rows, action.payload]
            };
        default:
            return state;
    }
}


export default types;