const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class City extends Model {
        static associate (models) {
            City.belongsTo(models.State, { foreignKey: 'state_id', as: 'state'});
        }
    }

    City.init(
        {
            city_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
              },
        
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
        
            country_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'countries',
                  key: 'country_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
        },
        {
            sequelize,
            modelName: 'City',
            tableName: 'cities',
            timestamps: true
        }
    )

    return City;
} 