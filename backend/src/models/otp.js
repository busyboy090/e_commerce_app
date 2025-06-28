const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // Define the Otp model
  class Otp extends Model {
    static associate(models) {
      // Define association with User model
      Otp.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }

  Otp.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      code: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      expireAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      used: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    },
    {
      sequelize,
      modelName: "Otp",
      tableName: "otps",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["user_id"],
        },
      ],
    }
  );

  return Otp;
}
