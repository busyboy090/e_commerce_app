const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class Region extends Model {
        static associate (models) {
            Region.hasMany(models.SubRegion, { foreignKey: 'region_id', as: 'subRegions'});
        }
    }


    Region.init(
        {
            region_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },

            name: {
                type:  DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            sequelize,
            modelName: 'Region',
            tableName: 'regions',
            timestamps: true
        }
    )

    return Region;
}