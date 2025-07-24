import { useUser } from "../../Context/userContext.jsx";
import { usePosts } from "../../Context/postsContext.jsx";
import { useNavigate } from "react-router-dom";

function PostPreview({ post, user }) {
  const { allUsers } = useUser();
  const { deletePost, getPostById } = usePosts();
  const userIdToUsername = {};
  const navigate = useNavigate();
  allUsers.forEach((user) => {
    userIdToUsername[user.id] = user.username;
  });

  const openPost = async (id) => {
    await getPostById(id);
    navigate(`/post/${id}`);
  };
  return (
    <div
      onClick={() => openPost(post.id)}
      className="post bg-blue-200 cursor-pointer"
    >
      <ul className="p-3 border">
        <li className="font-bold">{post.title}</li>
        <li>{new Date(post.createdAt).toLocaleString()}</li>
        <li>@{userIdToUsername[post.authorId] || "Unknown"}</li>
        <div className="interactions flex justify-end gap-5">
          {user.isAdmin ? (
            <button
              onClick={(e) => {
                deletePost(post.id);
                e.stopPropagation();
              }}
              className="bg-red-500 border p-1 cursor-pointer "
            >
              Delete post
            </button>
          ) : (
            <p></p>
          )}
        </div>
        <div className="comments"></div>
      </ul>
    </div>
  );
}

export default PostPreview;
