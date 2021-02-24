import { combineReducers } from 'redux';
import { movieReducer } from './movieReducer';

const appReducer = combineReducers({
    myMovies: movieReducer

})

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }
    return appReducer(state, action)
}
export default rootReducer