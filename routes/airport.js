let usOnlyAirports = require('../data/airport-us');
let debug = require('debug')('dist-calculator:routes:airport');

module.exports = (router)=>{

    /***
     * Function that filters airports based on partial airport or city name.
     * The filtering is performed on Name of the airport and CIty in which the airport is located
     * @param req express request object that contains partial airport name
     * @param res express response object
     * @param next
     * @returns {*|Promise<any>}
     */
    let getAirports = (req, res, next) => {
        debug('airport: ', req.body);
        if (Object.keys(req.body).length === 0 || !req.body.airport || req.body.airport.length < 3) {
            return res.status(400).json({
                'error': 'Please Enter at least letter to get the result',
                'msg': 'please enter the name of airport'
            });
        }
        let reqAirport = req.body.airport;
        let reqestedAirportRegex = new RegExp(reqAirport, 'i');
        let airportsMatched = usOnlyAirports.filter(airport => airport.name
            .search(reqestedAirportRegex) >= 0 || airport.city.search(reqestedAirportRegex) >= 0);
        debug(`Airports found with input ${reqAirport} : `, airportsMatched.length);
        return res.status(200).json(airportsMatched);
    };
    // complete URL : http://host/v2/airports
    router.route('/airports')
        .post(getAirports);
};

