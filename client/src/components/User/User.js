import React, { useState, useEffect, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@material-ui/core";

import { logout } from "../../api";
import { Context } from "../../context/Context";
import Message from "../Message/Message";

import styles from "./User.module.css";

const User = (props) => {
  const [isWriter, setIsWriter] = useState(false);
  const [form, setForm] = useState({
    title: "",
    message: "",
    creator: "",
    specialPost: false,
  });
  const [postID, setPostID] = useState(0);
  const context = useContext(Context);
  const history = useHistory();

  const writer = useCallback(() => {
    if (context.user?.role === "admin" || context.user?.role === "writer")
      setIsWriter((prevState) => !prevState);
  }, [context.user]);

  useEffect(() => {
    setForm({
      title: "",
      message: "",
      creator: "",
      specialPost: false,
    });
    setPostID(0);
  }, []);

  useEffect(() => {
    writer();
  }, [writer]);

  useEffect(() => {
    setForm({
      title: context.post.title || "",
      message: context.post.message || "",
      creator: context.post.creator || "",
      specialPost: context.post.specialPost || false,
    });
    setPostID(() => context.post._id || 0);
  }, [context.post]);

  const onClick = () => {
    logout().then(() => {
      context.setPosts([]);
      context.setIsLoading(true);
      context.setUser(null);
      context.setAuthenticated(false);
    });
  };

  return isWriter ? (
    <div className={styles["writer-container"]}>
      <div className={styles["welcome-container"]}>
        {context.user?.role === "admin" && (
          <button className={styles["all-members"]} onClick={() => history.push("/users")}>
            Tüm Üyeler
          </button>
        )}
        <div className={styles.welcome}>
          <h1 className={styles.h1}>Hoş Geldiniz&nbsp;</h1>
          <h1 className={styles.h1}>{context.user?.username}</h1>
        </div>
      </div>
      <form
        name="post"
        onSubmit={(e) => {
          props.onSubmit(e, form, postID);
          setForm({ title: "", message: "", creator: "", specialPost: false });
          setPostID(0);
        }}
      >
        <input
          className={styles.input}
          type="text"
          placeholder="Başlık"
          required={true}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className={styles.input}
          placeholder="Mesaj"
          required={true}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <div className={styles.checkbox}>
          <FormControlLabel
            className={styles["MuiFormControlLabel-label"]}
            control={
              <Checkbox
                color="primary"
                checked={form.specialPost}
                onClick={(e) =>
                  setForm({ ...form, specialPost: e.target.checked })
                }
              />
            }
            label="Özel Gönderi"
          />
          {postID ? (
            <p
              className={styles.reset}
              onClick={() => {
                setForm({
                  title: "",
                  message: "",
                  creator: "",
                  specialPost: false,
                });
                setPostID(0);
              }}
            >
              Sıfırla
            </p>
          ) : (
            <p className={styles.reset}></p>
          )}
        </div>

        <div className={styles.buttons}>
          <button type="submit" className={styles["submit-button"]}>
            Paylaş
          </button>
          <button className={styles.button} onClick={onClick}>
            Çıkış Yap
          </button>
        </div>
        {props.message && <Message message={props.message} />}
      </form>
    </div>
  ) : (
    <div className={styles.container}>
      <h1 className={styles.h1}>Hoş Geldiniz</h1>
      <h1 className={styles.h1}>{context.user?.username}</h1>
      <button className={styles.button} onClick={onClick}>
        Çıkış Yap
      </button>
    </div>
  );
  // <div className={styles.container}>
  //   <h1 className={styles.h1}>Hoş Geldiniz</h1>
  //   <h1 className={styles.h1}>{context.user?.username}</h1>
  //   <button className={styles.button} onClick={onClick}>
  //     Çıkış Yap
  //   </button>
  // </div>
  // <div className={styles["writer-container"]}>
  //   <div className={styles["welcome-container"]}>
  //     <h1 className={styles.h1}>Hoş Geldiniz&nbsp;</h1>
  //     <h1 className={styles.h1}>{context.user?.username}</h1>
  //   </div>
  //   <form>
  //     <input className={styles.input} type="text" placeholder="Başlık" required={true} />
  //     <textarea className={styles.input} placeholder="Mesaj" required={true} />
  //     <FormControlLabel
  //       className={styles["MuiFormControlLabel-label"]}
  //       control={
  //         <Checkbox
  //           color="primary"
  //           checked={isChecked}
  //           onClick={() => setIsChecked(!isChecked)}
  //         />
  //       }
  //       label="Özel Gönderi"
  //     />
  //     <div className={styles.buttons}>
  //       <button type="submit" className={styles["submit-button"]}>
  //         Paylaş
  //       </button>
  //       <button className={styles.button} onClick={onClick}>Çıkış Yap</button>
  //     </div>
  //   </form>
  // </div>
};

export default User;
