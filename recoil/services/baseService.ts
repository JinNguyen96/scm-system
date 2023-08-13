import { AxiosRequestConfig } from "axios";
import { http } from "./config";
export default class BaseServices {
    get = (url: string) => {
        return http.get(url);
    };
    post = (url: string, data: any) => {
        return http.post(url, data);
    };
    put = (url: string, data: any) => {
        return http.put(url, data);
    };
    delete = (url: string, data: AxiosRequestConfig<any> | undefined) => {
        return http.delete(url, data);
    };
}
