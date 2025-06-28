const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class LevelPermission extends Model {
        static associate(models) {
            // Define associations here
            LevelPermission.belongsTo(models.Level, {
                foreignKey: 'level_id',
                as: 'level'
            });
            LevelPermission.belongsTo(models.Permission, {
                foreignKey: 'permission_id',
                as: 'permission'
            });
        }
    }

    LevelPermission.init(
        {
            admin_permission_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },

            level_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'levels',
                  key: 'level_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
        
            permission_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'permissions',
                  key: 'permission_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
        },
        {
            sequelize,
            modelName: 'LevelPermission',
            tableName: 'level_permissions',
            timestamps: true
        }
    )

    return LevelPermission;
}