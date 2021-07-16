import React from "react";
import useStore, { SingleFeed, SingleUser } from "../store";
import { Comment } from "./Comment";

type FeedProps = {
  post: SingleFeed;
};

export function FeedForMain({ post }: FeedProps) {
  const users = useStore((store) => store.users);
  const activeUser = useStore((store) => store.activerUser);
  const postComment = useStore((store) => store.postComment);

  const activeUserInfo = users.find((user) => user.username === activeUser);
  const feedOwner: SingleUser | undefined = users.find(
    (user) => user.id === post.userId
  );
  if (feedOwner === undefined) {
    return null;
  }
  return (
    <li className="post">
      <div className="chip">
        <div className="avatar-small">
          <img src={feedOwner.avatar} alt={feedOwner.username} />
        </div>
        <span>{feedOwner.username}</span>
      </div>
      <div className="post--image">
        <img src={post.image.src} alt={post.image.alt} />
      </div>
      <div className="post--content">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
      <div className="post--comments">
        <h3>Comments</h3>
        {post.comments.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
        <form
          id="create-comment-form"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            const targetEvent = e.target as HTMLFormElement;
            if (activeUserInfo === undefined) {
              alert("Sign in First");
              return null;
            }
            let newComment = {
              content: targetEvent.inputComment.value,
              userId: activeUserInfo.id,
              postId: post.id,
            };
            postComment(newComment);
            targetEvent.reset();
          }}
        >
          <label htmlFor="comment">Add comment</label>
          <input id="comment" name="inputComment" type="text" />
          <button type="submit">Comment</button>
        </form>
      </div>
    </li>
  );
}
