import likeIcon from "../../assets/icons/like.svg";
import comment from "../../assets/icons/comment.svg";
import share from "../../assets/icons/share.svg";
import LikeFillIcon from "../../assets/icons/like-filled.svg";
import { useState } from "react";
import useAxios from "../../hook/useAxios";
import useAuth from "../../hook/useAuth";

const PostActions = ({ post, commentCount, likeCount }) => {
  const { auth } = useAuth();
  const [liked, setLiked] = useState(post?.likes?.includes(auth?.user?.id));
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const { api } = useAxios();

  const handleLike = async () => {
    try {
      setLiked((prevLiked) => !prevLiked);
      setLocalLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));

      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/like`
      );

      if (response.status !== 200) {
        setLiked((prevLiked) => !prevLiked);
        setLocalLikeCount((prevCount) => (liked ? prevCount + 1 : prevCount - 1));
      }
    } catch (err) {
      console.error(err.message);
      setLiked((prevLiked) => !prevLiked);
      setLocalLikeCount((prevCount) => (liked ? prevCount + 1 : prevCount - 1));
    }
  };

  return (
    <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
      {/* Like Button */}
      <button
        onClick={handleLike}
        className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
      >
        <img className="w-6" src={liked ? LikeFillIcon : likeIcon} alt="Like" />
        <span>{localLikeCount > 0 && localLikeCount} {localLikeCount === 1 ? "Like" : "Likes"}</span>
      </button>

      {/* Comment Button */}
      <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
        <img src={comment} alt="Comment" />
        <span>Comment({commentCount ?? 0})</span>
      </button>

      {/* Share Button */}
      <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
        <img src={share} alt="Share" />
        <span>Share</span>
      </button>
    </div>
  );
};

export default PostActions;
