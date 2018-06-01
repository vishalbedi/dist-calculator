const fs = require('fs');
const allAirportsObject = require('../data/airports'); // Json in Object form

/***
 * Auto Executing function that converts All Airports JSON file to US only Airports File
 * This is a utility function that will be invoked only once to generate US only airports
 *
 * To execute this on console inside utils folder of this project just type
 *  $ node filterUSAOnly.js
 */
((fs, allAirportsObject)=> {
    let allAirportsArray = [];
    let usOnlyFileName = `../data/airport-us.json`;
    Object.keys(allAirportsObject).forEach(key=> allAirportsArray.push(allAirportsObject[key])); //Convert to array
    let usOnlyAirports = allAirportsArray.filter(airport => airport.country === "US");

    fs.writeFile(usOnlyFileName, JSON.stringify(usOnlyAirports), (err) =>{
        if(!err)
            console.log('Success!!');
    });
}) (fs,allAirportsObject);


