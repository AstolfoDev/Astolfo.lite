const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
let Long =  mongoose.Schema.Types.Long;
walletSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: Long,
    credits: Number,
    trapcoins: Number,
    tokens: Number,
});
module.exports = mongoose.model("Wallet",walletSchema);