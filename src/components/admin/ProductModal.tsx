// src/components/admin/ProductModal.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from "lucide-react";
import { createProduct, updateProduct } from "@/services/products";
import { Category } from "@/services/categories";

interface ProductModalProps {
    product: any;
    categories: Category[];
    onSave: (product: any) => void;
    onClose: () => void;
}

const ProductModal = ({ product, categories, onSave, onClose }: ProductModalProps) => {
    const [formData, setFormData] = useState({
        id: 0,
        title: '',
        price: 0,
        category: '',
        image: '',
        description: ''
    });

    const [specifications, setSpecifications] = useState([
        {
            title: "",
            description: ""
        }
    ]);


    const addSpecification = () => {
        setSpecifications(prev => [
            ...prev,
            {
                title: "",
                description: ""
            }
        ]);
    };


    const removeSpecification = (index: number) => {

        setSpecifications(prev =>
            prev.filter((_, i) => i !== index)
        );

    };


    const updateSpecification = (
        index: number,
        field: "title" | "description",
        value: string
    ) => {

        setSpecifications(prev =>
            prev.map((item, i) =>
                i === index
                    ? { ...item, [field]: value }
                    : item
            )
        );

    };

    useEffect(() => {

        if (product) {

            setFormData({
                id: product.id || 0,
                title: product.title || "",
                price: product.price || 0,
                category: product.category || "",
                image: product.image || "",
                description: product.description || ""
            });


            setSpecifications(
                product.specifications?.length
                    ? product.specifications
                    : [
                        {
                            title: "",
                            description: ""
                        }
                    ]
            );


        } else {

            const firstCategory =
                categories.find(c => c.name !== "All")?.name || "";


            setFormData({
                id: 0,
                title: "",
                price: 0,
                category: firstCategory,
                image: "",
                description: ""
            });


            setSpecifications([
                {
                    title: "",
                    description: ""
                }
            ]);

        }

    }, [product, categories]);



    const [uploading, setUploading] = useState(false);
    const CLOUD_NAME = "juhojyvi";
    const UPLOAD_PRESET = "sgsro1";

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;


        const form = new FormData();

        form.append("file", file);
        form.append("upload_preset", UPLOAD_PRESET);


        try {

            setUploading(true);


            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: form
                }
            );


            const data = await response.json();


            console.log("Cloudinary:", data);


            if (data.secure_url) {

                setFormData(prev => ({
                    ...prev,
                    image: data.secure_url
                }));

            } else {

                alert(data.error?.message || "Upload failed");

            }


        } catch (error) {

            console.error(error);
            alert("Image upload error");

        }
        finally {

            setUploading(false);

        }

    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();


        try {

            const productData = {
                id: product?.id,
                title: formData.title,
                price: formData.price,
                category: formData.category,
                image: formData.image,
                description: formData.description,
                specifications
            };


            let result;


            if (product?.id) {

                // UPDATE
                result = await updateProduct(
                    productData
                );


            } else {


                // CREATE
                result = await createProduct(
                    productData
                );

            }



            if (result.success) {


                onSave(
                    productData
                );


                onClose();


            } else {


                alert(
                    "Failed to save product"
                );

            }



        } catch (error) {


            console.error(
                "Save product error:",
                error
            );


            alert(
                "Something went wrong"
            );

        }

    };

    useEffect(() => {

        if (product) {

            setFormData(product);

        } else {

            const firstCategory =
                categories.find(c => c.name !== "All")?.name || "";

            setFormData({
                id: 0,
                title: "",
                price: 0,
                category: firstCategory,
                image: "",
                description: ""
            });

        }

    }, [product, categories]);

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
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {product ? 'Edit Product' : 'Add New Product'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                required
                            >
                                {categories
                                    .filter(c => c.name !== "All")
                                    .map((cat) => (
                                        <option
                                            key={cat.id}
                                            value={cat.name}
                                        >
                                            {cat.name}
                                        </option>
                                    ))}

                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Product Image
                            </label>


                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="w-full px-4 py-2 border rounded-lg"
                            />


                            {uploading && (
                                <p className="text-blue-600 mt-2">
                                    Uploading...
                                </p>
                            )}


                            {formData.image !== "" && (
                                <img
                                    src={formData.image}
                                    alt="preview"
                                    className="mt-3 w-32 h-32 object-cover rounded-lg"
                                />
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                required
                            />
                        </div>


                        <div>

                            <div className="flex justify-between items-center mb-2">

                                <label className="block text-sm font-medium text-gray-700">
                                    Product Specifications
                                </label>


                                <button
                                    type="button"
                                    onClick={addSpecification}
                                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-lg"
                                >

                                    <Plus size={16} />
                                    Add

                                </button>

                            </div>



                            <div className="space-y-3">


                                {
                                    specifications.map((spec, index) => (

                                        <div
                                            key={index}
                                            className="flex gap-2 items-start border p-3 rounded-lg"
                                        >


                                            <input
                                                type="text"
                                                placeholder="Specification title"
                                                value={spec.title}
                                                onChange={(e) =>
                                                    updateSpecification(
                                                        index,
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                className="flex-1 px-3 py-2 border rounded-lg"
                                            />



                                            <input
                                                type="text"
                                                placeholder="Specification description"
                                                value={spec.description}
                                                onChange={(e) =>
                                                    updateSpecification(
                                                        index,
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                className="flex-1 px-3 py-2 border rounded-lg"
                                            />



                                            <button
                                                type="button"
                                                onClick={() => removeSpecification(index)}
                                                className="text-red-600 mt-2"
                                            >

                                                <Trash2 size={20} />

                                            </button>
                                        </div>

                                    ))
                                }

                            </div>
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
                                {product ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProductModal;