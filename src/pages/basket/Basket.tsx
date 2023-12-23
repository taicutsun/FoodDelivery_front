/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "../../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//redux imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { ProductType, selectBasket, removeItem } from "../../app/basketSlice";
import { selectUserBalance } from "../../app/appSlice";
//redux imports
import { NavBar } from "../nav/NavBar";


//for basket
function Product({ name, price }: ProductType) {
    const dispatch = useAppDispatch();

    return (
        <div>
            <div className="dish" >
                <img src={require(`../../img/${name}.png`)} />
                <div >
                    {name}
                    <button className="deleteProduct" onClick={() => dispatch(removeItem({ name: name, price: price }))}>Удалить</button>
                </div>
            </div>



        </div>
    );
}


export function Basket() {
    const basket = useAppSelector(selectBasket);
    //const dispatch = useAppDispatch();
    const balance = useAppSelector(selectUserBalance);
    const [sum, setSum] = useState(0);

    useEffect(() => {
        axios
            .get("http://localhost:3001/basket")
            .then((res) => {
                setSum(res.data.sum);
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            <NavBar />

            <div>Ваш баланс {balance}$</div>

            {basket.map((item, index) => (
                <Product key={`${index}`} {...item} />
            ))}

            <div> <span style={{ margin: '0 0 0 10px' }}> Цена:{sum} </span>
                <button className="backBtn" style={{ width: '7%' }}>
                    <Link className="Link" to="/user/basket/buy">
                        Купить
                    </Link>
                </button>
            </div>

        </>
    );
}


