const weatherform = document.querySelector('form')
const searchcity = document.querySelector('.city')
const searchcountrycode = document.querySelector('.countrycode')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading, please wait!'
    messageTwo.textContent = ''

    const city = searchcity.value
    const countrycode = searchcountrycode.value
    
    fetch('/weather?city=' + city + '&countryCode=' + countrycode).then((res) => {
    res.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.city
            messageTwo.textContent = data.forecast
        }
    })
})
})