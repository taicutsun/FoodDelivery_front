/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "../../App.css";
import "./User.css";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
//redux imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  CheckUserPass,
  create,
  selectUserName,
  selectUserBalance,
} from "../../app/appSlice"; //jwt and else pt1
import { addNewItem } from "../../app/basketSlice"; //for basket pt2
//redux imports
import { sendAccToken, sendRefToken, success } from "../../api/posts";
import { NavBar } from "../nav/NavBar";

export let interval: NodeJS.Timeout; //для остановки цикла когда пользователь выйдет из акк

//for logged user
function UserPage() {
  const username = useAppSelector(selectUserName);
  const balance = useAppSelector(selectUserBalance);
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState(true);

  useEffect(() => {
    //отправляю токен 1 раз при рендере и создаю интервал в котором вызываю отправку токена повторно
    clearInterval(interval); //при возвращении на страницу после каких либо действий создается еще один интервал---я его удоляю

    sendAccToken().then((res) => {
      if (success === false) {
        setStatus(false);
        clearInterval(interval);
      }

      interval = setInterval(() => {
        sendRefToken().then((res) => {
          setTimeout(() => {
            sendAccToken();

            if (success === false) {
              setStatus(false);
              clearInterval(interval);
            }
          }, 5000);
        });
      }, 5000);
    });
  }, []);

  if (!status) {
    return <Navigate to="/" />;
  } else {
    return (
      <>
        <header>
          <h1>
            {" "}
            Здраствуйте {username},ваш баланс {balance}$ <NavBar />{" "}
          </h1>
        </header>

        <div>
          <div className="dish">
            <img src={require("../../img/burger.png")} />
            <div>
              burger
              <div>price:10$</div>
              <button
                onClick={() =>
                  dispatch(addNewItem({ name: "burger", price: 10 }))
                }
              >
                buy
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="dish">
            <img src={require("../../img/potato.png")} />
            <div>
              potato
              <div>price:20$</div>
              <button
                onClick={() =>
                  dispatch(addNewItem({ name: "potato", price: 20 }))
                }
              >
                buy
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="dish">
            <img src={require("../../img/pizza.png")} />
            <div>
              pizza
              <div>price:30$</div>
              <button
                onClick={() =>
                  dispatch(addNewItem({ name: "pizza", price: 30 }))
                }
              >
                buy
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
//for logged user


//for flag
let flag:boolean = false;//false for new user;false-password
let alrdCreate:boolean = false;
let donExist:boolean = false;

//set func
function setFlag(value:boolean):void{
  flag = value;
}

function setAlr(value:boolean):void{
  alrdCreate = value;
}

function setExist(value:boolean):void{
  donExist = value;
}

//set func


//for new User
function Create() {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(false);
  const [newuser, setNewUsername] = useState("");
  const [newpass, setNewPass] = useState("");
  const [secpass, setSecPass] = useState("");
  const [click, setClick] = useState(0);

  const user: CheckUserPass = {
    username: newuser,
    password: newpass,
    secPass: secpass
  };

  useEffect(() => {
    if (click>1 && newuser !== "" && newpass === secpass && newpass !== "" && alrdCreate !==true && donExist !==true) {//have to rework click>1(not smart solution)
      console.log(user);
      setStatus(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [click]);

  if (status) {
    return <Navigate to="/" />;
  } else {
    return (
      <>
        <div id="createWrap">
          <div className="greating">
          {flag === false
              ? "Введите данные для создания пользователя"
              : "Введите данные для создания нового пароля" 
              }
            
          </div>
          <form>
            <label>Имя</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <label>пароль</label>
            <input
              type="text"
              name="password"
              id="addPass"
              onChange={(e) => setNewPass(e.target.value)}
            />
            <label>подтвердите пароль</label>
            <input
              type="text"
              name="password"
              id="addPass"
              onChange={(e) => setSecPass(e.target.value)}
            />
          </form>
          <div>
            {" "}
            <button
              className="loginBtn"
              onClick={() => {
                dispatch(create(user));
                setClick(click + 1);
              }}
            >
               {flag===false
              ? "Создать пользователя"
              : "создать пароль"
              }
              
            </button>
          </div>
          <div className="errorMass">
            {" "}
            {secpass === newpass
              ? ""
              : "проверте поля : подтверждения пароля и пароль"}
              {alrdCreate === false
              ? ""
              : "пользователь с текущим именем уже создан"}
              {donExist === false
              ? ""
              : "пользователь с текущим именем не существует"}
          </div>
          <div>
            <button className="backBtn">
              
              <Link to="/">
                Назад
              </Link>
            </button>
          </div>
        </div>
      </>
    );
  }
}
//for new User

export { UserPage, Create,setFlag,flag,setAlr,setExist };
