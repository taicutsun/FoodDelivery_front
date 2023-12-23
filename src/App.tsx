import React from "react";
import "./App.css";
import { UserPage, Create } from "./pages/user/User";
import { LoginPage } from "./pages/log/Log";
import { Home } from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import { Basket } from "./pages/basket/Basket";
import { Balance } from "./pages/balance/Balance";
import { BuyMenu } from "./pages/basket/BuyMenu";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="create" element={<Create />} />

        <Route path="user">
          <Route index element={<UserPage />} />
          <Route path="basket">
            <Route index element={<Basket />} />
            <Route path="buy" element={<BuyMenu />} />
          </Route>

          <Route path="balance" element={<Balance />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
