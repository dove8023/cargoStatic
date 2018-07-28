import { numFliter } from "../utils/common";
import _ from "lodash";
import { Ajax } from "../utils/common";


const initState = {
    list: [{
        typeId: undefined,
        price: "",
        weight: "",
        amount: 0
    }],
    totalAmount: 0,
    customerId: "1df8c810-8f4c-11e8-97f6-3df5a051d733",
    loading: false
}

let computeAmount = (arr) => {
    let sum = 0;
    for (let item of arr) {
        item.amount = numFliter(item.price * item.weight) || 0;
        sum += item.amount;
    }
    sum = sum.toFixed(2);
    return sum;
}


const takeGoodOrder = (state = _.cloneDeep(initState), action) => {
    switch (action.type) {
        case "ADD_GOODS_ORDER":
            state.list.push({
                typeId: undefined,
                price: "",
                weight: "",
                amount: 0
            })

            console.log("ok ", initState)
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

        case "SUBMIT_GOODS_ORDER_PENDING":

            return { ...state, loading: true };
        case "SUBMIT_GOODS_ORDER_FULFILLED":
            {
                let state = _.cloneDeep(initState);
                return {
                    ...state,
                    loading: false
                }
            }
        default:
            return state;
    }
}


export default takeGoodOrder;