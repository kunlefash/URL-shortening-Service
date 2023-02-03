const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')
const router = express.Router()
const Url = require('../models/Url')
const baseUrl = 'http:localhost:5000'

router.post('/shorten', async (req, res) => {
    const {
        longUrl
    } = req.body

    // Check base url if valid using the validUrl.isUri method
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('URL is Invalid')
    }
    //Generates Short Url if Url is valid
    const urlCode = shortid.generate()

    // check long url if valid using the validUrl.isUri method
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({
                longUrl
            })

            if (url) {
                res.json(url)
            } else {
                const shortUrl = baseUrl + '/' + urlCode
                // invoking the Url model and saving to the DB
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save()
                res.json(url)
            }
        }
        // exception handler
        catch (err) {
            console.log(err)
            res.status(500).json('Server Error')
        }
    } else {
        res.status(401).json('Invalid longUrl')
    }
})

module.exports = router