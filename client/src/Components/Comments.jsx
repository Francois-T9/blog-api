import React from "react";
import { useComments } from "../Context/commentsContext.jsx";
import { useEffect } from "react";

function Comments() {
  const { getAllComments, allComments } = useComments();

  return (
    <div>
      <p>Comments section</p>
    </div>
  );
}

export default Comments;
