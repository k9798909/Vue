import axios from "axios";

axios.defaults.timeout = 8000;
axios.defaults.baseURL = "/api"; // 域名

// http request 欄截
axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers = { // 如果沒有cors的問題則可以都不加
      "Access-Control-Allow-Origin": process.env.API_ROOT,
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
      "Access-Control-Max-Age": "86400",
      'Content-type': 'application/json; charset=utf-8',
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 異常處理
axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 404:
          console.log("找不到該頁面");
          break;
        case 500:
          console.log("伺服器出錯");
          break;
        case 503:
          console.log("服務失效");
          break;
        default:
          console.log(`連接錯誤${err.response.status}`);
      }
    } else {
      console.log("連接到服務器失敗");
    }
    return Promise.resolve(err.response);
  }
);

export const getProductList = () => axios.get("/product");
export const getProduct = (productId:string) => axios.get(`product/${productId}`);
export const updateProduct = (product:any) => axios.put("/product",product);
export const addProduct =(product:any) => axios.post("/product",product);
export const deleteProduct =(productDto:any) => axios.delete("/product",{ data :  productDto});