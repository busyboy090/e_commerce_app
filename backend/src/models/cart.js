const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {
            Cart.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
            Cart.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
            Cart.belongsTo(models.ProductVariant, { foreignKey: 'variant_id', as: 'product_variant' });
        }
    }

    Cart.init(
        {
            cart_id: {
                type: DataTypes.INTEGER, 
                autoIncrement: true,
                primaryKey: true,
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

            product_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                model: 'products',
                key: 'product_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            variant_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'product_variants',
                  key: 'variant_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, 
        {
            sequelize,
            modelName: 'Cart',
            tableName: 'carts',
            timestamps: true,
        }
);

    return Cart;
}