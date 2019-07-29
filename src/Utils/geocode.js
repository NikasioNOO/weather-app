const request = require('request');

var geocodeAdress = (address, callback) => {
    request({url: `http://www.mapquestapi.com/geocoding/v1/address?key=tbRDskPe7RnGOjO9PGeLMLovd2yRIvlD&location=${encodeURIComponent(address)}`
     , json:true}, 
    (error, response, body) => {
    if (error) {
        callback('Unable to connect to location services!', undefined)
    } else if (!body || body.info.statuscode !== 0) {
        callback('Unable to find location. Try another search.', undefined) 
    }
    else {
        callback( undefined, {
            lat:body.results[0].locations[0].latLng.lat,
            lng:body.results[0].locations[0].latLng.lng,
            location :body.results[0].locations[0].street
        });
    }}
    )
}

module.exports = {
    geocodeAdress
}