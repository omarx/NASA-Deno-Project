import {opine,log,opineCors,serveStatic,json,join} from "./deps.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import {planetsRouter} from "./routes/planets/planets.router.ts";
import {AddLaunchRouter, DeleteLaunchRouter, LaunchesRouter} from "./routes/launches/launches.router.ts";
const port = Deno.env.get("PORT");
const app=opine();

//middleware
app.use(opineCors({
    origin:'http://localhost:3000'
}))
app.use(json())
app.use('/planets',planetsRouter)
app.use('/launches',LaunchesRouter)
app.use('/launches',AddLaunchRouter)
app.use('/launches',DeleteLaunchRouter)
app.use(serveStatic(join("public")))
app.get('/*',(req,res)=>{
    res.sendFile(join("public","index.html"))
})
//start server
app.listen(Number(port),
    ()=>log.info(`Server is running on port ${port}`))


