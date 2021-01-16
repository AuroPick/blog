import React from "react";
import { useLocation, Link, Redirect } from "react-router-dom";

import styles from "./PostDetail.module.css";

const PostDetail = () => {
  const { state } = useLocation();

  if (state === undefined) return <Redirect to="/" />

  window.scrollTo(0, 0);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.back}>
          <Link to="/" className={styles.link}>
            <p className={styles["back-text"]}>Geri Dön</p>
          </Link>
        </div>
        <div className={styles["paper-container"]}>
          <div className={styles["paper-inside"]}>
            <h1 className={styles.h1}>{state.title}</h1>
            <div className={styles["creator-container"]}>
              <h2 className={styles.creator}>{state.creator}</h2>
              <h2 className={styles.h2}>&nbsp;tafından yazıldı</h2>
            </div>
            <p className={styles.p}>{state.message}</p>
          </div>
        </div>
      </div>

      <img
        className={styles["circle-3"]}
        src={process.env.PUBLIC_URL + "/svg/circle-3.svg"}
        alt="circle"
      />
      <img
        className={styles["circle-4"]}
        src={process.env.PUBLIC_URL + "/svg/circle-4.svg"}
        alt="circle"
      />
    </div>
  );
};

export default PostDetail;
