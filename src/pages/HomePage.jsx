import { useEffect, useReducer } from "react";

import { initialState, postReducer } from "../reducers/PostReducer";
import useAxios from "../hook/useAxios";
import { actions } from "../actions";
import PostList from "../components/profile/PostList";

const HomePage = () => {
  const [state, dispatch] = useReducer(postReducer, initialState);
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FATCHING });

    const fetchPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`
        );

        if (response.status === 200) {
          dispatch({ type: actions.post.DATA_FATCHED, data: response.data });
        }
      } catch (error) {
        dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
      }
    };
    fetchPost();
  }, []);

  if (state?.loading) {
    return <p>we are working.......</p>;
  }

  if (state?.error) {
    return <p>Error is fetching Posts {state?.error}</p>;
  }

  return (
    <div>
      <PostList posts={state?.posts} />
    </div>
  );
};

export default HomePage;
