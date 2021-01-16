import React from 'react'

import styles from "./Home.module.css"

const Home = props => {
    return (
      <>
        <h1 className={styles.h1}>Özel Gönderileri Görmek İçin Hemen</h1>
        <button
          className={styles.button}
          id="login"
          onClick={(e) => props.onClick(e)}
        >
          Giriş Yap
        </button>
        <h1 className={`${styles["last-h1"]} ${styles.h1}`}>Hesabınız Yok Mu?</h1>
        <button
          className={styles.button}
          id="register"
          onClick={(e) => props.onClick(e)}
        >
          Kayıt Ol
        </button>
      </>
    );
}

export default Home
