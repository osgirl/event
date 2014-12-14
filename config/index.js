var bower = require('../bower.json');
bower.release = true;


module.exports = {
    bower: bower,
    aws:{
        release: true,
        bucket: process.env.YOUR_AWS_BUCKET,
        key: process.env.YOUR_AWS_ACCESS_KEY_ID,
        secret: process.env.YOUR_AWS_SECRET_ACCESS_KEY,
        region: process.env.YOUR_AWS_REGION
    }
};