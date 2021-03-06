var request = require('request'),
    constants = require('../constants')

module.exports.getData = (url, token = '') => {
    var options = {
        url: url,
        headers: {
            authorization: token
        }
    }
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (error) reject(error)
            resolve(JSON.parse(response.body))
        })
    })
}

module.exports.postData = (url, data, token) => {
    var options = {
        url: url,
        json: data,
        headers: {
            authorization: token,
            "content-type": "application/json"
        }
    }
    return new Promise((resolve, reject) => {
        request.post(options, function (error, response, body) {
            if (error) reject(error)
            resolve(response.body)
        })
    })
}

module.exports.deleteData = (url, token) => {
    var options = {
        url: url,
        headers: {
            authorization: token
        }
    }
    return new Promise((resolve, reject) => {
        request.delete(options, function (error, response, body) {
            if (error) reject(error)
            resolve(response.body)
        })
    })
}
var url = 'https://sedam-it-bot.herokuapp.com/login_callback'
module.exports.loginUrl = (address, dialog_name, type, args = '') => {
    return `${constants.base_url}/${type}?data=${encodeURI(JSON.stringify({
        redirect_url: url,
        address: address,
        dialog_name: dialog_name,
        matched: args
    }))}`
}
