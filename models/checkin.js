module.exports = (sequelize, DataTypes) => {

    const CheckIn = sequelize.define('CheckIn', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    });

    return CheckIn;
};