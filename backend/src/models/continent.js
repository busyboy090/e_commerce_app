const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class Continent extends Model {
        static associate (models) {
            Continent.hasMany(models.Region, { foreignKey: 'continent_id', as: 'regions'});
        }
    }


    Continent.init(
        {
            continent_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },

            name: {
                type:  DataTypes.STRING,
                allowNull: false,
                unique: true
            },

            code: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Continent',
            tableName: 'continents',
            timestamps: true
        }
    )

    return Continent;
}