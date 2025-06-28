const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AdminProfile extends Model {
        static associate (models) {
            AdminProfile.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'});
            AdminProfile.belongsTo(models.Department, { foreignKey: 'department_id', as: 'department'});
            AdminProfile.hasOne(models.Position, { foreignKey: 'position_id', as: 'position' });
            AdminProfile.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
            AdminProfile.belongsTo(models.User, { foreignKey: 'approved_by', as: 'approver' });
        }
    }

    AdminProfile.init(
        {
            admin_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
        
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                references: {
                  model: "users",
                  key: "user_id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
        
            department_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'departments',
                  key: 'department_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },

            position_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'positions',
                  key: 'position_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            
            created_by: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                  model: 'users',
                  key: 'user_id'
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            },

            approved: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
        
            approved_by: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                  model: 'users',
                  key: 'user_id'
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            },
        },
        {
            sequelize,
            modelName: 'AdminProfile',
            tableName: 'admin_profiles',
            timestamps: true
        }
    )


    return AdminProfile;
}