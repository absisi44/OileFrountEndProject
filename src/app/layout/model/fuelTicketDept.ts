import { Company } from "./companies";
import { discriminations } from "./discriminations";
import { fuel } from "./fuel";

export interface FuelTicketDept{

    id:number;
    fueltiketfId:string;
    fueltiketfDate:Date;
    quantity:number;
    direcation:string;
    benficiary:string;
    fuel:fuel;
    companies:Company;
    discriminations:discriminations;
    status:string;
}