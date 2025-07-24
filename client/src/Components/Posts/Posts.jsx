import { usePosts } from "../../Context/postsContext.jsx";
import PostPreview from "./PostPreview.jsx";
export default function Posts({ user }) {
  const { allPosts } = usePosts();

  return (
    <div className="postsPanel bg-gray-300 p-2 rounded-2xl border ">
      <h1 className=" font-bold text-3xl">Posts panel</h1>
      {allPosts.length > 0 ? (
        <div className="posts-list flex flex-col gap-2">
          {allPosts.map((post) => (
            <PostPreview post={post} user={user} />
          ))}
        </div>
      ) : (
        <p>No posts</p>
      )}
    </div>
  );
}
