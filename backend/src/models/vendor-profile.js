const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class VendorProfile extends Model {
        static associate(models) {
            // Define associations here if needed
            VendorProfile.belongsTo(models.User, { foreignKey: 'user_id', as: 'vendor'});
            VendorProfile.belongsTo(models.User, { foreignKey: 'verified_by', as: 'verifiedBy'});
            VendorProfile.belongsTo(models.Country, {foreignKey: 'country_id', as: 'country'});
            VendorProfile.belongsTo(models.State, {foreignKey: 'state_id', as: 'state'});
            VendorProfile.belongsTo(models.City, {foreignKey: 'city_id', as: 'city'});
            VendorProfile.belongsTo(models.BusinessType, { foreignKey: 'business_type_id', as: 'businessType'})
        }
    }

    VendorProfile.init({
        vendor_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "user_id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },

        business_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        business_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'business_types',
              key: 'business_type_id'
            },
            onDelete: 'CASCADE',
            onDelete: 'CASCADE'
        },

        is_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        account_status: {
            type: DataTypes.ENUM('pending','approved','rejected'),
            allowNull: false,
            defaultVaue: 'pending',
        },

        address: {
            type: DataTypes.STRING,
            allowNull: true
        },

        verified_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
              model: "users",
              key: "user_id",
            },
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        },
        
        verified_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'VendorProfile',
        tableName: 'vendor_profiles',
        underscored: true,
        timestamps: true,
        indexes: [
            {
              unique: true,
              fields: ["user_id"],
            },
        ],
    });

    return VendorProfile;
}