import {getAllPlanets} from "../../models/planets.models.ts";

//Basic express routing or rather opine routing since we are using Deno

export const httpGetAllPlanets=async(req:any,res:any)=>{
    return res.json(await getAllPlanets())
}
