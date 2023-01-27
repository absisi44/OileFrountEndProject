import { Income } from "./incomFuel";

export interface exitPermit{
    id:number;
    exitpermitId:string;
    permitdate:Date;
    income:Income;
    reciptNo:string;
    fees:number;
    empName:string;
    checkBankNo:string;
}