import {
  notifi,
  notifiError,
  notifiSuccess,
} from "../../components/toastify-noti/notifi";
import BaseServices from "./baseService";

export class HistoryService extends BaseServices {
  constructor() {
    super();
  }
  getAllHistory = async () => {
    return await this.get(`/api/historyApi/get-history`);
  };
  deleteHistory = async () =>{
    
  }
}

export const historyService = new HistoryService();
