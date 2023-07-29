import express from 'express'
const router = express.Router()


import { fetchNasaImage } from "../controllers/imageController.js";

router.route("/nasa-image").get(fetchNasaImage)



export default router 
