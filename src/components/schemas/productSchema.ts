// schemas/productSchema.ts

import { z } from "zod";

export const productSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters"),

    price: z
        .number()
        .positive("Price must be greater than 0"),

    category: z
        .string()
        .min(1, "Please select a category"),

    image: z
        .string()
        .url("Please upload a valid image"),

    description: z
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters"),

    specifications: z
        .array(
            z.object({
                title: z.string().min(1, "Title is required"),
                description: z.string().min(1, "Description is required"),
            })
        )
        .min(1, "Add at least one specification"),
});

export type ProductForm = z.infer<typeof productSchema>;