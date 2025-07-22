import { useUser } from "../Context/userContext.jsx";
import { usePosts } from "../Context/postsContext.jsx";

export default function Posts(user) {
  const { allUsers } = useUser();

  const { allPosts, deletePost, getPostById } = usePosts();
  const userIdToUsername = {};
  allUsers.forEach((user) => {
    userIdToUsername[user.id] = user.username;
  });

  const openPost = async (id) => {
    const post = await getPostById(id);
    console.log(post);
  };

  return (
    <div className="postsPanel bg-gray-300 p-2 rounded-2xl border ">
      <h1 className=" font-bold text-3xl">Posts panel</h1>
      {allPosts.length > 0 ? (
        <div className="posts-list flex flex-col gap-2">
          {allPosts.map((post, key) => (
            <div
              onClick={() => openPost(post.id)}
              key={key}
              className=" cursor-pointer post bg-cyan-50"
            >
              <ul className="p-3 border">
                <li className="font-bold">{post.title}</li>
                <li>{new Date(post.createdAt).toLocaleString()}</li>
                <li>@{userIdToUsername[post.authorId] || "Unknown"}</li>
                <div className="interactions flex justify-end gap-5">
                  {user.user.isAdmin ? (
                    <button
                      className="bg-red-500 border-2 p-1 text cursor-pointer rounded hover:bg-red-300"
                      onClick={() => deletePost(post.id)}
                    >
                      Delete post
                    </button>
                  ) : (
                    <p></p>
                  )}
                  {/* <button className="comments">
                    <img
                      className="w-7 hover:scale-125 cursor-pointer"
                      src={commentIcon}
                      alt=""
                    />
                  </button>
                  <button>
                    <img
                      className="w-7 hover:scale-125 cursor-pointer"
                      src={likeIcon}
                      alt=""
                    />
                  </button> */}
                </div>
                <div className="comments"></div>
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts</p>
      )}
    </div>
  );
}
