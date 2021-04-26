let adminModel = require("../model/capstonemodel");
let mongoose = require("mongoose");
const { request } = require("express");
let adminSignin = (req) => {
    return new Promise((resolve, reject) => {
        if (req.body.hasOwnProperty('username') && req.body.hasOwnProperty('password') && req.body.hasOwnProperty('role')) {
            adminModel.admininfo.find({ "username": req.body.username, "password": req.body.password, "role": req.body.role }).then(data => {
                if (data.length > 0) {
                    adminModel.admininfo.updateOne({ "_id": data[0]._id }, { $set: { Islogged: 1 } }).then(result => {
                        if (result) {
                            resolve({ "Status": 200, "Info": "Sign In Successfull", "data": data[0]._id })
                        }
                    })
                }
                else {
                    resolve({ "Status": 404, "Info": "No Data found" })
                }
            })
        }
        else {
            resolve({ "Status": 400, "Info": "Required Inputs Missing" })
        }
    })
}
let addProducts = (req) => {
    return new Promise((resolve, reject) => {
        if (req.body.hasOwnProperty('productID') && req.body.hasOwnProperty('productName') && req.body.hasOwnProperty('productPrice') && req.body.hasOwnProperty('productQuantity') && req.body.hasOwnProperty('role')) {
            adminModel.admininfo.find({ productID: req.body.productID }).then(data => {
                if (data.length == 0) {
                    adminModel.admininfo.create({ "role": req.body.role, "productID": req.body.productID, "productName": req.body.productName, "productPrice": req.body.productPrice, productQuantity: req.body.productQuantity }).then(result => {
                        if (result) {
                            console.log(result, "result")
                            resolve({ "Status": 200, "Info": "Products Added Successfully", "data": result._id })
                        }
                        else {
                            resolve({ "Status": 404, "Info": "No Data added" })
                        }
                    })
                }
                else {
                    adminModel.admininfo.updateOne({ productID: req.body.productID }, { $set: { productID: req.body.productID, productName: req.body.productName, productPrice: req.body.productPrice, productQuantity: req.body.productQuantity } }).then(response => {
                        if (response) {
                            resolve({ "Status": 200, "info": "Product already exists", "data": data[0]._id })
                        }
                    })
                }
            })
        }
        else {
            resolve({ "Status": 400, "Info": "Required Inputs Missing" })
        }
    })
}
let updateProducts = (req) => {
    return new Promise((resolve, reject) => {
        adminModel.admininfo.updateOne({ "_id": req.body.id }, { $set: { "productID": req.body.productID ? req.body.productID : '', "productName": req.body.productName ? req.body.productName : '', "productPrice": req.body.productPrice ? req.body.productPrice : '', productQuantity: req.body.productQuantity ? req.body.productQuantity : '' } }).then(result => {
            if (result) {
                resolve({ "Status": 200, "Info": "Products updated Successfully" })
            }
            else {
                resolve({ "Status": 404, "Info": "No Data updated" })
            }
        })

    })
}
let deleteProducts = (req) => {
    return new Promise((resolve, reject) => {
        if (req.body.hasOwnProperty('productID')) {
            adminModel.admininfo.find({ "productID": req.body.productID }).then(data => {
                if (data.length > 0) {
                    adminModel.admininfo.updateOne({ "productID": req.body.productID }, { $unset: { "productID": 1, "productName": 1, "productPrice": 1, "productQuantity": 1 } }, { multi: true }).then(result => {
                        if (result) {
                            resolve({ "Status": 200, "Info": "Products Deleted Successfully" })
                        }
                        else {
                            resolve({ "Status": 404, "Info": "No Data deleted" })
                        }
                    })
                }
                else {
                    resolve({ "Status": 404, "info": "productID Not Exist" })
                }
            })

        }
        else {
            resolve({ "Status": 400, "Info": "Required Inputs Missing" })
        }
    })
}
let deleteEmployee = (req) => {
    return new Promise((resolve, reject) => {
        if (req.body.hasOwnProperty('empID')) {
            adminModel.EmpInfo.find({ "empID": req.body.empID }).then(data => {
                if (data.length > 0) {
                    adminModel.EmpInfo.updateOne({ "empID": req.body.empID }, { $unset: { "empID": 1, "firstName": 1, "lastName": 1, "emailID": 1 } }, { multi: true }).then(result => {
                        if (result) {
                            resolve({ "Status": 200, "Info": "Employee Deleted Successfully" })
                        }
                        else {
                            resolve({ "Status": 404, "Info": "No Data deleted" })
                        }
                    })
                }
                else {
                    resolve({ "Status": 404, "info": "EmpID Not Exist" })
                }
            })

        }
        else {
            resolve({ "Status": 400, "Info": "Required Inputs Missing" })
        }
    })
}
let addEmployee = (req) => {
    return new Promise((resolve, reject) => {
        if (req.body.hasOwnProperty('empID') && req.body.hasOwnProperty('firstName') && req.body.hasOwnProperty('lastName') && req.body.hasOwnProperty('emailID') && req.body.hasOwnProperty('role')) {
            adminModel.EmpInfo.find({ empID: req.body.empID }).then(data => {
                if (data.length == 0) {
                    adminModel.EmpInfo.create({
                        "role": req.body.role, "emailID": req.body.emailID, "firstName": req.body.firstName, "lastName": req.body.lastName, "empID": req.body.empID, "password": Math.random().toString(36).slice(-8)
                    }).then(result => {
                        if (result) {
                            console.log(result, "result")
                            resolve({ "Status": 200, "Info": "Employee Added Successfully", "data": result._id })
                        }
                        else {
                            resolve({ "Status": 404, "Info": "No Data added" })
                        }
                    })
                }
                else {
                    adminModel.EmpInfo.updateOne({ empID: req.body.empID }, { $set: { empID: req.body.empID, "emailID": req.body.emailID, "firstName": req.body.firstName, "lastName": req.body.lastName } }).then(response => {
                        if (response) {
                            resolve({ "Status": 200, "info": "Employee already exists", "data": data[0]._id })
                        }
                    })
                }
            })
        }
        else {
            resolve({ "Status": 400, "Info": "Required Inputs Missing" })
        }
    })
}
let adminlogout = (req) => {
    return new Promise((resolve, reject) => {
        if (req.body.hasOwnProperty('id')) {
            adminModel.admininfo.find({ "_id": req.body.id }).then(data => {
                if (data.length > 0) {
                    adminModel.admininfo.updateOne({ "_id": data[0]._id }, { $set: { Islogged: false } }).then(result => {
                        if (result) {
                            resolve({ "Status": 200, "Info": "Sign out Successfull" })
                        }
                    })
                }
                else {
                    resolve({ "Status": 404, "Info": "No Data found" })
                }
            })
        }
        else {
            resolve({ "Status": 400, "Info": "Required Inputs Missing" })
        }
    })
}
let userSignup = (req) => {
    return new Promise((resolve, reject) => {
        if (req.body.hasOwnProperty('firstname') && req.body.hasOwnProperty('lastname') && req.body.hasOwnProperty('email') && req.body.hasOwnProperty('password')) {
            adminModel.UserInfo.find({ userID: req.body.userID }).then(data => {
                if (data.length == 0) {
                    adminModel.UserInfo.create({ "role": req.body.role, "userID": req.body.userID, "firstname": req.body.firstname, "lastname": req.body.lastname, email: req.body.email, password: req.body.password }).then(result => {
                        if (result) {
                            console.log(result, "result")
                            resolve({ "Status": 200, "Info": "user Added Successfully", "data": result._id })
                        }
                        else {
                            resolve({ "Status": 404, "Info": "No Data added" })
                        }
                    })
                }
                else {
                    adminModel.UserInfo.updateOne({ userID: req.body.userID }, { $set: { "role": req.body.role, "userID": req.body.userID, "firstname": req.body.firstname, "lastname": req.body.lastname, email: req.body.email, password: req.body.password } }).then(response => {
                        if (response) {
                            resolve({ "Status": 200, "info": "user already exists", "data": data[0]._id })
                        }
                    })
                }
            })
        }
        else {
            resolve({ "Status": 400, "Info": "Required Inputs Missing" })
        }
    })
}
let userSignin = (req) => {
    return new Promise((resolve, reject) => {
        if (req.body.hasOwnProperty('userID') && req.body.hasOwnProperty('password')) {
            let active = 0
            adminModel.UserInfo.find({ "userID": req.body.userID, "password": req.body.password }).then(data => {
                if (data.length > 0) {
                    adminModel.UserInfo.updateOne({ "_id": data[0]._id }, { $set: { Islogged: 1, active: 0 } }).then(result => {
                        if (result) {
                            resolve({ "Status": 200, "Info": "Sign In Successfull", "data": data[0]._id })
                        }
                    })
                }
                else {
                    console.log(active++)
                    active += active++
                    console.log(active)
                    if (active > 2) {
                        adminModel.EmpInfo.find({}, { empID: 1 }).then(empdata => {
                            adminModel.EmpInfo.updateOne({ empID: empdata[0].empID }, { $set: { userID: req.body.userID, userPassword: req.body.password } }).then(updateemployee => {
                                if (updateemployee) {
                                    resolve({ "Info": "UserID and Password are blocked" })
                                }
                            })
                        })
                    }
                    else {
                        adminModel.UserInfo.updateOne({ "userID": req.body.userID }, { $set: { active: active, Islogged: false } }).then(response => {
                            if (response) {
                                resolve({ "Status": 404, "Info": "invalid userID or password" })
                            }
                        })
                    }
                }
            })
        }
        else {
            resolve({ "Status": 400, "Info": "Required Inputs Missing" })
        }
    })
}
let userProducts = (req) => {
    return new Promise((resolve, reject) => {
        if (req.body.hasOwnProperty('productName') && req.body.hasOwnProperty('userID')) {
            adminModel.admininfo.find({ productName: req.body.productName }).then(data => {
                if (data.length > 0) {
                    adminModel.UserInfo.find({ productName: req.body.productName }).then(response => {
                        if (response.length > 0) {
                            adminModel.UserInfo.updateMany({ "userID": req.body.userID }, { $set: { "productID": data[0].productID ? data[0].productID : '', "productName": data[0].productName ? data[0].productName : '', "productPrice": data[0].productPrice ? data[0].productPrice : '', productQuantity: data[0].productQuantity ? data[0].productQuantity : '' } }).then(updatedData => {
                                if (updatedData) {
                                    resolve({ "Result": data })
                                }
                            })
                        }
                        else {
                            adminModel.UserInfo.create({ "userID": req.body.userID, "productID": data[0].productID ? data[0].productID : '', "productName": data[0].productName ? data[0].productName : '', "productPrice": data[0].productPrice ? data[0].productPrice : '', productQuantity: data[0].productQuantity ? data[0].productQuantity : '' }).then(result => {
                                if (result) {
                                    resolve({ "Result": data })
                                }
                            })
                        }
                    })

                }
                else {
                    resolve({ "Status": 404, "info": "No Product Found" })
                }
            })
        }
        else {
            resolve({ "Status": 400, "Info": "Required Inputs Missing" })
        }
    })
}
let deleteuserProducts = (req) => {
    return new Promise((resolve, reject) => {
        if (req.body.hasOwnProperty('productName')) {
            adminModel.admininfo.find({ "productName": req.body.productName }).then(data => {
                if (data.length > 0) {
                    adminModel.admininfo.updateOne({ "productName": req.body.productName }, { $unset: { "productID": 1, "productName": 1, "productPrice": 1, "productQuantity": 1 } }, { multi: true }).then(result => {
                        if (result) {
                            resolve({ "Status": 200, "Info": "Products Deleted Successfully" })
                        }
                        else {
                            resolve({ "Status": 404, "Info": "No Data deleted" })
                        }
                    })
                }
                else {
                    resolve({ "Status": 404, "info": "productID Not Exist" })
                }
            })

        }
        else {
            resolve({ "Status": 400, "Info": "Required Inputs Missing" })
        }
    })
}
let userViewproducts = (req) => {
    return new Promise((resolve, reject) => {
        if (req.body.hasOwnProperty('userID')) {
            adminModel.UserInfo.find({ "userID": req.body.userID }, { productID: 1, productName: 1, productPrice: 1, productQuantity: 1, _id: 0 }).then(data => {
                if (data.length > 0) {
                    resolve({ "Status": 200, "Result": data })
                }
                else {
                    resolve({ "Status": 404, "Info": "No Product added in the cart" })
                }
            })
        }
        else {
            resolve({ "Status": 400, "Info": "Required Inputs Missing" })
        }
    })
}
let userCheckout = (req) => {
    return new Promise((resolve, reject) => {
        if (req.body.hasOwnProperty('funds')) {
            if (req.body.funds > 0) {
                resolve({ "Info": "Checkout Successfull" })
            }
            else {
                resolve({ "Info": "Funds Insufficient" })
            }
        }
        else {
            resolve({ "Status": 400, "Info": "Required Inputs Missing" })
        }
    })
}
let raiseTicket = (req) => {
    return new Promise((resolve, reject) => {
        if (req.body.hasOwnProperty('empID')) {
            adminModel.EmpInfo.find({ empID: req.body.empID }).then(data => {
                if (data.length > 0) {
                    resolve({ "Status": 200, "Info": "UserID and Password are locked" })
                }
                else {
                    resolve({"Info":"EmpID not found"})
                }
            })
        }
        else {
            resolve({ "Status": 400, "Info": "Required Inputs Missing" })
        }
    })
}

module.exports = { adminSignin, addProducts, updateProducts, deleteProducts, deleteEmployee, addEmployee, adminlogout, userSignup, userSignin, userProducts, deleteuserProducts, userViewproducts, userCheckout,raiseTicket }