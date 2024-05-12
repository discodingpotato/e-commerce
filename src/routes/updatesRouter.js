const express = require('express');
const updates = require('../models/updates');
const router = express();

router.set('views', './src/views/updates')


router.get('/', async (req, res) => {
    const updatesDatas = await updates.aggregate([
        {
          $sort: { "date": -1 } // Sort updates by date in descending order
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                updates: { $push: "$$ROOT" }
            }
        },
    ]);
    // res.render('');
    // return res.json(updatesDatas)
    res.render('index', {
        title: 'Mew Cat\'s Updates & Improvements',
        updatesDatas
    });
})

module.exports = router;

