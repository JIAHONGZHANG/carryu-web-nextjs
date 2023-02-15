import { createContext } from "react";

const PostsListContext = createContext({
  tagsData: [],
  postsListData: [],
  width: null,
});

export default function PostsListContextProvider({ value, children }) {
  return (
    <PostsListContext.Provider value={value}>
      {children}
    </PostsListContext.Provider>
  );
}
