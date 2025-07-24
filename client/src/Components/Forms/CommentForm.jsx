// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useComments } from "../../Context/commentsContext.jsx";
import { useAuth } from "../../Context/authContext.jsx";

function CommentForm({ id }) {
  const { user } = useAuth();

  const { createComment, commentError } = useComments();
  const [content, setContent] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createComment(content, user.id, id);
    if (success) {
      //   navigate("/");
      setContent("");
    }
  };

  return (
    <div className="post-form bg-gray-100 p-2 border rounded">
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col  gap-1.5 "
        action="/"
        method="post"
      >
        <input
          className="border  rounded px-2 py-1"
          type="text"
          name="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="Write a comment for this post..."
        />

        {commentError ? <p className="text-red-500">{commentError}</p> : ""}
        <button
          className="border cursor-pointer hover:bg-blue-200 p-1 rounded"
          type="submit"
        >
          Comment
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
