import { combineReducers } from "redux";

import auth from './auth';
import shop from './shop';
import alert from './alert';
import notification from './notification'

export default combineReducers({
    auth,
    shop,
    alert,
    notification
});