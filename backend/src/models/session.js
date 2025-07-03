const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class Session extends Model {
        static associate (models) {
            Session.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'});
            Session.belongsTo(models.UserDevice, { foreignKey: 'device_id', as: 'device'})
        }
    }

    Session.init(
        {
            session_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
        
            user_id: {
                type:  DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model:  'users',
                  key: 'user_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },

            device_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'user_devices',
                  key: 'device_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
        
            browser: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
        
            user_agent: {
                type: DataTypes.STRING,
                allowNull: false
            },
        
            last_active_at: {
                type: DataTypes.DATE,
                allowNull: false
            },
        
            deleteAt: {
                allowNull: false,
                type: DataTypes.DATE,
            }
        },
        {
            sequelize,
            modelName: 'Session',
            tableName: 'sessions',
            timestamps: true
        }
    )

    return Session;
}