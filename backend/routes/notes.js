const express = require("express")
const fetchUser = require("../middleware/fetchUser")
const Note = require("../models/Note")
const Router = express.Router()
Router.get('/allnotes', fetchUser, async (req, res) => {
    try {

        const data = await Note.find({ user: req.user.id });
    
        res.json(data)
    }
    catch (e) {
        res.status(500).json({ error: "Internal server error" })

    }
})
Router.post('/addnotes', fetchUser, async (req, res) => {
    try {

        const { title, description, tags } = req.body
        const data = await Note.create({ title, description, tags, user: req.user.id })

        res.json(data)
    }

    catch (e) {
        console.log(e)
        res.status(500).json({ error: "Internal server error" })

    }
})
Router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {

        const { title, description, tag } = req.body
        updated = {}
        if (title) { updated.title = title }
        if (description) { updated.description = description }
        if (tag) { updated.tag = tag }
        data = await Note.findById(req.params.id)
        if (!data) {
            res.status(404).send("Not found")
        }
        if (req.user.id == data.user.toString()) {
            feedback = await Note.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
            res.json(feedback)
        }

    }

    catch (e) {
        console.log(e)
        res.status(500).json({ error: "Internal server error" })

    }
})
Router.delete("/deletenote/:id", fetchUser, async (req, res) => {
    try {

        const data = await Note.findById(req.params.id)

        if (!data) {
            res.status(404).send("Not found")
        }
        if (req.user.id == data.user.toString()) {
            feedback = await Note.findByIdAndDelete(req.params.id)
            res.json(feedback)
        }
    } catch (e) {
        res.status(404).json({ "error": "note not found" })

    }

})
module.exports = Router