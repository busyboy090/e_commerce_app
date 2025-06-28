const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        static associate(models) {
            Review.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
            Review.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
        }
    }

    Review.init({
        review_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },

        review: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        product_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'products',
                key: 'product_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },

        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        }
    }, {
        sequelize,
        modelName: 'Review',
        timestamps: true,
        tableName: 'reviews'
    });

    return Review;
}