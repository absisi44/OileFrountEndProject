import { Company } from "./companies";
import { discriminations } from "./discriminations";
import { fuel } from "./fuel";
import { locals } from "./locals";

export interface Income {

    
    id:number;
    incomeDate:Date;
    incomeId:string;
    truckNo:string;
    fuel:fuel;
    quantity:number;
    discriminations:discriminations;
    companies:Company;
    locales:locals;
    invoiceNo:string;
    shippingDate:Date;
    status:string;

}