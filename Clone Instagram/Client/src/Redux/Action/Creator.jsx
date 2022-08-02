import { ActionTypes } from './Type'
import axios from 'axios'






export const getUserInfoLogin = (value) => {
    return {
        type: ActionTypes.GET_USER_LOGIN,
        payload: value
    }
}



export const allUser = () => {
    return async (dispatch, getStaet) => {
        await axios.get('http://localhost:6070/findeallpeople')
            .then(res => {
                dispatch({
                    type: ActionTypes.ALL_USER,
                    payload: res.data
                })
            })
    }
}