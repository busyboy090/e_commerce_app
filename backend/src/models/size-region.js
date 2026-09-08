const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class SizeRegion extends Model {
        static associate (models) {
            SizeRegion.hasMany(models.Size, { foreignKey: 'size_region_id', as: 'sizes'})
        }
    }

    SizeRegion.init(
        {
            size_region_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
        
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'SizeRegion',
            tableName: 'size_regions',
            timestamps: true
        }
    )

    return SizeRegion;
}