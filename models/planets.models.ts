import {BufReader, join, log, parse} from "../deps.ts";
import {Planets} from "../services/mongo.ts";

//Checks to see if planets fits criteria
const isHabitablePlanet=(planet:any)=>{
    return planet['koi_disposition']==='CONFIRMED'
        && planet['koi_insol']>0.36 && planet["koi_insol"] < 1.11
        && planet['koi_prad'] <1.6;
}
//Save Planets to database
const savePlanets=async (planet:any)=> {
    try {
        await Planets.updateOne({
            keplerName: planet.kepler_name,
        }, {
            $set: {keplerName: planet.kepler_name}
        }, {
            upsert: true,
        })

    } catch (error) {
        log.warning(`Could not save planet ${error}`)
    }
}
//gets planet info from  csv and then calls savePlanets
//Returns the planets that fit the criteria
const loadPlanets=async()=> {
    const path = join("data", "kepler_data.csv")
    const file = await Deno.open(path)
    const bufReader = await new BufReader(file)
    const data = await parse(bufReader, {
        skipFirstRow: true,
        comment: "#"
    })
    Deno.close(file.rid)

    const habitablePlanet=data.filter((planet) => isHabitablePlanet(planet))
    habitablePlanet.map((planets:any)=>savePlanets(planets))
    return habitablePlanet

}
const newEarth=await loadPlanets()
//returns the amount planets that fits criteria
const EarthFound=()=>{
    log.info(`${newEarth.length} habitable planets found!`)
}
EarthFound()

//returns the planets that have been saved to the database
export const getAllPlanets=async()=>{
    return await Planets.find({keplerName:{$ne:null}},{projection:{_id:0}}).toArray()
}

