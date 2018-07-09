const initState = {
    list: [{
        typeId: undefined,
        price: "",
        weight: "",
        amount: 0
    }],
    totalAmount: 0
}

let computeAmount = (arr) => {
    let sum = 0;
    for (let item of arr) {
        item.amount = item.price * item.weight || 0;
        sum += item.amount;
    }

    return sum;
}


const takeGoodOrder = (state = initState, action) => {
    switch (action.type) {
        case "ADD_GOODS_ORDER":
            state.list.push({
                typeId: undefined,
                price: "",
                weight: "",
                amount: 0
            })
            return {
                ...state
            }
        case "UPDATE_GOODS_ORDER":
            {
                let { item, index } = action.payload;
                state.list[index] = item;
                state.totalAmount = computeAmount(state.list);
                return {
                    ...state
                }
            }
        case "DELETE_GOODS_ORDER":
            {
                let { index } = action.payload;
                console.log("DELETE_GOODS_ORDER   ", index);
                state.list.splice(index, 1);

                state.totalAmount = computeAmount(state.list);
                return {
                    ...state
                };
            }
        default:
            return state;
    }
}


export default takeGoodOrder;