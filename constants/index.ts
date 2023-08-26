import * as dotenv from "dotenv";

export const port:number=parseInt(process.env.PORT as string, 10);

export const baseURL:string='/api'
export const itemsURL:string=baseURL+'/menu/items'