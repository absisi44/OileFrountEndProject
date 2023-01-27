import { Company } from "./companies";
import { discriminations } from "./discriminations";
import { fuel } from "./fuel";

export interface Stock{
    id:number;
    stockId:string;
    quantity:number;
    companies:Company;
    fuel:fuel;
    discriminations:discriminations;
    
}