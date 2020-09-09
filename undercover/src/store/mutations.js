import {
    SET_NAME,
    SET_TOKEN,
    SET_MOBILE
} from './mutations-type'

export default {
    [SET_NAME](state,name){
        state.name = name;
    },
    [SET_MOBILE](state,mobile){
        state.mobile = mobile;
    },
    [SET_TOKEN](state,token){
        state.token = token;
    }
}