const express = require("express");
const { Router } = require("express");
const insightsRouter = Router();
insightsRouter.get('/',(req,res)=>{
    res.json({
        message : "he"
    })
})
module.exports = {
    insightsRouter : insightsRouter
}