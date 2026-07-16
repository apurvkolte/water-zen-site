// src/components/admin/CategoryModal.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createCategory, updateCategory } from "@/services/categories";
import { Category } from "@/services/categories";


interface CategoryModalProps {
    category: Category | null;
    categories: Category[];
    onSave: (
        oldCategory: Category | null,
        newName: string
    ) => void;
    onClose: () => void;
}


const CategoryModal = ({ category, categories, onSave, onClose }: CategoryModalProps) => {
    const [name, setName] = useState('');

    useEffect(() => {
        setName(category?.name || '');
    }, [category]);

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        const newName = name.trim();

        if (!newName) return;


        const exists = categories.some(
            (cat) =>
                cat.name.toLowerCase() === newName.toLowerCase() &&
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
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {category ? 'Edit Category' : 'Add New Category'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                placeholder="Enter category name"
                                required
                                autoFocus
                            />
                        </div>

                        <div className="flex justify-end space-x-3 pt-4 border-t">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                {category ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CategoryModal;