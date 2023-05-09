import { combineReducers } from 'redux';
import items from './itemsSlice';
import message from './messageSlice';

const rootReducer: any = combineReducers({
    items,
    message,
});

export default rootReducer;
