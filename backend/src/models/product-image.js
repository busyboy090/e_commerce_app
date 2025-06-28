const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ProductImage extends Model {
        static associate (models) {
            ProductImage.belongsTo(models.Product, { foreignKey: 'product_id', as: 'productImages'});
            ProductImage.belongsTo(models.Color, { foreignKey: 'color_id', as: 'colors'})
        }
    }

    ProductImage.init(
        {
            product_image_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
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
        
            product_image: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            main_image: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
        },
        {
            sequelize,
            modelName: 'ProductImage',
            tableName: 'product_images',
            timestamps: true
        }
    )

    return ProductImage;
}