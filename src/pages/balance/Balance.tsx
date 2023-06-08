import React from "react";
import "../../App.css";
import "./Balance.css";
import { useState } from "react";
//redux imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectUserBalance, TopUp } from "../../app/appSlice";
//redux imports
import { NavBar } from "../nav/NavBar";


export function Balance() {
    const [increase, setIncrease] = useState(0);
    const dispatch = useAppDispatch();
    const balance = useAppSelector(selectUserBalance);

    return (
        <>
            <h1>Пополнить баланс  <NavBar /> </h1>

            <div>
                <div>Ваш баланс: {balance}</div>
                На сколько вы хотите пополнить
                <input
                    type="number"
                    id="increasN"
                    onChange={(e) => setIncrease(+e.target.value)} />

                <div className="inputWrap"> <button onClick={() => dispatch(TopUp(increase))}>Пополнить </button> </div>

            </div>
        </>

    );
}