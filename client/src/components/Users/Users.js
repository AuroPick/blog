import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { isAuthenticated, getUsers, deleteUser } from "../../api";
import Message from "../Message/Message";

import styles from "./Users.module.css";

const Users = () => {
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [message, setMessage] = useState(null);
  const history = useHistory();

  useEffect(() => {
    isAuthenticated().then((data) => {
      if (data.data.isAuthenticated) {
        getUsers().then((users) => {
          if (!users.message.msgError) {
            users.getUsers.data.map((user) => {
              return setFetchedUsers((prevState) => [...prevState, user]);
            });
          }
        });
      }
    });
  }, []);

  const deleteeUser = (id) => {
    deleteUser(id).then((data) => {
      console.log(data);
      if (!data.data.message.msgError) {
        const newUsers = fetchedUsers.filter((user) => user._id !== id);
        setFetchedUsers(newUsers);
        setMessage(data.data.message);
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
  };

  return (
    <div className={styles["table-container"]}>
      <button onClick={() => history.push("/")} className={styles.link}>
        Ana Sayfa
      </button>
      {message && <Message message={message} />}
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table className={styles.table} araia-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rol</TableCell>
              <TableCell>Kullanıcı Adı</TableCell>
              <TableCell>E-Posta</TableCell>
              <TableCell>Şifrelenmiş Parola</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Sil</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchedUsers.map((fetchedUser) => (
              <TableRow key={fetchedUser._id}>
                <TableCell>{fetchedUser.role}</TableCell>
                <TableCell>{fetchedUser.username}</TableCell>
                <TableCell>{fetchedUser.email}</TableCell>
                <TableCell>{fetchedUser.password}</TableCell>
                <TableCell>{fetchedUser._id}</TableCell>
                <TableCell>
                  {fetchedUser.role !== "admin" && (
                    <button
                      className={styles.button}
                      onClick={() => deleteeUser(fetchedUser._id)}
                    >
                      Sil
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
