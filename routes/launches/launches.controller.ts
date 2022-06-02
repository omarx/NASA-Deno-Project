import {abortLaunchById, existsLaunchWithId, getAllLaunches, scheduleNewLaunch} from "../../models/launches.models.ts";
//returns All planets as API call
export const httpGetAllLaunches=async(req:any,res:any)=>{
    return res.json(await getAllLaunches());
}
//Checks to see if the data receives is allowed
//Adds the data to the database
export const httpAddNewLaunch=async (req:any,res:any)=>{
    const launch=req.body;
    if(!launch.mission|| !launch.rocket || !launch.launchDate || !launch.target){
        return res.json({
            error:"Missing required launch field",
        })
    }
    launch.launchDate= new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.json({
            error:"Invalid launch date",
        })
    }
    await scheduleNewLaunch(launch);
    return res.json(launch);
}
//Checks if launch exists then aborts its see models file
export const httpAbortLaunch=async (req:any,res:any)=>{
    const launchId=Number(req.params.id);
    const existsLaunch = await existsLaunchWithId(launchId);
    if (!existsLaunch){
        return res.json({
            error:"Launch not found"
        })
    }
    const aborted = await abortLaunchById(launchId);
    if(!aborted){
        return res.json({error: 'Launch not aborted'})
    }
    return res.json({ok:'true'})
}