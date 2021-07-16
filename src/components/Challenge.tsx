import React from "react";
import useStore, { SingleComment } from "../store";

type ChallengeProps = {
  previewForm: {
    title: string;
    content: string;
    image: {
      src: string;
      alt: string;
    };
    likes: number;
    userId: number | null;
    comments: SingleComment[];
  };
};

export function Challenge({ previewForm }: ChallengeProps) {
  const preview = useStore((store) => store.preview);
  const activerUser = useStore((store) => store.activerUser);
  const users = useStore((store) => store.users);
  const activeUserInfo = users.find((user) => user.username === activerUser);
  console.log(preview);
  return (
    <>
      {preview ? (
        <div className="post">
          <div className="chip active">
            <div className="avatar-small">
              <img
                src={activeUserInfo?.avatar}
                alt={activeUserInfo?.username}
              />
            </div>
            <span>{activerUser}</span>
          </div>
          <div className="post--image">
            <img src={previewForm.image.src} alt={previewForm.image.alt} />
          </div>
          <div className="post--content">
            <h2>{previewForm.title}</h2>
            <p>{previewForm.content}</p>
          </div>
        </div>
      ) : (
        <div className="post">
          <div className="chip active">
            <div className="avatar-small">
              <img
                src="https://uploads5.wikiart.org/images/salvador-dali.jpg!Portrait.jpg"
                alt="Salvador Dali"
              />
            </div>
            <span>Salvador Dali</span>
          </div>
          <div className="post--image loading-state"></div>
          <div className="post--content">
            <h2 className="loading-state"></h2>
            <p className="loading-state"></p>
          </div>
        </div>
      )}
    </>
  );
}
