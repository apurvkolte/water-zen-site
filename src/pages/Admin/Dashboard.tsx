// src/pages/Admin/Dashboard.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from "sweetalert2";

// import { products, categories, sliderImages } from '@/data/products';
import ProductModal from '@/components/admin/ProductModal';
import CategoryModal from '@/components/admin/CategoryModal';
import BannerModal from '@/components/admin/BannerModal';
import { deleteWithConfirm } from "@/utils/deleteWithConfirm";

import {
    deleteProduct,
    getProducts
} from "@/services/products";

import {
    deleteCategory,
    getCategories
} from "@/services/categories";

import {
    deleteBanner,
    getBanners
} from "@/services/banners";


import { Banner } from "@/services/banners";
import { Category } from "@/services/categories";
import { Product } from "@/services/products"
import { toast } from 'react-toastify';

// Sample data stores - in production, use a database
// let productData = [...products];
// let categoryData = [...categories];
// let bannerData = [...sliderImages];

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'banners'>('products');
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedBanner, setSelectedBanner] = useState<any>(null);
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [productModalOpen, setProductModalOpen] = useState(false);
    const [bannerModalOpen, setBannerModalOpen] = useState(false);
    // const [localProducts, setLocalProducts] = useState(productData);
    // const [localCategories, setLocalCategories] = useState(categoryData);
    // const [localBanners, setLocalBanners] = useState(bannerData);
    const [isLoading, setIsLoading] = useState(true);


    const [localProducts, setLocalProducts] = useState<Product[]>([]);
    const [localCategories, setLocalCategories] = useState<Category[]>([]);
    const [localBanners, setLocalBanners] = useState<Banner[]>([]);

    useEffect(() => {
        const isAdmin = localStorage.getItem('adminAuth');
        if (!isAdmin) {
            navigate('/admin/login');
        } else {
            setIsLoading(false);
        }
    }, [navigate]);


    useEffect(() => {

        const loadData = async () => {

            try {

                const [
                    productsData,
                    categoriesData,
                    bannersData
                ] = await Promise.all([
                    getProducts(),
                    getCategories(),
                    getBanners()
                ]);


                setLocalProducts(productsData);

                setLocalCategories(categoriesData);

                setLocalBanners(bannersData);


            } catch (error) {

                console.error(
                    "Load admin data failed:",
                    error
                );

            }

        };


        loadData();


    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        navigate('/admin/login');
    };

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setProductModalOpen(true);
    };

    const handleEditProduct = (product: any) => {
        setSelectedProduct(product);
        setProductModalOpen(true);
    };

    // useEffect(() => {

    //     const load = async () => {
    //         const res = await fetch("/api/products");
    //         const data = await res.json();

    //         setLocalProducts(data);
    //     };

    //     load();

    // }, []);


    const handleDeleteProduct = async (id: string) => {
        try {
            const deleted = await deleteWithConfirm({
                title: "Delete Product?",
                onDelete: async () => {
                    await deleteProduct(id);

                    setLocalProducts(prev =>
                        prev.filter(product => product.id !== id)
                    );
                },
            });


            if (deleted) {
                toast.success("Product deleted successfully.");
            }
        } catch (error) {
            toast.error("Unable to delete product.");
        }
    };

    const handleSaveProduct = async () => {
        const isEdit = !!selectedProduct;

        try {
            const data = await getProducts();

            setLocalProducts(data);
            setProductModalOpen(false);

            toast.success(
                isEdit
                    ? "Product updated successfully."
                    : "Product added successfully."
            );
        } catch (error) {
            toast.error("Unable to save product.");
        }
    };


    const handleAddCategory = () => {
        setSelectedCategory(null);
        setCategoryModalOpen(true);
    };

    const handleEditCategory = (category: Category) => {
        setSelectedCategory(category);
        setCategoryModalOpen(true);
    };

    const handleDeleteCategory = async (category: Category) => {
        if (category.name === "All") {
            Swal.fire({
                icon: "warning",
                title: "Not Allowed",
                text: 'The "All" category cannot be deleted.',
            });
            return;
        }

        try {
            const deleted = await deleteWithConfirm({
                title: `Delete "${category.name}"?`,
                onDelete: async () => {
                    await deleteCategory(category.id!);

                    setLocalCategories(prev =>
                        prev.filter(c => c.id !== category.id)
                    );
                },
            });


            if (deleted) {
                toast.success("Category deleted successfully.");
            }
        } catch {
            toast.error("Unable to delete category.");
        }
    };

    const handleSaveCategory = async () => {
        const isEdit = !!selectedCategory;

        try {
            const data = await getCategories();

            setLocalCategories(data);
            setCategoryModalOpen(false);

            toast.success(
                isEdit
                    ? "Category updated successfully."
                    : "Category added successfully."
            );
        } catch {
            toast.error("Unable to save category.");
        }
    };



    const handleAddBanner = () => {
        setSelectedBanner(null);
        setBannerModalOpen(true);
    };

    const handleEditBanner = (banner: any) => {
        setSelectedBanner(banner);
        setBannerModalOpen(true);
    };

    const handleDeleteBanner = async (id: string) => {
        try {
            const deleted = await deleteWithConfirm({
                title: "Delete Banner?",
                onDelete: async () => {
                    await deleteBanner(id);

                    setLocalBanners(prev =>
                        prev.filter(banner => banner.id !== id)
                    );
                },
            });


            if (deleted) {
                toast.success("Banner deleted successfully.");
            }
        } catch {
            toast.error("Unable to delete banner.");
        }
    };

    const handleSaveBanner = async () => {
        const isEdit = !!selectedBanner;

        try {
            const data = await getBanners();

            setLocalBanners(data);
            setBannerModalOpen(false);

            toast.success(
                isEdit
                    ? "Banner updated successfully."
                    : "Banner added successfully."
            );
        } catch {
            toast.error("Unable to save banner.");
        }
    };



    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }




    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {['products', 'categories', 'banners'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === tab
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div>
                        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Products ({localProducts.length})
                            </h2>
                            <button
                                onClick={handleAddProduct}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                                + Add Product
                            </button>
                        </div>

                        <div className="bg-white rounded-xl shadow overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {localProducts.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                                No products found. Click "Add Product" to create one.
                                            </td>
                                        </tr>
                                    ) : (
                                        localProducts.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{product.id}</td>
                                                <td className="px-4 py-4 text-sm text-gray-900 max-w-xs truncate">{product.title}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">₹{product.price}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm">
                                                    <button
                                                        onClick={() => handleEditProduct(product)}
                                                        className="text-blue-600 hover:text-blue-800 mr-3"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteProduct(product.id!)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Categories Tab */}
                {activeTab === 'categories' && (
                    <div>
                        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Categories ({localCategories.length})
                            </h2>
                            <button
                                onClick={handleAddCategory}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                                + Add Category
                            </button>
                        </div>

                        <div className="bg-white rounded-xl shadow overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {localCategories.map((category, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{category.name}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {
                                                    category.name === "All"
                                                        ? Math.max(localProducts.length - 1, 0)
                                                        : localProducts.filter(
                                                            p => p.category === category.name
                                                        ).length
                                                }
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm">
                                                <button
                                                    onClick={() => handleEditCategory(category)}
                                                    className="text-blue-600 hover:text-blue-800 mr-3"
                                                    disabled={category.name === 'All'}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCategory(category)}
                                                    className="text-red-600 hover:text-red-800"
                                                    disabled={category.name === 'All'}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Banners Tab */}
                {activeTab === 'banners' && (
                    <div>
                        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Banners ({localBanners.length})
                            </h2>
                            <button
                                onClick={handleAddBanner}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                                + Add Banner
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {localBanners.map((banner, index) => (
                                <div key={banner.id} className="bg-white rounded-xl shadow overflow-hidden">
                                    <div className="relative h-48 bg-gray-100">
                                        <img
                                            src={banner.url}
                                            alt={banner.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Banner+Image';
                                            }}
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-800">{banner.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{banner.subtitle}</p>
                                        <div className="mt-4 flex space-x-2">
                                            <button
                                                onClick={() => handleEditBanner(banner)}
                                                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteBanner(banner.id!)}
                                                className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {localBanners.length === 0 && (
                                <div className="col-span-full text-center py-12 text-gray-500">
                                    No banners found. Click "Add Banner" to create one.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            <AnimatePresence>
                {productModalOpen && (
                    <ProductModal
                        product={selectedProduct}
                        categories={localCategories}
                        onSave={handleSaveProduct}
                        onClose={() => setProductModalOpen(false)}
                    />
                )}

                {categoryModalOpen && (
                    <CategoryModal
                        category={selectedCategory}
                        categories={localCategories}
                        onSave={handleSaveCategory}
                        onClose={() => setCategoryModalOpen(false)}
                    />
                )}
                {bannerModalOpen && (
                    <BannerModal
                        banner={selectedBanner}
                        onSave={handleSaveBanner}
                        onClose={() => setBannerModalOpen(false)}
                    />
                )}

            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;