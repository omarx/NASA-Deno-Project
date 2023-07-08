# Deno-Nasa-Project

This project is using Opine an third party module very similar to Node.js express server
## Getting Start with NASA DENO Project

This project was converted from ZTM [Zero To Mastery](https://zerotomastery.io/courses/learn-node-js/) node project using their React Frontend

## Available Scripts

In this project you can run:

### `Denon run -A server.ts or Deno run -A server.ts`

Runs app and ignores security features of Deno

Security cmds needed to run  `deno run server.ts`

--allow-read\
--allow env\
--allow-net

## Notes
Create a .env file and use PORT=Port# and add 
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.1lrvw.mongodb.net/?authMechanism=SCRAM-SHA-1
to run the server and connect to your Mongo DB Cloud Atlas
This an example use your own MONGO_URL from cloud atlas
