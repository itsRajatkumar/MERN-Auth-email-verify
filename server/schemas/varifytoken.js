const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const varifytokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 90000000000,
    },
});

module.exports = mongoose.model("varifytoken", varifytokenSchema);
