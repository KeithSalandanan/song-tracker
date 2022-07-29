const {Song} = require('../models')

module.exports = {
    async index (req, res) {
        try {
            const song = await Song.findAll()
            res.send(song)
        } catch (error) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the songs.'
            })
        }
    },
    async post (req, res) {
        try {
            const song = await Song.create(req.body)
            res.send(song)
        } catch (error) {
            res.status(500).send({
                error: 'An error has occured trying to create the song.'
            })
        }
    },
    async put (req, res) {
        try {
            const song = await Song.update(req.body, {
                where: {
                    id: req.params.songId
                }
            })
            res.send(song)
        } catch (error) {
            res.status(500).send({
                error: 'An error has occured trying to update the song.'
            })
        }
    },
    async delete (req, res) {
        try {
            const song = await Song.findById(req.params.songId)
            await song.destroy()
            res.send(song)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: 'An error has occured trying to delete the song.'
            })
        }
    }
}