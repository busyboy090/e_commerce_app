const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class SizeStandard extends Model {
        static associate (models) {
            SizeStandard.hasMany(models.Size, { foreignKey: 'size_standard_id', as: 'sizeStandards'})
        }
    }

    SizeStandard.init(
        {
            size_standard_id: {
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
            modelName: 'SizeStandard',
            tableName: 'size_standards',
            timestamps: true
        }
    )

    return SizeStandard;
}