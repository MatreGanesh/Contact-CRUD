// const jwt = require('jsonwebtoken');

// const ensureAuthenticated = (req, res, next) => {
//     const auth = req.headers['authorization'];
//     if (!auth) {
//         return res.status(403).json({ message: 'Unauthorized, JWT token is required' })
//     }
//     try {
//         const decode = jwt.verify(auth, process.env.JWT_SECRET);
//         req.user = decode;
//         next();
//     } catch (error) {
//         return res.status(403).json({ message: 'Unauthorized, JWT token wrong or expired' });
//     }
// }

// module.exports = ensureAuthenticated;


const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is required' });
    }
    try {
        const decode = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET); // Fix: Split token to extract the actual token part
        req.user = decode;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Unauthorized, JWT token wrong or expired' });
    }
};

module.exports = ensureAuthenticated;
