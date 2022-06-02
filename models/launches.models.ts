import {Launches} from "../services/mongo.ts";
import {Planets} from "../services/mongo.ts";
const DEFAULT_FLIGHT_NUMBER=99;
//Checks to see if launch exist with flight number id
export const existsLaunchWithId=async(launchId:any)=>{
    return await Launches.findOne({flightNumber:launchId})
}
// Saves new launch to database
export const saveLaunch=async(launch:any)=> {
    const planet = await Planets.findOne({
        keplerName: launch.target,
    });
    if (!planet) {
        throw new Error('No matching planet was found')
    }
    await Launches.updateOne({flightNumber: launch.flightNumber},
        {$set: launch}, {upsert: true})
}
//aborts launch by updating 2 default fields
export const abortLaunchById=async (launchId:any)=>{
    const aborted= await Launches.updateOne({
        flightNumber:launchId,
    },{
        $set:{
            upcoming:false,
            success:false,
        }
    });
    return aborted.modifiedCount===1;
}
//gets the latest flight number if there is non its sets it to default number 99
export const getLatestFlightNumber=async()=>{
    const findLatestLaunches = await Launches.find({flightNumber:{$ne:null}}).toArray();
    const latestLaunch=findLatestLaunches.map(latestnumber=>latestnumber.flightNumber).sort(function(a,b){return b-a});
    return (isNaN(latestLaunch[0]))?DEFAULT_FLIGHT_NUMBER:latestLaunch[0];
}
//returns all launches
export const getAllLaunches=async()=>{
    return await Launches.find({flightNumber:{$ne:null}},{projection:{_id:0}}).toArray()
}
//creates new launch with default fields
export const scheduleNewLaunch=async (launch:any)=>{
    const newFlightNumber= await getLatestFlightNumber()+1;
    const newLaunch= Object.assign(launch,{
        success:true,
        upcoming:true,
        customers:['ZTM','NASA'],
        flightNumber:newFlightNumber,
    })
    await saveLaunch(newLaunch)
}

