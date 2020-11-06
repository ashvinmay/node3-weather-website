const request = require('request')

const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXNodmlubWF5IiwiYSI6ImNrZ291OGJrajA1eGoydGxidHdoZHBrdWYifQ.2W1WhWPldEuSih6ljFk5Kw&limit=1'
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service!', undeined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode