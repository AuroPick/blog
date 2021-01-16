import React, { useState } from "react";
import { ArrowBackIos } from "@material-ui/icons";

import Message from "../Message/Message";

import styles from "./Login.module.css";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });

  return (
    <div className={styles.container}>
      <div className={styles.back} id="login" onClick={(e) => props.onClick(e)}>
        <ArrowBackIos color="primary" />
        <p className={styles["back-text"]}>Geri Dön</p>
      </div>
      <div>
        <h1 className={styles.h1}>Giriş Yap</h1>
        <form
          name="login"
          className={styles.form}
          onSubmit={(e) => props.onSubmit(e, user)}
        >
          <input
            className={styles.input}
            type="text"
            name="username"
            required={true}
            placeholder="Kullanıcı Adı"
            value={user.username}
            onChange={(e) =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            required={true}
            placeholder="Parola"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
          />
          <button className={styles.button}>Giriş Yap</button>
          {props.message && <Message message={props.message} />}
        </form>
      </div>
    </div>
  );
};

export default Login;
