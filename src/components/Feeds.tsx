import React, { useEffect } from "react";
import useStore from "../store";
import { FeedForMain } from "./FeedForMain";

export function Feeds() {
  const posts = useStore((store) => store.posts);
  const comments = useStore((store) => store.comments);
  const fetchPosts = useStore((store) => store.fetchPosts);
  useEffect(() => {
    fetchPosts();
  }, [comments, posts]);

  return (
    <section className="feed">
      <ul className="stack">
        {posts.map((post) => {
          return <FeedForMain key={post.id} post={post} />;
        })}
      </ul>
    </section>
  );
}
