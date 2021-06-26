"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const example_controller_1 = require("./example.controller");
// Get all examples
router.get("/all", example_controller_1.GetAll);
// Add Example route
router.post("/add", example_controller_1.addExample);
// Remove Example route
router.delete("/remove/:exId", example_controller_1.removeExample);
module.exports = router;
