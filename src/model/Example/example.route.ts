const router = require('express').Router();
import { addExample, GetAll, removeExample } from "./example.controller";

// Get all examples
router.get("/all", GetAll);
// Add Example route
router.post("/add", addExample);
// Remove Example route
router.delete("/remove/:exId", removeExample);

module.exports = router;


