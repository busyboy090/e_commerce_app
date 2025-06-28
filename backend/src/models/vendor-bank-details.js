const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class VendorBankDetails extends Model {
        static associate (models) {
            VendorBankDetails.belongsTo(models.User, {foreignKey: 'vendor_id', as: 'bankDetails'});
            VendorBankDetails.belongsTo(models.Country, { foreignKey: 'country_id', as: 'country'});
        }
    }

    VendorBankDetails.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
        
            vendor_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: "vendors",
                  key: "vendor_id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
        
            country_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                refrences: {
                  model: 'countries',
                  key: 'country_id'
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
        
            bank_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
        
            account_number: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        
            account_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            sequelize,
            modelName: 'VendorBankDetails',
            tableName: 'vendor_bank_details',
            timestamps: true
        }
    )

    return VendorBankDetails;
}