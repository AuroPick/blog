import React, { useContext } from "react";
import { CircularProgress } from "@material-ui/core";

import Post from "./Post/Post";
import { Context } from "../../context/Context";

import styles from "./Posts.module.css";

const Posts = () => {
  const context = useContext(Context);

  return (
    <>
      <h1 className={styles.h1}>Gönderiler</h1>
      <div className={styles.container}>
        {context.isLoading && <CircularProgress color="primary" />}
        {context.posts.length > 0 &&
          context.posts.map((post) => {
            return <Post key={post._id} post={post} />;
          })}
      </div>
    </>
  );
};

export default Posts;
