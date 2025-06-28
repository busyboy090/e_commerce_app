const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Country extends Model {
        static associate (models) {
            Country.hasMany(models.PaymentBankDetails, {foreignKey: 'country_id', as: 'paymentMethods'});
            Country.hasMany(models.VendorBankDetails, {foreignKey: 'country_id', as: 'vendor_bank_details'});
            Country.hasMany(models.State, { foreignKey: 'country_id', as: 'states'});
            Country.belongsTo(models.Currency, { foreignKey: 'currency_id', as: 'currency'});
            Country.belongsTo(models.Region, { foreignKey: 'region_id', as: 'region'})
        }
    }

    Country.init(
        {
            country_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },

            code: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },

            currency_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'currencies',
                  key: 'currency_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },

            region_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'regions',
                  key: 'region_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },

            phone_code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Country',
            tableName: 'countries',
            timestamps: true,
            indexes: [
                {
                  unique: true,
                  fields: ["name"],
                },
                {
                  unique: true,
                  fields: ["code"],
                },
            ],

        }
    )

    return Country
}