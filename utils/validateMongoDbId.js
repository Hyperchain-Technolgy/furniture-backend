const mongoose = require("mongoose");
const validateMongoDbId = (id) => {
  // Check if the provided ID is a valid MongoDB ObjectID
  const isValid = mongoose.Types.ObjectId.isValid(id);
  
  // If the ID is not valid, throw an error
  if (!isValid) {
    throw new Error("This id is not valid or not found");
  }
};

module.exports = validateMongoDbId;
