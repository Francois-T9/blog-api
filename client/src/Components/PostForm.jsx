// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePosts } from "../Context/postsContext";
import { useAuth } from "../Context/authContext.jsx";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { createPost, postError } = usePosts();
  const [title, setTitle] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createPost(title, user.id);
    if (success) {
      navigate("/");
      setTitle("");
    } else {
      setTitle(title);
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
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Whats on your mind ?"
        />

        {postError ? <p className="text-red-500">{postError}</p> : ""}
        <button
          className="border cursor-pointer hover:bg-blue-200 p-1 rounded"
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default PostForm;
