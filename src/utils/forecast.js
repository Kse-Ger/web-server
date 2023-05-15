const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=383cb2593b74f09aa0161d512a856480&query='+encodeURIComponent(lat)+','+encodeURIComponent(long)

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0]+'. It is currently '+ body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike+' degrees out. The UV index now is ' + body.current.uv_index + ".")
        }
    
    }) 
}

module.exports = forecast