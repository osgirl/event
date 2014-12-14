var bower = require('../bower.json');
bower.release = true;


module.exports = {
    bower: bower,
    aws:{
        release: true,
        bucket: process.env.TOOLKIT_AWS_SKYGLOBAL_BUCKET,
        key: process.env.TOOLKIT_AWS_ACCESS_KEY_ID,
        secret: process.env.TOOLKIT_AWS_SECRET_ACCESS_KEY,
        region: process.env.TOOLKIT_AWS_REGION
    }
};