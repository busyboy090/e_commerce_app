const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class Unit extends Model {
        static associate (models) {
            Unit.hasMany(models.Size, { foreignKey: 'unit_id', as: 'unitSizes'})
        }
    }

    Unit.init(
        {
            unit_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false
            },

            symbol: {
                type: DataTypes.STRING,
                allowNull: false
            },

            code: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Unit',
            tableName: 'units',
            timestamps: true
        }
    )

    return Unit
}