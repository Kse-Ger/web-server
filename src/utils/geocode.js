const request = require('request')

const geocode = (city, countryCode, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=b6fdf7f092b3e98d09472298b383d651&query=' + encodeURIComponent(city) + '&country=' + encodeURIComponent(countryCode)

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service', undefined)
        } else if (body.error || body.data.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                lat: body.data[0].latitude,
                long: body.data[0].longitude,
                location: body.data[0].name
            }) 
        }
    })
}

module.exports = geocode