import { ActionTypes } from '../Action/Type'




const initialState = {
    Get_Info_Account: {},
    All_user: [],
}



export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_USER_LOGIN:
            return {
                ...state,
                Get_Info_Account: action.payload
            }

        case ActionTypes.ALL_USER:
            return {
                ...state,
                All_user: action.payload
            }

        default:
            return state
    }
}