const mongoose = require("mongoose");

// Function to validate MongoDB ObjectID
const validateMongoDbId = (id) => {
    // Check if the provided ID is a valid MongoDB ObjectID
    const isValid = mongoose.Types.ObjectId.isValid(id);
    // Throw an error if the ID is not valid
    if (!isValid) {
        throw new Error("This id is not valid or not found");
    }
};

// Export the validateMongoDbId function
module.exports = validateMongoDbId;
