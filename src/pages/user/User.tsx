import React from "react";
import "../../App.css";
import './User.css';
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
//redux imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { CheckUserPass, createUser, selectUserName, selectUserBalance } from "../../app/appSlice";//jwt and else pt1
import { addNewItem } from "../../app/basketSlice";//for basket pt2
//redux imports
import { sendAccToken, sendRefToken } from "../../api/posts";
import { NavBar } from "../nav/NavBar";


export let interval: NodeJS.Timer;//для остановки цикла когда пользователь выйдет из акк

//for logged user
function UserPage() {
  const username = useAppSelector(selectUserName);
  const balance = useAppSelector(selectUserBalance);
  const dispatch = useAppDispatch();

  useEffect(() => {//отправляю токен 1 раз при рендере и создаю интервал в котором вызываю отправку токена повторно
    clearInterval(interval);//при возвращении на страницу после каких либо действий создается еще один интервал---я его удоляю
    sendAccToken()
      .then((res) => {
        interval = setInterval(() => {
          sendRefToken()
            .then((res) => {
              setTimeout(() => {
                sendAccToken();
              }, 5000)
            })

        }, 5000);
      })

  }, []);


  return (
    <>

      <header>
        <h1> Здраствуйте {username},ваш баланс {balance}$ <NavBar /> </h1>
      </header>


      <div>
        <div className="dish">
          <img src={require("../../img/burger.png")} />
          <div>
            burger
            <div>price:10$</div>
            <button onClick={() => dispatch(addNewItem({ name: "burger", price: 10 }))}>buy</button>
          </div>
        </div>
      </div>

      <div>
        <div className="dish">
          <img src={require("../../img/potato.png")} />
          <div>
            potato
            <div>price:20$</div>
            <button onClick={() => dispatch(addNewItem({ name: "potato", price: 20 }))} >buy</button>
          </div>
        </div>
      </div>

      <div>
        <div className="dish">
          <img src={require("../../img/pizza.png")} />
          <div>
            pizza
            <div>price:30$</div>
            <button onClick={() => dispatch(addNewItem({ name: "pizza", price: 30 }))}>buy</button>
          </div>
        </div>
      </div>

    </>
  );
}
//for logged user


//for new User
function CreateUser() {
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
    if (newuser !== "" && newpass === secpass && newpass !== "") {
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
            Введите данные для создания пользователя
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
            <button
              className="loginBtn"
              onClick={() => {
                dispatch(createUser(user));
                setClick(click + 1);
              }}
            >
              Создать пользователя
            </button>
          </div>
          <div className="errorMass">
            {" "}
            {secpass === newpass
              ? ""
              : "проверте поля : подтверждения пароля и пароль"}
          </div>
          <div>
            <button className="backBtn">
              <Link className="Link" to="/">
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

export { UserPage, CreateUser };
