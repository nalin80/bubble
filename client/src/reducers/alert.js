
const initialState = {
    showAlert: false,
    isConfirmed:false
}

const alertReducer = (state = initialState, actions) => {

    switch (actions.type) {
        case 'SET_ALERT':
            return {
                ...state,
                showAlert: !state.showAlert,
                isConfirmed:false
            }
        case 'CONFIRMED_ALERT':
            return{
                ...state,
                showAlert:false,
                isConfirmed:true                                
            }    
        default:
            return state;
    }

}

export default alertReducer;