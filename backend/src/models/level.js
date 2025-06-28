const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Level extends Model {
        static associate(models) {
            Level.belongsTo(models.Position, { foreignKey: 'level_id', as: 'positions' });
            Level.hasMany(models.LevelPermission, { foreignKey: 'level_id', as: 'permissions'});
        }
    }

    Level.init(
        {   
            level_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            code: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },

            description: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            sequelize,
            modelName: 'Level',
            tableName: 'levels',
            timestamps: true
        }
    );

    return Level;
}