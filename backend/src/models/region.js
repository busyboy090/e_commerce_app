const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class Region extends Model {
        static associate (models) {
            Region.belongsTo(models.Continent, { foreignKey: 'continent_id', as: 'continent'});
            Region.hasMany(models.Country, { foreignKey: 'region_id', as: 'countries'});
        }
    }


    Region.init(
        {
            region_id: {
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

            code : {
                type: DataTypes.STRING,
                allowNull: false
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