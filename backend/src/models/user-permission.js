const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserPermission extends Model {
        static associate (models) {
            UserPermission.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'})
            UserPermission.belongsTo(models.Permission, { foreignKey: 'permission_id', as: 'permission'})
        }
    }

    UserPermission.init(
        {
            user_permission_id: {
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
        
            permission_id: {
                type:  DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model:  'permissions',
                  key: 'permission_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
        },
        {
            sequelize,
            modelName: 'UserPermission',
            tableName: 'user_permissions',
            timestamps: true
        }
    )

    return UserPermission;
}