const initialLoginState = JSON.parse(localStorage.getItem('profile'));

const initialState = {
    LogginStart: false,
    LoginEnd: false,
    RegistraionStart: false,
    RegistraionEnd: false,
    isLoggedIn:initialLoginState?.token?true:false,
    user:null
}

const authReducers = (state = initialState, actions) => {

    switch (actions.type) {
        case 'LOGIN_START':
            return {
                ...state,
                LogginStart: true,
                LoginEnd: false
            }
        case 'LOGIN_END':
            return {
                ...state,
                LogginStart: false,
                LoginEnd: true
            }
        case 'REISTRATION_START':
            return {
                ...state,
                RegistraionStart: true,
                RegistraionEnd: false,
            }
        case 'REISTRATION_END':
            return {
                ...state,
                RegistraionStart: false,
                RegistraionEnd: true,
            }
            case 'LOGGED_IN':
                return {
                    ...state,
                    isLoggedIn:actions.payload.state,
                    user:actions.payload.user
                }    
        default:
            return state;
    }

}

export default authReducers;