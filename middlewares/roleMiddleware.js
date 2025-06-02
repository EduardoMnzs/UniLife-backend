module.exports = function (roles) {

    return function (req, res, next) {

        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Acesso negado. Permissão insuficiente.' });
        }


        next();
    };
};