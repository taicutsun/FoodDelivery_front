import React from "react";
import "../../App.css";
import "./Log.css";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
//redux imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {setUser, selectLog , UserState } from "../../app/appSlice";
//redux imports
import { getAuthStatus } from "../../api/posts";
import {setFlag} from "../user/User";



interface ErrMassProps {
  cl: number
}

function LogMass(props: ErrMassProps) {
  const log = useAppSelector(selectLog); console.log(props.cl);
  if (log.logged === "failed" && props.cl >= 1) {
    return (
      <>
        <div className="errorMass">Пароль или Имя неверно</div>
      </>
    );
  } else return <></>;
}

let authStatus: boolean;//=res.data.status
export function LoginPage() {
  const [user, setUsername] = useState("");
  const [pass, setPass] = useState("");
  //for sending to server
  const dispatch = useAppDispatch();
  //for user
  const failed: UserState = {//для корректной отправки состаяния пользователя
    username: user,
    password: pass,
    logged: "failed",
    balance: 0
  };
  const pending: UserState = {//для корректной отправки состаяния пользователя
    username: user,
    password: pass,
    logged: "pending",

    balance: 10//change to zero when done

  };
  //for user
  const [status, setStatus] = useState(false);
  const [click, setClick] = useState(0);

  useEffect(() => {
    if (click >= 1) {
      let data = getAuthStatus(user, pass);//true or false

      data.then((result) => {
        authStatus = result;
        if (authStatus === true) {
          dispatch(setUser(pending));
          setStatus(true);
          setClick(0);

        }
        else if (authStatus === false) {
          dispatch(setUser(failed));

        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [click, status]);

  //for sending to server

  if (status) {
    return <Navigate to="/user" />;
  } else {
    return (
      <>
        <div id="mainWrap">
          <div className="greating">Вход</div>
          <form>
            <label>Имя</label>
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>пароль</label>
            <input
              type="text"
              name="password"
              onChange={(e) => setPass(e.target.value)}
            />
          </form>
          <button
            className="loginBtn"
            onClick={() => {
              setClick(click + 1);
            }}
          >
            Войти
          </button>
          <LogMass cl={click} />
          <div>
            <button className="backBtn">
              <Link className="Link" to="/">
                Назад
              </Link>
            </button>
          </div>
          <div onClick={()=>setFlag(true)}><Link className="Link" to="/create">Забыли пароль?</Link></div>
        </div>
      </>
    );

  }
}
//for log
