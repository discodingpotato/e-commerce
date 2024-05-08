const { generate } = require("otp-generator");

/**
 * 
 * @param {number} length 
 * @returns Generate user referal code
 */
function generateReferralCode(length) {
    var codeLength = 5;
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var referralCode = '';
    for (var i = 0; i < codeLength; i++) {
        referralCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return referralCode;
}

/**
 * 
 * @param {number} length 
 * @param {'digits'|'upperCaseAlphabets'|'lowerCaseAlphabets'|'specialChars'} generationType
 * @returns {string} Generates code only with one method 
 */
const generateOTP = (length, generationType) => {
     return generate(length, {
        digits: generationType === 'digits' ? true : false,
        lowerCaseAlphabets: generationType === 'lowerCaseAlphabets' ? true : false,
        specialChars: generationType === 'specialChars' ? true : false,
        upperCaseAlphabets: generationType === 'upperCaseAlphabets' ? true : false
    })
}

module.exports = generateOTP