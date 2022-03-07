const asyncHandler = require('express-async-handler')





// @desc  Get getGoals
// @route GET /api/Goals
// @acess Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `get Goals` })
})
// @desc  Set Goal
// @route POST /api/Goals
// @acess Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Pls add text')
    }

    res.status(200).json({ message: `set Goals` })
})
// @desc  update Goal
// @route PUT /api/Goals:id
// @acess Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `update goal = ${req.params.id}` })
})
// @desc  delete Goals
// @route DELETE /api/getGoals:id
// @acess Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `delete goal = ${req.params.id}` })
})
module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}