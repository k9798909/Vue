import axios, { AxiosInstance } from "axios";

// http request 欄截
const apiClient: AxiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    'Content-type': 'application/json; charset=utf-8',
    "Access-Control-Allow-Origin": process.env.API_ROOT,
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    "Access-Control-Max-Age": "86400",
  },
});

export const getProductList = (): Promise<any> => apiClient.get("/product");
export const getProduct = (productId: string): Promise<any> => apiClient.get(`product/${productId}`);
export const updateProduct = (product: unknown): Promise<any> => apiClient.put("/product", product);
export const addProduct = (product: unknown): Promise<any> => apiClient.post("/product", product);
export const deleteProduct = (productDto: unknown): Promise<any> => apiClient.delete("/product", { data: productDto });
