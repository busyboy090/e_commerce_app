const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class VendorBusinessType extends Model {
        static associate (models) {
            VendorBusinessType.belongsTo(models.User, { foreignKey: 'user_id', as: 'vendorBusinessTypes'});
            VendorBusinessType.belongsTo(models.User, { foreignKey: 'approved_by', as: 'approveBy'});
            VendorBusinessType.belongsTo(models.BusinessType, { foreignKey: 'business_type_id', as: 'businessType'})
        }
    }

    VendorBusinessType.init(
        {
            vendor_business_type_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
        
            vendor_id: {
                type:  DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'users',
                  key: 'user_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
        
            business_type_id: {
                type:  DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'business_types',
                  key: 'business_type_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
        
            is_approved: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        
            approved_by: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                  model: 'users',
                  key: 'user_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },

            approved_at: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'VendorBusinessType',
            tableName: 'vendor_business_types',
            timestamps: true
        }
    )

    return VendorBusinessType;
}