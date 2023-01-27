import { Company } from "./companies";
import { fuel } from "./fuel";

export interface Transit{
    id:number;
    transitId:string;
    incomeDate:Date;
    truckNo:string;
    fuel:fuel;
    quantity:number;
    companies:Company;
    shepmetDirection:string;
    agentName:string;

}