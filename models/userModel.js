var jwt = require('jsonwebtoken');


const generateAuthToken = async function() {
    var token = jwt.sign({ data: 'bar', role: 'admin'}, 'cledechiffrage');
    return token
}


module.exports = {
    generateAuthToken
};  