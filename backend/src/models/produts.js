const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            // Define associations here if needed
            Product.belongsTo(models.Category, { foreignKey: 'category_id', as: 'categories' });
            Product.belongsTo(models.Brand, { foreignKey: 'brand_id', as: 'brands' });
            Product.belongsTo(models.Type, { foreignKey: 'type_id', as: 'types' });
            Product.hasMany(models.ProductImage, { foreignKey: 'product_id', as: 'productImages'});
            Product.belongsTo(models.User, { foreignKey: 'approved_by', as: 'productApproval' })
            Product.belongsTo(models.User, { foreignKey: 'vendor_id', as: 'vendor' })
        }
    }

    Product.init({
        product_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },

        vendor_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
              model: 'users',
              key: 'user_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'categories',
                key: 'category_id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            allowNull: false,
        },

        brand_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'brands',
                key: 'brand_id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            allowNull: false,
        },

        type_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'types',
                key: 'type_id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            allowNull: false,
        },

        unit_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
              model: 'units',
              key: 'unit_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
            
        is_approved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        approved_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
            model: 'users',
            key: 'user_id'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },

        approved_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
    }, 
    {
        sequelize, 
        modelName: "Product",
        tableName: "products",
        timestamps: true, 
        indexes: [
          {
              unique: true,
              fields: ['name']
          }
        ]
    });

    return Product
}