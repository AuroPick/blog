import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import lottie from "lottie-web";
import error404 from "../../assets/error-404.json";

import styles from "./Error404.module.css";

export const Error404 = () => {
  const history = useHistory();

  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#error-404"),
      animationData: error404,
    });
  }, []);
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>ARADIĞIN ŞEY HER NEYSE BURADA DEĞİL</h1>
      <div id="error-404" className={styles["error-404"]}></div>
      <button className={styles.button} onClick={() => history.push("/")}>
        Geri Dön
      </button>
    </div>
  );
};
