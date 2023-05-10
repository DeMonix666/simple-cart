import { combineReducers } from 'redux';
import items from './itemsSlice';
import cart from './cartSlice';
import message from './messageSlice';

const rootReducer: any = combineReducers({
    items,
    cart,
    message,
});

export default rootReducer;
