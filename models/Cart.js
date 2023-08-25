const mongoose = require('mongoose');
const { Schema } = mongoose;
const CartSchema = new Schema({
    user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
    },
    productId:{
        type: Number,
        required: true
    },
    tittle:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default: null
    },
    // rating:{
    //     value:{
    //         type:Number
    //     },
    //     count:{
    //         type:Number
    //     }
    // },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('cart',CartSchema)