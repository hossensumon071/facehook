import PostActions from "./PostActions";
import PostBody from "./PostBody";
import PostCommentList from "./PostCommentList";
import PostHeader from "./PostHeader";

const PostCard = ({ post }) => {
  return (
    <article className='card mt-6 lg:mt-8'>
      <PostHeader post={post} />
      <PostBody poster={post?.image} content={post?.content} />
      <PostActions
        post={post}
        commentCount={post?.commnet?.length}
        likecount={post?.likes?.length}
      />
      <PostCommentList post={post} />
    </article>
  );
};

export default PostCard;
