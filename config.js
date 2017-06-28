exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://localhost/react_capstone';
exports.TEST_DATABASE_URL = (
    process.env.TEST_DATABASE_URL ||
    'mongodb://localhost/test-capstone_react-app');
exports.PORT = process.env.PORT || 8080;
exports.AWSID = process.env.AWSID;
exports.AWSSECRET = process.env.AWSSECRET;
exports.AWSTAG = process.env.AWSTAG; 

