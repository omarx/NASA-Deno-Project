import {Router} from '../../deps.ts';
import {httpGetAllPlanets} from "./planets.controller.ts";

//Basic express routing or rather opine routing since we are using Deno

export const planetsRouter=Router().get('/',httpGetAllPlanets)

