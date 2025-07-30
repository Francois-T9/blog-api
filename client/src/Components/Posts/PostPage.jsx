import { useParams } from "react-router-dom";
import { usePosts } from "../../Context/postsContext";
import { useEffect, useState } from "react";
import { useUser } from "../../Context/userContext.jsx";
import { useComments } from "../../Context/commentsContext.jsx";
// import likeImage from "../../assets/thumb-up.svg";
import commentImage from "../../assets/comment.svg";
import { NavLink } from "react-router-dom";
import Comments from "../Comments.jsx";
import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
import CommentForm from "../Forms/CommentForm.jsx";
function PostPage() {
  const [post, setPost] = useState({});
  const [toggleCommentForm, setToggleCommentForm] = useState(false);
  const { allUsers } = useUser();
  const { comments, setComments, getPostComments } = useComments();

  const { getPostById } = usePosts();
  const { id } = useParams();

  const fetchPost = async (id) => {
    const data = await getPostById(id);
    setPost(data);
  };

  useEffect(() => {
    fetchPost(id);
    const fetchComments = async () => {
      const data = await getPostComments(id);
      setComments(data); // <-- updates context state
    };
    fetchComments();
  }, [id]); // add id as dependency just in case

  const userIdToUsername = {};
  allUsers.forEach((user) => {
    userIdToUsername[user.id] = user.username;
  });

  const toggleForm = () => {
    setToggleCommentForm(!toggleCommentForm);
  };

  return (
    <div className="flex  flex-col h-full ">
      <Header />
      <div className="postContainer flex flex-col grow gap-2 p-2">
        <div className="post bg-blue-200">
          <ul className="p-3 border">
            <li className="font-bold">{post.title}</li>
            <li>{new Date(post.createdAt).toLocaleString()}</li>
            <li>@{userIdToUsername[post.authorId] || "Unknown"}</li>
            <div className="interactions flex justify-end gap-5">
              {/* <img className="w-7 cursor-pointer" src={likeImage} alt="" /> */}
              <img
                onClick={toggleForm}
                className="w-7 cursor-pointer"
                src={commentImage}
                alt=""
              />
            </div>
          </ul>

          {toggleCommentForm ? <CommentForm id={id} /> : <p></p>}
        </div>
        <NavLink to="/">
          <button className="hover:bg-gray-300 border p-1 cursor-pointer">
            Go back home
          </button>
        </NavLink>
        <div className="comments">
          {comments.length > 0 ? (
            <div className=" p-2 flex flex-col gap-2 border">
              <h1 className="font-bold text-2xl">Comments</h1>
              {comments.map((comment) => (
                <Comments comment={comment} />
              ))}
            </div>
          ) : (
            <p>No one has commented yet</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PostPage;
