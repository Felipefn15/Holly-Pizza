import axios from "axios";

import appConfig from "./appConfig";


export default class PizzaOrders {
    static getRequest(url) {
      return axios.get(url);
    }

    static postRequest(url) {
        return axios.post(url);
      }

    static getAllProducts() {
    return PizzaOrders.getRequest(`${appConfig.apiUrl}/itens`);
    }

    static postLogin(login,password) {
        return PizzaOrders.postRequest(`${appConfig.apiUrl}/login?login=${login}&password=${password}`);
    }

    static postItemsCart(login,item) {
        return PizzaOrders.postRequest(`${appConfig.apiUrl}/cart?login=${login}&item=${item}`);
    }

    static getItemsCart(mode,login) {
        return PizzaOrders.getRequest(`${appConfig.apiUrl}/cart?login=${login}&mode=${mode}`);
    }

    static postItemsHistory(mode,login,item,quantity,price) {
        return PizzaOrders.postRequest(`${appConfig.apiUrl}/cart?login=${login}&item=${item}&quantity=${quantity}&price=${price}&mode=${mode}`);
    }
}