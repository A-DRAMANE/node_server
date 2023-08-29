import { Assurance } from "./assurances/assurance.interface";
import { Item } from "./items/item.interface";

export interface responseData{
    statut: boolean,
    datas?: Assurance[] | Item[],
    message?:string
}

export interface responseObjet{
    statut: boolean,
    datas?: Assurance | Item,
    message?:string
}