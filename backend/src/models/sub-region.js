const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class SubRegion extends Model {
        static associate (models) {
            SubRegion.belongsTo(models.Region, { foreignKey: 'region_id', as: 'regions'});
            SubRegion.hasMany(models.Country, { foreignKey: 'sub_region_id', as: 'countries'});
        }
    }


    SubRegion.init(
        {
            sub_region_id: {
                type:  DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },

            name : {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },

            region_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'regions',
                    key: 'region_id'
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }
        },
        {
            sequelize,
            modelName: 'SubRegion',
            tableName: 'sub_regions',
            timestamps: true
        }
    )


    return SubRegion;
}