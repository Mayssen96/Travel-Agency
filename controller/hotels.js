const Hotel = require ('../models/hotelSchema');

exports.createHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.delethotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted ");
  } catch (error) {
    res.status(500).json(error);
  }
};



exports.updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};



exports.getOneHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
};




exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json(error);
  }
};
