import {
  DataTypes
} from "sequelize";

import sequelize
from "../../config/db.js";

import Category from "../category/category.model.js";

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

     /*
    ===============================
    FOREIGN KEY
    ===============================
    */

    categoryId: {

      type:DataTypes.UUID,
      allowNull: false,

    },
  },

  {
    timestamps: true,
  }

);


/*
===================================
RELATIONSHIPS
===================================
*/

/*
One Category
has many Products
*/

Category.hasMany(Product, {

  foreignKey:
    "categoryId",

});

/*
Each Product
belongs to one Category
*/

Product.belongsTo(Category, {

  foreignKey:
    "categoryId",

});

export default Product;