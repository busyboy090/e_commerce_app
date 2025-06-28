const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class Session extends Model {
        static associate (models) {
            Session.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'});
        }
    }

    Session.init(
        {
            session_id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
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
        
            user_agent: {
                type: DataTypes.STRING,
                allowNull: false
            },
        
            ip_address: {
                type: DataTypes.STRING,
                allowNull: false
            },

            device_id: {
                type: DataTypes.STRING,
                allowNull: false
            },
        
            location: {
                type: DataTypes.STRING,
                allowNull: false
            },
        
            device: {
                type: DataTypes.STRING,
                allowNull: false
            },
        
            last_active_at: {
                type: DataTypes.DATE,
                allowNull: false
            },

            deleteAt: {
                type: DataTypes.DATE,
                allowNull: false
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