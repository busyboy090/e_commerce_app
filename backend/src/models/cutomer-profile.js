const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CustomerProfile extends Model {
        static associate (models) {
            CustomerProfile.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
            CustomerProfile.belongsTo(models.State, { foreignKey: 'state_id', as: 'state' });
            CustomerProfile.belongsTo(models.City, { foreignKey: 'city_id', as: 'city' });
        }
    }

    CustomerProfile.init(
        {
            customer_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },

            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'users',
                  key: 'user_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },

            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
        
            state_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'states',
                  key: 'state_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
        
            gender: {
                type: DataTypes.ENUM('male','female'),
                allowNull: false
            },
        
            city_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'cities',
                  key: 'city_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
        
            phone: {
                type: DataTypes.STRING(20),
                allowNull: true,
                unique: true
            },
        },
        {
            sequelize,
            modelName: 'CustomerProfile',
            tableName: 'customer_profiles',
            timestamps: true
        }
    )

    return CustomerProfile;
}