'use strict';

class AirportAutocomplete {
    /**
     * Autocomplete class  constructor that fetches list of airports on the fly as user types
     * @param inputElement input element where user types partial name
     * @param dataListElement HTML list element where the fetched list of airports is bound
     * @param errorElement element where error is displayed if user enters something wrong
     */
    constructor(inputElement, dataListElement, errorElement){
        this.xhr = new XMLHttpRequest();
        this.errorElement = errorElement;
        this.MINCHARLIMIT = 3;
        this.inputElement = inputElement;
        this.dataListElement = dataListElement;
        this.url = '/v2/airports'
        this.response = [];
    }

    /**
     * Function that ataches key up event on HTML input element
     */
    attachEvents(){
        this.inputElement.addEventListener('keyup', (event)=>{
            this.keyUpEventHandler();
        });
    }

    /**
     * Key up event handler that performs AJAX request to fetch the list of airports and bind them to UI
     */
    keyUpEventHandler(){
        this.dataListElement.innerHTML = '';
        if(this.inputElement.value.length >= this.MINCHARLIMIT) {
            this.xhr.abort();
            this.xhr.onreadystatechange =  () => {
                if (this.xhr.readyState === XMLHttpRequest.DONE && this.xhr.status === 200) {
                    this.response = JSON.parse(this.xhr.responseText);
                    this.errorElement.innerHTML = this.response.length === 0 ? 'Invalid Airport!!' : '';
                    let listLimit = this.response.length > 50 ? 20 : this.response.length;
                    for(let i = 0; i < listLimit; i++){
                        let airportItem = this.response[i];
                        let option = document.createElement('option');
                        option.value = airportItem.name + ' | ' + airportItem.city;
                        this.dataListElement.append(option);
                    }
                }
            };
            this.xhr.open('POST', this.url, true);
            this.xhr.setRequestHeader("Content-Type", "application/json");
            let param = this.inputElement.value.split('|').length === 2 ? this.inputElement.value.split('|')[0].trim() :
                this.inputElement.value;
            this.xhr.send(JSON.stringify({'airport': param}));
        }else {
            this.errorElement.innerHTML = "";
        }
    }

    /**
     * Getter to fetch the selected Airport Object that contains information about latitude and longitude
     * @returns {AirportObject | undefined}
     */
    getSelectedAirport(){
        let param = this.inputElement.value.split('|').length === 2 ? this.inputElement.value.split('|')[0].trim() :
            this.inputElement.value;
        let regex = new RegExp(param,  'i');
        return this.response.find(element => element.name.search(regex) >= 0);
    }

    /**
     * Check if the selected airport is valid, User might type any input into the input column
     * that input must belong to the data that is in the airports JSON else the program cannot calculate the distance
     * @returns {boolean}
     */
    isValid(){
        for (let element of this.dataListElement.children) {
            if(element.value === this.inputElement.value) {
                return true;
            }
        }
        return false;
    }
}
