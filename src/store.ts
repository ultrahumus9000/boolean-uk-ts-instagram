import create from "zustand";

export const resetFormData = {
  title: "",
  content: "",
  image: {
    src: "",
    alt: "",
  },
  likes: 0,
  userId: null,
  comments: [],
};
export type NewPost = {
  title: string;
  content: string;
  image: {
    src: string;
    alt: string;
  };
  likes: number;
  userId: number;
  comments: SingleComment[];
};
export type SingleUser = {
  id: number;
  username: string;
  avatar: string;
};
export type CommentForFeed = {
  content: string;
  userId: number;
  postId: number;
};
export type SingleFeed = {
  id: number;
  title: string;
  content: string;
  image: {
    src: string;
    alt: string;
  };
  likes: number;
  userId: number;
  comments: {
    id: number;
    content: string;
    userId: number;
    postId: number;
  }[];
};

export type SingleComment = {
  id: number;
  content: string;
  userId: number;
  postId: number;
};

type Store = {
  posts: SingleFeed[];
  users: SingleUser[];
  comments: SingleComment[];
  activerUser: string;
  preview: boolean;
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
  clearPreviewForm: () => void;
  updatePreviewForm: (formData: NewPost) => void;
  togglePreviewToTrue: () => void;
  togglePreviewToFalse: () => void;
  fetchUsers: () => void;
  fetchPosts: () => void;
  fetchComments: () => void;
  setActiveUser: (arg: string) => void;
  postComment: (arg: CommentForFeed) => void;
  postNewPost: (formData: NewPost) => void;
};

const useStore = create<Store>((set, get) => ({
  posts: [],
  users: [],
  comments: [],
  activerUser: "",
  preview: false,
  previewForm: resetFormData,
  clearPreviewForm: () => {
    set({ previewForm: resetFormData });
  },
  updatePreviewForm: (formData) => {
    set({ previewForm: formData });
  },
  togglePreviewToTrue: () => {
    set({ preview: true });
  },
  togglePreviewToFalse: () => {
    set({ preview: false });
  },
  setActiveUser: (newUser) => {
    set({ activerUser: newUser });
  },
  fetchUsers: () => {
    fetch("http://localhost:4000/users")
      .then((resp) => resp.json())
      .then((usersFromServer) => set({ users: usersFromServer }));
  },
  fetchPosts: () => {
    fetch("http://localhost:4000/posts")
      .then((resp) => resp.json())
      .then((postsFromServer) => set({ posts: postsFromServer }));
  },
  fetchComments: () => {
    fetch("http://localhost:4000/comments")
      .then((resp) => resp.json())
      .then((commentsFromServer) => set({ comments: commentsFromServer }));
  },
  postComment: (newComment) => {
    fetch("http://localhost:4000/comments", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then((resp) => resp.json())
      .then((newComment) => set({ comments: [...get().comments, newComment] }));
  },
  postNewPost: (formData) => {
    fetch("http://localhost:4000/posts", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((newPostFromServer) =>
        set({ posts: [...get().posts, newPostFromServer] })
      );
  },
}));
export default useStore;
