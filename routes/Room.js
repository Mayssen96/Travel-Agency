const express =require ('express');
const {createRoom,updateRoomAvailability,deleteRoom,getRoom,getRooms} = require ('../controller/room');
const { verifyAdmin,isAuth} =require ('../middleweares/isAuth')

const router = express.Router();

router.post("/:hotelid/createRoom",isAuth, verifyAdmin, createRoom);
router.put("/availability/:id", isAuth,updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoomAvailability);
router.delete("/:id/:hotelid",isAuth, verifyAdmin, deleteRoom);
router.get("/:id",isAuth, getRoom);
router.get("/",isAuth, getRooms);

module.exports= router