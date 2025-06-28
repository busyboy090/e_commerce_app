const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Position extends Model {
        static associate (models) {
            Position.belongsTo(models.Department, {
                foreignKey: 'department_id',
                as: 'department'
            });

            Position.belongsTo(models.AdminProfile, {
                foreignKey: 'position_id',
                as: 'position'
            });

            Position.hasOne(models.Level, { foreignKey: 'level_id', as: 'level'})
        }
    }

    Position.init({
        position_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        department_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'departments',
                key: 'department_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },

        level_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'levels',
              key: 'level_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
    }, {
        sequelize,
        modelName: 'Position',
        tableName: 'positions',
        timestamps: true,
    });
    
    return Position;
}