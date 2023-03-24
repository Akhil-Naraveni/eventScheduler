const express = require("express")
const bodyParser = require("body-parser")
const Event = require("../model/eventmodel")
const router = require('express').Router();
const mongoose = require("mongoose")

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())



router.post("/events", async(req, res) =>{
    // const {title, description, location, startTime, endTime} = req.body
    try {
        const data = {
            title : req.body.title,
            description : req.body.description,
            location : req.body.location,
            startTime : req.body.startTime,
            endTime : req.body.endTime,

        }
        const Eventdata = await Event.create(data)
        res.status(201).json({
            success : true,
            Eventdata,
            message : "event created successfully"
        })
    } catch (e) {
        if(req.body.title == "" || req.body.description == "" || req.body.location == "" || req.body.startTime == ""
        ||req.body.endTime == ""){
        res.status(400).json({
            status : false,
            error :  `${e.name} : ${e.message.split(" ").slice(5).join(" ")}`
        })}else{
            res.status(400).json({
                success : "Failed",
                Error : e.message
            })
        }
    }
})

router.get("/events", async(req, res) =>{
    try {
        const eventData = await Event.find({})
        res.status(200).json({
            status : "success",
            eventData
        })
    } catch (error) {
        res.status(500).json({
            status:"Failed",
            error : error.message
        })
    }
})

router.get("/events/:id", async(req, res) =>{
    try {
        const eventData = await Event.find({_id : req.params.id})
        if(eventData.length < 1){
            return res.status(404).json({
                error : "There is no event with that id"
            })
        }
        res.status(200).json({
            status : "success",
            eventData
        })
    } catch (error) {
        res.status(404).json({
            error : "There is no event with that id"
        })
    }
})
router.delete("/events/:id", async(req, res) =>{
    try {
        const eventData = await Event.deleteOne({_id : req.params.id})
        console.log("**********")
        console.log(eventData.deletedCount)
        if(eventData.deletedCount == 0){
            return res.status(204).json({
                status:"None"               
            })
        }
        console.log("**********")
        
        res.status(204).json({
            status : "success"

        })
    } catch (e) {

        res.status(204).json({
            status:"None",
            error: e.message
           
        })
    }
})



router.put("/events/:id", async(req, res) =>{
    try {
        
        const Eventdata = await Event.updateOne({_id : req.params.id}, req.body)
        if(req.body.title == ""){
            return res.status(400).json({
                error : "Validation error : title is required "
            })
        }else if(req.body.description == ""){
            return res.status(400).json({
                error : "Validation error :  description is required "
            })
        }else if(req.body.location == ""){
            return res.status(400).json({
                error : "Validation error : location is required "
            })
        }else if(req.body.startTime == ""){
            return res.status(400).json({
                error : "Validation error : startTime is required"
            })
        }else if(req.body.endTime == ""){
            return res.status(400).json({
                error : "Validation error :  endTime is required"
            })
        }
        res.status(200).json({
            success : true,
            Eventdata,
            message : "event created successfully"
        })
    } catch (e) {
        res.status(500).json({
            status : false,
            error :  e.message
        })
    }
})
module.exports = router