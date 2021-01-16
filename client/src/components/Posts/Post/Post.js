import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import turkishStrings from "react-timeago/lib/language-strings/tr";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { Star, Delete, Edit } from "@material-ui/icons";

import { Context } from "../../../context/Context";
import { deletePost } from "../../../api";
import Message from "../../Message/Message";

import styles from "./Post.module.css";

const formatter = buildFormatter(turkishStrings);

const Post = ({ post }) => {
  const [message, setMessage] = useState(null);
  const context = useContext(Context);

  const deleteThisPost = (e) => {
    e.stopPropagation();
    e.preventDefault();
    deletePost(post._id).then((data) => {
      if (!data.data.message.msgError) {
        setMessage({ ...data.data.message, msgType: "delete" });
        setTimeout(() => {
          setMessage(null);
          context.fetchPost();
        }, 1500);
      } else {
        setMessage({
          msg: "Silinemedi",
          msgError: true,
          msgType: "delete",
        });
        setTimeout(() => {
          setMessage(null);
        }, 1500);
      }
    });
  };

  const updatePost = (e) => {
    e.stopPropagation();
    e.preventDefault();
    context.setPost(post);
  };

  return (
    <Link
      to={{
        pathname: `/post/${post._id}`,
        state: post,
      }}
    >
      <div className={styles.container}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.message}>{post.message.slice(0, 300) + "..."}</p>
        <div className={styles["bottom-container"]}>
          <div className={styles["creator-container"]}>
            <p className={styles.creator}>{post.creator}</p>
            <p className={styles["creator-text"]}>&nbsp;tarafından yazıldı.</p>
          </div>
          <div className={styles["special-container"]}>
            {post.specialPost && (
              <Star className={styles.star} fontSize="small" />
            )}
            <TimeAgo
              className={styles["time-ago"]}
              date={post.createdAt}
              formatter={formatter}
            />
          </div>
        </div>
        {context.user?.role === "admin" && (
          <Edit className={styles.edit} color="primary" onClick={updatePost} />
        )}
        {context.user?.role === "admin" && (
          <Delete
            className={styles.delete}
            color="secondary"
            onClick={deleteThisPost}
          />
        )}
        {message && <Message message={message} />}
      </div>
    </Link>
  );
};

export default Post;
