const express = require('express');
const router = express.Router();
const {createVol,deletVol,updateVol,getOneVol,getAllVol,getDataFromApplication} = require ('../controller/Vol');

const {isAuth,verifyAdmin} = require ('../middleweares/isAuth')

router.post("/createHotel",isAuth, verifyAdmin,createVol);
router.put("/:id",isAuth,verifyAdmin, deletVol);
router.put("/:id",isAuth,verifyAdmin, updateVol);
router.get("/:id",isAuth,verifyAdmin, getOneVol);
router.get("/",isAuth,verifyAdmin, getAllVol);
router.get('/dataVols',getDataFromApplication)

module.exports = router  