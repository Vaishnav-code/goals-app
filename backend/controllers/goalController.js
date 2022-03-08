const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')




// @desc  Get getGoals
// @route GET /api/Goals
// @acess Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})
// @desc  Set Goal
// @route POST /api/Goals
// @acess Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Pls add text')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(goal)
})
// @desc  update Goal
// @route PUT /api/Goals:id
// @acess Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.send(400)
        throw new Error('Goal not Found')
    }
    const user = await User.findById(req.user.id)
    //check user
    if (!user) {
        res.status(401)
        throw new Error('user not found')
    }
    // if logged in user == use
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('user not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true, })
    res.status(200).json(updatedGoal)
})
// @desc  delete Goals
// @route DELETE /api/getGoals:id
// @acess Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.send(400)
        throw new Error('Goal not Found')
    }
    const user = await User.findById(req.user.id)
    //check user
    if (!user) {
        res.status(401)
        throw new Error('user not found')
    }
    // if logged in user == use
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('user not authorized')
    }
    await goal.remove()
    res.status(200).json({ id: req.params.id })
})
module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}