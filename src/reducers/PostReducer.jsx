import { actions } from "../actions";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postReducer = (state, action) => {
  switch (action.type) {
    case actions.post.DATA_FATCHING:
      return {
        ...state,
        loading: true,
      };
    case actions.post.DATA_FATCHED:
      return {
        ...state,
        loading: false,
        posts: action.data,
      };
    case actions.post.DATA_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default: {
      return state;
    }
  }
};

export { initialState, postReducer };
