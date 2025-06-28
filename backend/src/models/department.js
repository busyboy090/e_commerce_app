const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Department extends Model {
        static associate (models) {
            Department.hasMany(models.AdminProfile, { foreignKey: 'department_id', as: 'department'});
        }
    }

    Department.init(
        {
            department_id: {
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

            description: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: 'Department',
            tableName: 'departments',
            timestamps: true
        }
    )

    return Department;
} 