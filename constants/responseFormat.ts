import { responseData } from "../interfaces";

const responseFormat = ({datas,message,code,statut}:responseData)=>{
    return {statut:statut?statut:true,message:message?message:"Requette éffectuer avec succes !",code:code?code:200,datas:datas}
}

export default responseFormat;
