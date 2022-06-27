const express = require('express');
const router = express.Router();
const {createHotel,delethotel,updateHotel,getOneHotel,getAllHotels} = require ('../controller/hotels');

const {isAuth,verifyAdmin} = require ('../middleweares/isAuth')

router.post("/createHotel",isAuth, verifyAdmin,createHotel);
router.put("/:id",isAuth,verifyAdmin, delethotel);
router.put("/:id",isAuth,verifyAdmin, updateHotel);
router.get("/:id",isAuth,verifyAdmin, getOneHotel);
router.get("/", getAllHotels);

module.exports = router  