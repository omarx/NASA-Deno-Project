import {Router} from "../../deps.ts";
import {httpAbortLaunch, httpAddNewLaunch, httpGetAllLaunches} from "./launches.controller.ts";

//Basic express routing or rather opine routing since we are using Deno

export const LaunchesRouter=Router().get('/',httpGetAllLaunches);
export const AddLaunchRouter=Router().post('/',httpAddNewLaunch);
export const DeleteLaunchRouter=Router().delete('/:id',httpAbortLaunch)