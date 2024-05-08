const express = require('express');
const router = express();

router.set('views', './src/views/updates')

const data = [
    {
        date: '27.04.2024',
        description: 'Creation of project',
        what: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi fuga unde, eaque officia nemo animi vel error quibusdam. Placeat tempore distinctio tempora delectus debitis temporibus quasi, corporis officiis labore deleniti!',
        why: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi fuga unde, eaque officia nemo animi vel error quibusdam. Placeat tempore distinctio tempora delectus debitis temporibus quasi, corporis officiis labore deleniti!',
        newPackages: [
            {
                packageName: 'express',
                useCase: 'main framework'
            }
        ],
    }
]

router.get('/', (req, res) => {

    res.render('index');
})

module.exports = router;

