const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PaymentMethod extends Model {
        static associate (models) {
            PaymentMethod.hasMany(models.PaymentBankDetails, { foreignKey: 'payment_method_id', as: 'bankDetails' })
        }
    }


    PaymentMethod.init(
        {
            payment_method_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
        
            name: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true
            },
        },
        {
            sequelize,
            modelName: 'PaymentMethod',
            tableName: 'payment_methods',
            timestamps: true
        }
    )

    return PaymentMethod;
}