const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Country extends Model {
        static associate (models) {
            Country.hasMany(models.PaymentBankDetails, {foreignKey: 'country_id', as: 'paymentMethods'});
            Country.hasMany(models.VendorBankDetails, {foreignKey: 'country_id', as: 'vendor_bank_details'});
            Country.hasMany(models.State, { foreignKey: 'country_id', as: 'states'});
            Country.belongsTo(models.Currency, { foreignKey: 'currency_id', as: 'currency'});
            Country.belongsTo(models.SubRegion, { foreignKey: 'sub_region_id', as: 'subRegion'});
            Country.hasMany(models.Address, { foreignKey: 'country_id', as: 'addresses'});
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
                allowNull: true,
                references: {
                  model: 'currencies',
                  key: 'currency_id'
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            },

            sub_region_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                  model: 'sub_regions',
                  key: 'sub_region_id'
                },
                onDelete: 'SET NULL',
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