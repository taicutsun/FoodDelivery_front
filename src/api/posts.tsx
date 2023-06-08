import axios from "axios";
import { ProductType } from "../app/basketSlice";


let tokens = {
  accessToken: "",
  refreshToken: "",
};

//for loginPage
const axiosTest = async (user: string, pass: string) => {
  const response = await axios.post("http://localhost:3001/login", {
    username: user,
    password: pass,
  })
  if (response.data.status === true) {
    tokens.accessToken = response.data.accessToken;
    tokens.refreshToken = response.data.refreshToken;
  } else if (response.data.status === false) {
    console.log('err in auth func');
  }
  return response.data.status;
};

let authStatus;
export async function getAuthStatus(user: string, pass: string) {
  authStatus = await axiosTest(user, pass);
  return authStatus;
}
//for loginPage

//for userPage
export async function sendAccToken() {
  axios
    .post(
      "http://localhost:3001/posts",
      {},
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    )
}

export async function sendRefToken() {
  axios
    .post(
      "http://localhost:3001/token",
      {
        token: `${tokens.refreshToken}`,
      },
      {}
    )
    .then((res) => { console.log(res.data); tokens.accessToken = res.data.accessToken })
}

//for logslice
export function axSendU(newuser: string, newpass: string): void {
  axios
    .post("http://localhost:3001/create", {
      username: newuser,
      password: newpass,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      if (err.response) {
        console.log("why");
      } else if (err.request) {
        console.log("req");
      } else {
        console.log("me");
      }
    });
}

//for basket


export function sendProduct(product: ProductType): void {
  axios
    .post("http://localhost:3001/basket", {
      product: product
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      if (err.response) {
        console.log("why");
      } else if (err.request) {
        console.log("req");
      } else {
        console.log("me");
      }
    });
}


export function delProduct(product: ProductType): void {
  axios
    .post("http://localhost:3001/delete", {
      product: product
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      if (err.response) {
        console.log("why");
      } else if (err.request) {
        console.log("req");
      } else {
        console.log("me");
      }
    });
}
