
export function movieReducer(state = {myMoviesList :""}, action) {
    switch (action.type) {

        case "ADD_MY_MOVIES_SUCCESS":
            return {
                ...state,
                myMoviesList: action.payload,
            }

        case "ADD_MY_MOVIES_FAILURE":
            return {
                ...state,
                myMoviesListError: action.payload.response,
            };
        default:
            return state;
    }
}