import { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

import { createCategory, updateCategory } from "@/services/categories";
import { Category } from "@/services/categories";


const categorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Category name is required.")
        .min(3, "Category name must be at least 3 characters.")
});


type CategoryFormData = z.infer<typeof categorySchema>;


interface CategoryModalProps {
    category: Category | null;
    categories: Category[];
    onSave: (
        oldCategory: Category | null,
        newName: string
    ) => void;
    onClose: () => void;
}


const CategoryModal = ({
    category,
    categories,
    onSave,
    onClose
}: CategoryModalProps) => {


    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: ""
        }
    });



    useEffect(() => {

        reset({
            name: category?.name || ""
        });

    }, [category, reset]);



    const onSubmit = async (
        data: CategoryFormData
    ) => {

        const newName = data.name.trim();


        const exists = categories.some(
            (cat) =>
                cat.name.toLowerCase() === newName.toLowerCase()
                &&
                cat.id !== category?.id
        );


        if (exists) {
            alert("Category already exists!");
            return;
        }


        try {

            if (category) {

                await updateCategory(
                    category.id!,
                    newName
                );

            } else {

                await createCategory(
                    newName
                );

            }


            onSave(
                category,
                newName
            );


            onClose();


        } catch (error) {

            console.error(
                "Category save error:",
                error
            );

            alert(
                "Failed to save category"
            );

        }

    };



    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >

            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
            >

                <div className="p-6">

                    <div className="flex justify-between items-center mb-6">

                        <h2 className="text-2xl font-bold text-gray-800">
                            {category ? "Edit Category" : "Add New Category"}
                        </h2>

                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500 hover:text-red-600 transition"
                        >
                            <X size={24} />
                        </button>

                    </div>


                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category Name
                            </label>


                            <input
                                type="text"
                                {...register("name")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter category name"
                                autoFocus
                            />


                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name.message}
                                </p>
                            )}

                        </div>



                        <div className="flex justify-end space-x-3 pt-4 border-t">

                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isSubmitting
                                    ? "Saving..."
                                    : category
                                        ? "Update"
                                        : "Create"
                                }
                            </button>

                        </div>


                    </form>

                </div>

            </motion.div>

        </motion.div>
    );
};


export default CategoryModal;