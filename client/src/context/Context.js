import React, { createContext, useState, useEffect } from "react";
import { isAuthenticated, getPosts } from "../api";

export const Context = createContext();

export const Auth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [postAdded, setPostAdded] = useState(false);
  const [post, setPost] = useState({});

  useEffect(() => {
    isAuthenticated().then((data) => {
      setUser(data.data.user);
      setAuthenticated(data.data.isAuthenticated);
      if (!data.data.isAuthenticated) {
        return console.log({
          message: { msg: "Giriş Yapılmamış", msgError: true },
        });
      }
    });
    setPosts([]);
    setTimeout(() => {
      getPosts().then((data) => {
        setPosts(data.data.posts);
        setIsLoading(false);
      });
    }, 1000);
  }, []);

  useEffect(() => {
    setPosts([]);
    setIsLoading(true);
    setTimeout(() => {
      getPosts().then((data) => {
        setPosts(data.data.posts);
        setIsLoading(false);
      });
    }, 1000);
  }, [authenticated]);

  const fetchPost = () => {
    setPosts([]);
    setIsLoading(true);
    setTimeout(() => {
      getPosts().then((data) => {
        setPosts(data.data.posts);
        setIsLoading(false);
        setPostAdded(!postAdded);
      });
    }, 1000);
  }

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        authenticated,
        setAuthenticated,
        posts,
        setPosts,
        isLoading,
        setIsLoading,
        fetchPost,
        post,
        setPost,
      }}
    >
      {children}
    </Context.Provider>
  );
};
