import { responseData } from "../interfaces";
import * as codes from './codes'

const responseFormat = ({datas,message,code=codes.success,statut=true}:responseData)=>{
    return {statut:statut,message:message?message:"Requette éffectuer avec succes !",code:code,datas:datas}
}

export default responseFormat;
