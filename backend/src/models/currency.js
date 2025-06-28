const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Currency extends Model {
        static associate (models) {
            Currency.hasMany(models.Country, { foreignKey: 'currency_id', as: 'countries'});
        }
    }

    Currency.init(
        {
            currency_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
        
            code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        
            name: {
                type: DataTypes.STRING,
                allowNull: false,

            },
        
            symbol: {
                type: DataTypes.STRING,
                allowNull: true
            }, 
        },
        {
            sequelize,
            modelName: 'Currency',
            tableName: 'currencies',
            timestamps: true
        }
    );

    return Currency;
}