const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Cart, { foreignKey: "user_id", as: "carts" });
      User.hasOne(models.Otp, { foreignKey: "user_id", as: "otp" });
      User.hasMany(models.Product, { foreignKey: "vendor_id", as: "vendor" });
      User.hasMany(models.Product, {
        foreignKey: "approved_by",
        as: "productApproval",
      });
      User.hasOne(models.VendorProfile, {
        foreignKey: "user_id",
        as: "vendorProfile",
      });
      User.hasOne(models.AdminProfile, {
        foreignKey: "user_id",
        as: "adminProfile",
      });
      User.hasOne(models.CustomerProfile, {
        foreignKey: "user_id",
        as: "customerProfile",
      });
      // User.hasMany(models.Order, { foreignKey: 'user_id', as: 'orders' });
      User.hasMany(models.Address, { foreignKey: "user_id", as: "addresses" });
      User.hasMany(models.VendorBusinessType, { foreignKey: 'user_id', as: 'vendorBusinessTypes'});
      User.hasMany(models.VendorBusinessType, { foreignKey: 'approved_by', as: 'approvedBy'});
      User.hasMany(models.Session, {  foreignKey: 'user_id', as: 'sessions'})
    }
  }

  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },

      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      country_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'countries',
            key: 'country_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      googleLogin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      totp_secret: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      totp_iv: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      is_2fa_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      role: {
        type: DataTypes.ENUM("admin", "customer", "vendor"),
        allowNull: false,
        defaultValue: "customer",
      },

      status: {
        type: DataTypes.ENUM("active", "suspended"),
        allowNull: false,
        defaultValue: "active",
      },

      picture: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },

      is_email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
      ],
    }
  );

  return User;
};
