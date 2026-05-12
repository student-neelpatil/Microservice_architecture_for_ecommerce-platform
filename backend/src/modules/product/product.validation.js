import { z } from "zod";

export const ProductSchema =
    z.object({

        name:
            z.string().min(3),

        description:
            z.string().min(10),

        price:
            z.number().positive(),

        stock:
            z.number().int(),

        imageUrl:
            z.string().optional(),

    });