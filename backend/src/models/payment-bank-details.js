const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PaymentBankDetails extends Model {
        static associate (models) {
            PaymentBankDetails.belongsTo(models.Country, {foreignKey: 'country_id', as: 'country'});
            PaymentBankDetails.belongsToMany(models.PaymentMethod, { through: 'payment_method_id' })
        }
    }

    PaymentBankDetails.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
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
        
            payment_method_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                refrences: {
                  model: 'payment_methods',
                  key: 'payment_method_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
        },
        {
            sequelize,
            modelName: 'PaymentBankDetails',
            tableName: 'payment_bank_details',
            timestamps: true
        }
    )

    return PaymentBankDetails;
}