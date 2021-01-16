import React from 'react'

import styles from "./Message.module.css";

const style = (props) => {
    if (props.message.hasOwnProperty("msgType")) {
      if (props.message.msgError) {
        return styles["delete-error"];
      } else {
        return styles["delete-success"];
      }
    }
    if (props.message.msgError) {
        return styles.error
    } else {
        return styles.success
    }
}

const Message = (props) => {
    return (
        <div className={style(props)}>
            {props.message.msg}
        </div>
    )
}

export default Message
