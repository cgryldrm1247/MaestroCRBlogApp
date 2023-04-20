import React, { createContext, useState } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState([]);

  return (
    <BlogContext.Provider value={{ blogPosts, setBlogPosts }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
