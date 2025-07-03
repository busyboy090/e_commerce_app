const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserDevice extends Model {
        static asssociate (models) {
            UserDevice.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'});
            UserDevice.hasOne(models.Session, { foreignKey: 'device_id', as: 'session'});
        }
    }

    UserDevice.init(
        {
            device_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },

            user_id: {
                type:  DataTypes.INTEGER,
                allowNull: false,
                references: {
                model:  'users',
                key: 'user_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
        
            device_type: {
                type: DataTypes.ENUM('mobile','desktop'),
                allowNull: false
            },
        
            os: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
        
            browser: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
        
            user_agent: {
                type: DataTypes.STRING,
                allowNull: false
            },

            ip_address: {
                type: DataTypes.STRING,
                allowNull: false
            },
        
            location: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            sequelize,
            modelName: 'UserDevice',
            tableName: 'user_devices',
            timestamps: true
        }
    )

    return UserDevice;
}