const initialState = {
    products: [],
    isCreating: false
}

const productReducer = (state = initialState, actions) => {

    switch (actions.type) {
        case 'GET_PRODUCTS': {
            return {
                ...state,
                products: actions.payload
            }
        }
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [...state.products, actions.payload]
            }
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter((product) => product._id !== actions.payload)
            }
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map((product) => product._id === actions.payload._id?actions.payload:product)
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
        case 'CLEAR_PRODUCTS':
            return{
                products: [],
                isCreating: false
            }    
        default:
            return state;

    }

}

export default productReducer;