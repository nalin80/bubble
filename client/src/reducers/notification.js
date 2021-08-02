const initialState = {
    message: null,
    close: true,
    show_success: false
}

const notificationReducer = (state = initialState, actions) => {

    switch (actions.type) {
        case 'SHOW_SUCCESS':
            return {
                ...state,
                message: actions.payload,
                close:false,
                show_success: true
            }
        case 'SHOW_FAIL':
            return {
                ...state,
                message: actions.payload,
                close:false,
                show_success: false
            }
        case 'CLOSE_NOTIFICATION':
            return {
                ...state,
                message: null,
                close: true,
                show_success: false
            }
        default:
            return state;    
    }

}

export default notificationReducer;