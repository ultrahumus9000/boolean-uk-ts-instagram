import React from "react";
import useStore, { SingleComment } from "../store";

type CommentProps = {
  comment: SingleComment;
};

export function Comment({ comment }: CommentProps) {
  const users = useStore((store) => store.users);
  const commentOwner = users.find((user) => user.id === comment.userId);
  return (
    <div className="post--comment">
      <div className="avatar-small">
        <img src={commentOwner?.avatar} alt={commentOwner?.username} />
      </div>
      <p>{comment.content}</p>
    </div>
  );
}
