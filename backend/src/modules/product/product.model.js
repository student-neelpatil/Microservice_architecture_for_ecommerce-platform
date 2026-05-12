import {
  DataTypes
} from "sequelize";

import sequelize
from "../../config/db.js";

const Product = sequelize.define(

  "Product",

  {
    id: {
      type: DataTypes.UUID,

      defaultValue:
        DataTypes.UUIDV4,

      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,

      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,

      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT,

      allowNull: false,
    },

    stock: {
      type: DataTypes.INTEGER,

      allowNull: false,
    },

    imageUrl: {
      type: DataTypes.STRING,
    },
  },

  {
    timestamps: true,
  }

);

export default Product;