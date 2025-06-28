const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Size extends Model {
        static associate(models) {
            // Define associations here if needed
            Size.belongsTo(models.Type, { foreignKey: 'type_id', as: 'types' });
            Size.belongsTo(models.SizeStandard, { foreignKey: 'size_standard_is', as: 'sizeStandards' });
        }
    }

    Size.init(
        {
            size_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },

            label: {
                type: DataTypes.STRING,
                allowNull: false
            },

            type_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'types',
                    key: 'type_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },

            size_standard_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'size_standards',
                  key: 'size_standard_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        },
        {
            sequelize,
            modelName: "Size",
            tableName: "sizes",
            timestamps: true,
        }
    );

    return Size;
}