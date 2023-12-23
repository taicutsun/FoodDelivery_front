import React from "react";
import "../../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//from redux
import { BuyProducts, selectUserBalance } from "../../app/appSlice";
import {  selectBasket, clearBasket } from "../../app/basketSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
//from redux



//for balance
export function BuyMenu() {
    const [status, setStatus] = useState(false);
    const dispatch = useAppDispatch();
    const basket = useAppSelector(selectBasket);
    const balance = useAppSelector(selectUserBalance);

    useEffect(() => {
        axios
            .post("http://localhost:3001/buy", {
            balance: balance
            })
            .then((res) => {
                if (res.data.success === true && basket.length !== 0) {
                    dispatch(BuyProducts(res.data.sum));
                    dispatch(clearBasket());
                    
                    setStatus(res.data.success);
                }
            })


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if (status) {
        return (
            <>
                <div>Спасибо за покупку!</div>
                <button className="backBtn" style={{ width: '7%' }}>
                    <Link className="Link" to="/user">
                        Назад
                    </Link>
                </button>

            </>
        );
    }
    else {
        return (
            <div>
                <span>{basket.length === 0 ? 'Ваша корзина пуста' : 'У вас недостаточно средств :('}</span>

                <button className="backBtn" style={{ width: '7%' }}  >
                    <Link className="Link" to="/user">
                        Назад
                    </Link>
                </button>

            </div>
        );
    }
}
