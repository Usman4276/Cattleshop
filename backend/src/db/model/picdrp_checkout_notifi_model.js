const mongoose = require('mongoose');

const mySchema = mongoose.Schema({

    cart_data: {
        type: Object,
        required: true,
    },
    selected_consultant_email: {
        type: String,
    },
    selected_pickdrop_email: {
        type: String,
    }
})


const PickDrop_Checkout_Notification = mongoose.model('pickdrop_checkout_notify', mySchema);


module.exports = PickDrop_Checkout_Notification;