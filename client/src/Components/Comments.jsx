import { useUser } from "../Context/userContext.jsx";
import { useAuth } from "../Context/authContext.jsx";
import { useComments } from "../Context/commentsContext.jsx";
function Comments({ comment }) {
  const { allUsers } = useUser();
  const { user } = useAuth();
  console.log(user);
  const { deleteComment } = useComments();

  const userIdToUsername = {};
  allUsers.forEach((user) => {
    userIdToUsername[user.id] = user.username;
  });

  return (
    <div className="comment bg-amber-100 p-2 border rounded">
      <ul>
        <li>{comment.content}</li>
        <li>@{userIdToUsername[comment.authorId]}</li>
        <li>{new Date(comment.createdAt).toLocaleString()}</li>
      </ul>
      {user.isAdmin ? (
        <button
          onClick={() => deleteComment(comment.postId, comment.id)}
          className="bg-red-500 border p-1 cursor-pointer "
        >
          Delete post
        </button>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default Comments;
