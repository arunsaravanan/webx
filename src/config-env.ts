
/* tslint:disable */
// @ts-nocheck

const { writeFile } = require('fs');

// read environment variables from .env file
const { argv } = require('yargs');
require('dotenv').config()
const environment = argv.environment;

const isProduction = environment === 'prod';

let clientID = process.env.CLIENT_ID;
let clientSecret = process.env.CLIENT_SECRET;
if(!clientID || !clientSecret) {
    console.log("All required environment variables are not provided!");
    process.exit(-1);
}

const targetPath = isProduction
   ? `./src/environments/environment.prod.ts`
   : `./src/environments/environment.ts`;

const envConfigFile = `
export const environment = { 
    production: ${isProduction},
    auth: {
        client_id: '${clientID}',
        redirect_uri: 'http://localhost:4200/callback',
        response_type: 'code',
        scope: 'spark:all',
        state: 'msgs-45jnf4f46',
    },
    access: {
        grant_type: 'authorization_code',
        client_id: '${clientID}',
        client_secret: '${clientSecret}',
        redirect_uri: 'http://localhost:4200/callback',
        code:''
    }
};`
writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
        console.log(err);
    }
    console.log(`Wrote variables to ${targetPath}`);
});
/* tslint:enable */