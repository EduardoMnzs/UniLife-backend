module.exports = function (roles) {
    return function (req, res, next) {
        if (!roles.includes(req.userRole)) {
            return res.status(403).json({ message: 'Acesso negado' });
        }
        next();
    };
};