const appliSchema = require ('../models/application');

exports.createVol = async (req, res) => {
  const newVol = new appliSchema(req.body);
  try {
    const savedVol = await newVol.save();
    res.status(200).json(savedVol);
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.deletVol = async (req, res) => {
  try {
    await appliSchema.findByIdAndDelete(req.params.id);
    res.status(200).json("Vol has been deleted ");
  } catch (error) {
    res.status(500).json(error);
  }
};



exports.updateVol = async (req, res) => {
  try {
    const updatedVol = await appliSchema.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updatedVol);
  } catch (error) {
    res.status(500).json(error);
  }
};



exports.getOneVol = async (req, res) => {
  try {
    const Vol = await appliSchema.findById(req.params.id);
    res.status(200).json(Vol);
  } catch (error) {
    res.status(500).json(error);
  }
};




exports.getAllVol = async (req, res) => {
  try {
    const Vols = await appliSchema.find();
    res.status(200).json(Vols);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getDataFromApplication = async (req,res) =>{
  try {
  
      const appli = await appliSchema.find();
      return res.status(200).send({appli})
  } catch (error) {
      return res.status(500).send(error)
  }
}