class DistanceCalculator{
    /**
     * Constructor of class that calculates distance and plots it over google maps
     * @param airport1 airportComplete Object for start
     * @param airport2 airportComplete Object for end
     * @param map google map object
     */
    constructor(airport1, airport2, map){
        this.airport1 = airport1;
        this.airport2 = airport2;
        this.map = map;
        this.markerStart = null;
        this.markerStop = null;
        this.path = null;
    }

    /**
     * Function that calculates nautical miles distance given two points on the map
     * @returns {number}
     */
    calculate(){
        /**
         * Formula taken from https://www.movable-type.co.uk/scripts/latlong.html
         */
        if(this.airport1.isValid() && this.airport2.isValid()){
            const selectedAirport1 = this.airport1.getSelectedAirport();
            const selectedAirport2 = this.airport2.getSelectedAirport();
            const lat1 = selectedAirport1.lat;
            const lon1 = selectedAirport1.lon;
            const lat2 = selectedAirport2.lat;
            const lon2 = selectedAirport2.lon;
            const R = 6371; // Radius of the earth in km
            let dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
            let dLon = (lon2 - lon1) * Math.PI / 180;
            let a =
                0.5 - Math.cos(dLat)/2 +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                (1 - Math.cos(dLon))/2;

            let d = R * 2 * Math.asin(Math.sqrt(a));
            return d / 1.852;
        }
        return -1;
    }

    /**
     * Plot the path and mark the points on the map
     */
    plotOnMap() {
        if(this.airport1.isValid() && this.airport2.isValid()){
            this.clearMarkings();
            let selectedAirport1 = this.airport1.getSelectedAirport();
            let selectedAirport2 = this.airport2.getSelectedAirport();
            let lat1 = selectedAirport1.lat;
            let lon1 = selectedAirport1.lon;
            let lat2 = selectedAirport2.lat;
            let lon2 = selectedAirport2.lon;
            let dLon = (lon2 - lon1) * Math.PI / 180;

            let Bx = Math.cos(lat2 * Math.PI / 180) * Math.cos(dLon);
            let By = Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon);
            let lat3 = Math.atan2(Math.sin(lat1 *  Math.PI / 180) + Math.sin(lat2 * Math.PI / 180),
                Math.sqrt( (Math.cos(lat1 * Math.PI / 180)+Bx)*(Math.cos(lat1 * Math.PI / 180)+Bx) + By*By ) );
            let lon3 = (lon1* Math.PI / 180) + Math.atan2(By, Math.cos(lat1 * Math.PI / 180) + Bx);

            // Caculate mid point to recenter the map
            lat3 = DistanceCalculator.radians_to_degrees(lat3);
            lon3 = DistanceCalculator.radians_to_degrees(lon3);

            let start = new google.maps.LatLng(lat1, lon1);
            let end = new google.maps.LatLng(lat2, lon2);

            this.path = new google.maps.Polyline({
                path: [start, end],
                strokeColor: "#0000FF",
                strokeOpacity: 0.8,
                strokeWeight: 3
            });

            this.markerStart = new google.maps.Marker({
                position: start,
                animation: google.maps.Animation.BOUNCE
            });

            this.markerStop = new google.maps.Marker({
                position: end,
                animation: google.maps.Animation.BOUNCE
            });

            this.markerStart.setMap(this.map);
            this.markerStop.setMap(this.map);

            this.map.setCenter(new google.maps.LatLng(lat3, lon3));

            this.path.setMap(this.map);

        }
    }

    /**
     * Reset the markings and path over the map for next time use.
     */
    clearMarkings (){
        if(this.markerStop)
            this.markerStop.setMap(null);
        if(this.markerStart)
            this.markerStart.setMap(null);
        if(this.path)
            this.path.setMap(null);
    }

    /**
     * Helper functon to convert radians to degrees
     * @param radians
     * @returns {string} degrees
     */
    static radians_to_degrees(radians)
    {
        let pi = Math.PI;
        return (radians * (180/pi)).toFixed(3);
    }

}