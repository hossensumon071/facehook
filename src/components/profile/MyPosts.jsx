import useProfile from "../../hook/useProfile";
import PostList from "./PostList";

const MyPosts = () => {
  const { state } = useProfile();
  return <PostList posts={state?.posts} />;
};

export default MyPosts;
