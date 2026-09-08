const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Size extends Model {
        static associate(models) {
            // Define associations here if needed
            Size.belongsTo(models.Type, { foreignKey: 'type_id', as: 'types' });
            Size.belongsTo(models.SizeRegion, { foreignKey: 'size_region_id', as: 'sizeRegion' });
            Size.belongsTo(models.Unit, { foreignKey: 'unit_id', as: 'unit'})
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

            name: {
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

            size_region_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                  model: 'size_regions',
                  key: 'size_region_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },

            unit_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                  model: 'units',
                  key: 'unit_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
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