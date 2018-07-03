const typesInitState = {
    currentData: {},
    visible: false,
    modalLoading: false,
    rows: []
}


const types = (state = typesInitState, action) => {

    console.log("reducesr types : ", action);
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

            return {
                ...state,
            }
        default:
            return state;
    }
}

export default types;