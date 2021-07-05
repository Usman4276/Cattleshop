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


const Consultant_Checkout_Notification = mongoose.model('consul_checkout_notify', mySchema);


module.exports = Consultant_Checkout_Notification;