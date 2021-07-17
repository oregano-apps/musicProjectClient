const userModel = require('./../models/User')
const catchAsync = require('./../utils/catchAsync')


exports.singup = catchAsync(async (req, res, next) => {
    console.log(req.body)
    res.status(200).json({message: 'request arrived successfuly'})
})