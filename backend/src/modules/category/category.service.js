import Category from "./category.model.js";

/*
===================================
CREATE CATEGORY
===================================
*/

export const createCategoryService =
async (data) => {

  /*
  ===============================
  CHECK EXISTING CATEGORY
  ===============================
  */

  const existingCategory =
    await Category.findOne({

      where: {
        name: data.name,
      },

    });

  if (existingCategory) {

    throw new Error(
      "Category already exists"
    );

  }

  /*
  ===============================
  CREATE CATEGORY
  ===============================
  */

  const category =
    await Category.create(data);

  return category;

};

/*
===================================
GET ALL CATEGORIES
===================================
*/

export const getCategoriesService =
async () => {

  const categories =
    await Category.findAll({

      order: [
        ["createdAt", "DESC"]
      ],

    });

  return categories;

};


/*
===================================
GET CATEGORY BY ID
===================================
*/

export const getCategoryByIdService =
async (id) => {

  const category =
    await Category.findByPk(id);

  if (!category) {

    throw new Error(
      "Category not found"
    );

  }

  return category;

};
