const Garden = require('../models/Garden');

//@des Get all gardens
//@route GET /api/v1/gardens
// @access Public
exports.getGardens = async (req, res, next) => {
    try {
        const gardens = await Garden.find();

        return res.status(200).json({
            success: true,
            count: gardens.length,
            data: gardens
        })
    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'Server error'});
    }
}

//@des Create a garden
//@route POST /api/v1/gardens
// @access Public
exports.addGardens = async (req, res, next) => {
    try {
        console.log(req.body);
        const garden = await Garden.create(req.body);

        return res.status(200).json({
            success: true,
            data: garden
        });
    } catch(err) {
        console.error(err);
        if(err.code === 11000) {
            return res.status(400).json({ error: 'This garden already exists' });
        }
        res.status(500).json({error: 'Server error'});
    }
}