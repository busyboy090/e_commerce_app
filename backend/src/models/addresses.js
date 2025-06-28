const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Address extends Model {
        static associate (models) {
            Address.belongsTo(models.User, { foreignKey: 'user_id', as: 'userAddress'});
            Address.belongsTo(models.City, { foreignKey: 'city_id', as: 'city'});
        }
    }

    Address.init(
        {
            address_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
              },
        
              user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: "users",
                  key: "user_id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
              },
        
              first_name: {
                type: DataTypes.STRING,
                allowNull: false,
              },
        
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        
            phone_number: {
                type: DataTypes.STRING(20),
                allowNull: true,
                unique: true
            },
        
            additional_phone_number: {
                type: DataTypes.STRING(20),
                allowNull: true,
                unique: true
            },
        
            default: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false, 
            },
        
            address: {
                type: DataTypes.TEXT,
                allowNull: false
            },
        
            city_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'cities',
                  key: 'city_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }
        },
        {
            sequelize,
            modelName: 'Address',
            tableName: 'addresses',
            timestamps: true
        }
    )

    return Address;
}