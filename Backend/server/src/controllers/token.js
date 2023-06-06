const tokenController = {};
const jwt = require('jsonwebtoken');

tokenController.verifyToken = async (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauthorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauthorized Request');
		}
		const data = jwt.verify(token, 'secretkey');
		if (!data) {
			return res.status(401).send('Unauthorized Request');
		}
		req.token = req.headers.authorization;
		req.login_email = data.email;
		req.login_type = data.type;
		next();
	} catch(e) {
		return res.status(401).send('Unauthorized Request');
	}
}

module.exports = tokenController;