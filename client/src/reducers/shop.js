
const inialState = {
    shops: [],
    isCreating: false
}

const shopReducer = (state = inialState, actions) => {

    switch (actions.type) {
        case 'CREATE_SHOP':
            return {
                ...state,
                shops: [...state.shops, actions.payload]
            }
        case 'UPDATE_SHOP':
            return {
                ...state,
                shops: state.shops.map((shop) => shop._id === actions.payload._id ? actions.payload : shop)
            }
        case 'GET_SHOP':
            return {
                ...state,
                shops: actions.payload
            }

        case 'DELETE_SHOP':
            return {
                ...state,
                shops: state.shops.filter((shop)=>shop._id!==actions.payload)
            }
        case 'CREATING_STARTS':
            return {
                ...state,
                isCreating: true
            }
        case 'CREATING_ENDS':
            return {
                ...state,
                isCreating: false
            }
        default:
            return state;
    }

}

export default shopReducer;