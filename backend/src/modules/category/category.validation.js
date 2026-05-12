import { z } from "zod";

/*
===================================
CREATE CATEGORY SCHEMA
===================================
*/

export const createCategorySchema =
z.object({

  name:
    z.string().min(2),

});

/*
===================================
UPDATE CATEGORY SCHEMA
===================================
*/

export const updateCategorySchema =
createCategorySchema.partial();