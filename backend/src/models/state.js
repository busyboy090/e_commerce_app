const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class State extends Model {
        static associate (models) {
            State.belongsTo(models.Country, { foreignKey: 'country_id', as: 'country'});
            State.hasMany(models.City, { foreignKey: 'state_id', as: 'cities'});
            State.hasMany(models.CustomerProfile, { foreignKey: 'state_id', as: 'customerState'});
            State.hasMany(models.VendorProfile, { foreignKey: 'state_id', as: 'vendorState'});
            State.hasMany(models.Address, { foreignKey: 'state_id', as: 'addresses'});
        }
    }


    State.init(
        {
            state_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false
            },

            country_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'countries',
                    key: 'country_id'
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }
        },
        {
            sequelize,
            modelName: 'State',
            tableName: 'states',
            timestamps: true
        }
    )

    return State;
}