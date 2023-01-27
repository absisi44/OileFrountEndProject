import { Income } from "./incomFuel";

export interface Discharge{
    id:number,
    dischargeId:string;
    dischargeDate:Date;
    comManName:string;
    income:Income;
    empName:string;

}