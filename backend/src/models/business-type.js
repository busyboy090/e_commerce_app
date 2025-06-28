const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class BusinessType extends Model {
        static associate (models) {
            BusinessType.hasMany(models.VendorBusinessType,{ foreignKey: 'business_type_id', as: 'businessType'});
        }
    }


    BusinessType.init(
        {
            business_type_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
        
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'BusinessType',
            tableName: 'business_types',
            timestamps: true
        }
    )

    return BusinessType;
}