var mongoose = require('mongoose');

var adminInfo = mongoose.Schema({
    username: { type: String },
    role: { type: String },
    password: { type: String },
    productID: { type: Number },
    productName: { type: String },
    productPrice: { type: Number },
    productQuantity: { type: Number },
    Islogged: { type: Boolean },
    Iscarted: { type: Boolean }
});

var empInfo = mongoose.Schema({
    role: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    emailID: { type: String },
    empID: { type: Number },
    password: { type: String },
    Islogged: { type: Boolean },
    userID: { type: String },
    userPassword: { type: String }
})

var userInfo = mongoose.Schema({
    role: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    userID: { type: Number },
    password: { type: String },
    Islogged: { type: Boolean },
    productID: { type: Number },
    productName: { type: String },
    productPrice: { type: Number },
    productQuantity: { type: Number },
    active: { type: Number, default: 0 }
})

const admininfo = mongoose.model('capstone', adminInfo, 'capstone');
const EmpInfo = mongoose.model('capstoneemployee', empInfo, 'capstoneemployee')
const UserInfo = mongoose.model('capstoneuser', userInfo, 'capstoneuser')

module.exports = {
    admininfo: admininfo,
    EmpInfo: EmpInfo,
    UserInfo: UserInfo
}

