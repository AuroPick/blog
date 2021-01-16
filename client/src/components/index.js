import React, { useState, useContext, useEffect } from "react";
import validator from "validator";

import {
  login,
  register,
  createPost,
  isAuthenticated,
  updatePost,
} from "../api";
import { Context } from "../context/Context";
import Posts from "./Posts/Posts";
import Login from "./Login/Login";
import Register from "./Register/Register";
import User from "./User/User";
import Home from "./Home/Home";

import styles from "./index.module.css";

const Index = () => {
  const [isUser, setIsUser] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState(null);
  const context = useContext(Context);

  window.scrollTo(0, 0);

  useEffect(() => {
    if (context.authenticated) {
      setIsUser(true);
      setIsLogin(false);
      setIsRegister(false);
      setMessage(null);
    } else {
      setIsUser(false);
      setIsLogin(false);
      setIsRegister(false);
      setMessage(null);
    }
  }, [context.authenticated, isUser]);

  const changeState = (e) => {
    if (e.currentTarget.id === "login") setIsLogin(!isLogin);
    if (e.currentTarget.id === "register") setIsRegister(!isRegister);
  };

  const onSubmit = (e, submit, postID) => {
    e.preventDefault();
    if (e.target.name === "login") {
      login(submit).then((data) => {
        if (data.data.isAuthenticated) {
          setMessage({ msg: "Giriş Yapıldı", msgError: false });
          context.setPosts([]);
          context.setIsLoading(true);
          setTimeout(() => {
            context.setUser(data.data.user);
            context.setAuthenticated(data.data.isAuthenticated);
            setMessage(null);
          }, 1000);
        } else {
          setMessage(data.message);
          setTimeout(() => {
            setMessage(null);
          }, 1500);
        }
      });
    }
    if (e.target.name === "register") {
      if (validator.isEmail(submit.email) === false) {
        setMessage({
          msg: "Geçerli bir e-posta giriniz",
          msgError: true,
        });
        setTimeout(() => {
          setMessage(null);
        }, 1500);
        return;
      }
      register(submit).then((data) => {
        console.log(data);
        if (!data.data.message.msgError) {
          setMessage(data.data.message);
          setTimeout(() => {
            setMessage(null);
            setIsRegister(false);
          }, 1500);
        } else {
          setMessage(data.data.message);
          setTimeout(() => {
            setMessage(null);
          }, 1500);
        }
      });
    }
    if (e.target.name === "post") {
      isAuthenticated().then(() => {
        if (postID === 0) {
          createPost({ ...submit, creator: context.user.username }).then(
            (data) => {
              if (!data.data.message.msgError) {
                setMessage(data.data.message);
                context.fetchPost();
                setTimeout(() => {
                  setMessage(null);
                }, 1500);
              } else {
                setMessage(data.data.message);
                setTimeout(() => {
                  setMessage(null);
                }, 1500);
              }
            }
          );
        } else {
          updatePost(postID, submit).then((data) => {
            if (!data.data.message.msgError) {
              setMessage(data.data.message);
              context.fetchPost();
              setTimeout(() => {
                setMessage(null);
              }, 1500);
            } else {
              setMessage(data.data.message);
              setTimeout(() => {
                setMessage(null);
              }, 1500);
            }
          });
        }
      });
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles["posts-container"]}>
        <Posts />
      </div>
      <div className={styles.home}>
        {isUser ? (
          <User message={message} onSubmit={onSubmit} />
        ) : isLogin ? (
          <Login onClick={changeState} onSubmit={onSubmit} message={message} />
        ) : isRegister ? (
          <Register
            onClick={changeState}
            onSubmit={onSubmit}
            message={message}
          />
        ) : (
          <Home onClick={changeState} />
        )}
        <img
          className={styles["circle-1"]}
          src={process.env.PUBLIC_URL + "/svg/circle.svg"}
          alt="circle"
        />
        <img
          className={styles["circle-2"]}
          src={process.env.PUBLIC_URL + "/svg/circle-2.svg"}
          alt="circle"
        />
      </div>
    </div>
  );
};

export default Index;
