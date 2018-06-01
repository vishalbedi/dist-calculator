# Nautical Distance Calculator
This project is a simple web application that displays distance between two Airports across United States in nautical miles.
The data is taken from a JSON based file from [github](https://raw.githubusercontent.com/mwgg/Airports/master/airports.json)


## Prerequisite 
This project uses Node JS so make sure you have node and npm installed on machine.

To check if node is installed just type on your terminal 
```
$ node -v
```


### Getting Started 
The project needs only US airports and the original data had 28K airport across the world. The code to filter the data
is placed inside the ```dist-caculator/utils/filterUSAOnly.js```

The instruction for conversion are written in the filterUSAOnly.js file.

After the US Airport data is ready to run the complete demo just do 
```
$ npm install

$ npm run start:debug
```

or 

```
$ npm run start:dev
```

It will start the server that on port that is specified in .env file. 

With debug command it will print out the port on which the server is running. 

Open the browser and paste that address and the UI will appear. 


### Design decisions 

The most import decision was to choose client or server to filter the JSON data 
It was decided that server should be given that burden as clients might not be able to handle huge JSON file. 

Next was to smooth the UI when a user types in a partial airport or city name, the list of results is limited to 
50 items. If the limit is removed the browser freezes at times. 


#### Problems and Issues 
The webapp works on chrome without any issues. 

It will not work on Safari as HTML datalist is not supported by safari
