const { default: axios } = require("axios");
const updates = require("../../models/updates");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const postNewUpdate = async (req, res, next) => {
    const { description, what, why, addedPackages, changes } = req.body;
    let packageDetails = [];
    console.log(req.body);
    for (const pkg of addedPackages) {
        try {
            let result = await axios.get(`https://www.npmjs.com/search/suggestions?q=${pkg}`);

            let foundpkg = result.data.find(item => item.name === pkg);

            if (foundpkg) {
                packageDetails.push({
                    packageName: foundpkg.name,
                    packageDescription: foundpkg.description
                });
            } else {
                // Handle case where package is not found
                console.log(`Package '${pkg}' not found.`);
            }
        } catch (error) {
            // Handle errors, for example:
            console.error(`Error fetching package '${pkg}':`, error);
        }
    }

    console.log(packageDetails);
    await updates.create({
        date: new Date('2024-05-16T23:00:00'),
        description,
        newPackages: packageDetails,
        what,
        why,
        // changes
    });

    res.json({ success: true })
    return
}

module.exports = postNewUpdate