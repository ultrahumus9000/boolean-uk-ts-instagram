import React, { useEffect } from "react";
import useStore from "../store";
import { Challenge } from "./Challenge";

export function CreatePost() {
  const activerUser = useStore((store) => store.activerUser);
  const postNewPost = useStore((store) => store.postNewPost);
  const togglePreviewToTrue = useStore((store) => store.togglePreviewToTrue);
  const togglePreviewToFalse = useStore((store) => store.togglePreviewToFalse);
  const previewForm = useStore((store) => store.previewForm);
  const clearPreviewForm = useStore((store) => store.clearPreviewForm);
  const updatePreviewForm = useStore((store) => store.updatePreviewForm);
  const users = useStore((store) => store.users);
  const activeUserInfo = users.find((user) => user.username === activerUser);

  // console.log(previewForm);
  useEffect(() => {}, [previewForm]);
  return (
    <>
      <form
        id="create-post-form"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          if (activeUserInfo === undefined) {
            alert("you cannot post anything before sign in");
            return null;
          }
          let targetEvent = e.target as HTMLFormElement;
          let newPost = {
            title: targetEvent.titleInput.value,
            content: targetEvent.contentInput.value,
            image: {
              src: targetEvent.imageInput.value,
              alt: targetEvent.titleInput.value,
            },
            likes: 0,
            userId: activeUserInfo.id,
            comments: [],
          };
          postNewPost(newPost);
          clearPreviewForm();
          togglePreviewToFalse();
          targetEvent.reset();
        }}
      >
        <h2>Create a post</h2>
        <label htmlFor="image">Image</label>
        <input id="image" name="imageInput" type="text" />
        <label htmlFor="title">Title</label>
        <input id="title" name="titleInput" type="text" />
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="contentInput"
          rows={2}
          maxLength={30}
        ></textarea>
        <div className="action-btns">
          <button
            id="preview-btn"
            type="button"
            onClick={() => {
              togglePreviewToTrue();
              if (activeUserInfo === undefined) {
                alert("you cannot display anything before sign in");
                return null;
              }
              let preFormData = document.getElementById("create-post-form");
              let targetEvent = preFormData as HTMLFormElement;
              let newPreview = {
                title: targetEvent.titleInput.value,
                content: targetEvent.contentInput.value,
                image: {
                  src: targetEvent.imageInput.value,
                  alt: targetEvent.titleInput.value,
                },
                likes: 0,
                userId: activeUserInfo.id,
                comments: [],
              };
              updatePreviewForm(newPreview);
            }}
          >
            Preview
          </button>
          <button type="submit">Post</button>
        </div>
      </form>
      <div>
        <Challenge previewForm={previewForm} />
      </div>
    </>
  );
}
