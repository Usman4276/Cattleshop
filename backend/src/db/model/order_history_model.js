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


const OrderHistory = mongoose.model('order_history', mySchema);


module.exports = OrderHistory;