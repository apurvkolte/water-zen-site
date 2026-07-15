// src/pages/Admin/Dashboard.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products, categories, sliderImages } from '@/data/products';
import ProductModal from '@/components/admin/ProductModal';
import CategoryModal from '@/components/admin/CategoryModal';
import BannerModal from '@/components/admin/BannerModal';

// Sample data stores - in production, use a database
let productData = [...products];
let categoryData = [...categories];
let bannerData = [...sliderImages];

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'banners'>('products');
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedBanner, setSelectedBanner] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [localProducts, setLocalProducts] = useState(productData);
    const [localCategories, setLocalCategories] = useState(categoryData);
    const [localBanners, setLocalBanners] = useState(bannerData);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const isAdmin = localStorage.getItem('adminAuth');
        if (!isAdmin) {
            navigate('/admin/login');
        } else {
            setIsLoading(false);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        navigate('/admin/login');
    };

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    const handleEditProduct = (product: any) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    useEffect(() => {

        const load = async () => {
            const res = await fetch("/api/products");
            const data = await res.json();

            setLocalProducts(data);
        };

        load();

    }, []);


    const handleDeleteProduct = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {

            const response = await fetch("/api/products", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id
                })
            });

            const result = await response.json();

            if (result.success) {

                setLocalProducts(prev =>
                    prev.filter(product => product.id !== id)
                );

            }
        }

    };

    const handleSaveProduct = (product: any) => {

        setLocalProducts(prev => {

            const exists = prev.some(
                p => p.id === product.id
            );

            if (exists) {
                return prev.map(p =>
                    p.id === product.id
                        ? product
                        : p
                );
            }

            return [
                ...prev,
                product
            ];
        });

        setIsModalOpen(false);
    };

    const handleAddCategory = () => {
        setSelectedCategory(null);
        setIsModalOpen(true);
    };

    const handleEditCategory = (category: string) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleDeleteCategory = async (category: string) => {

        if (category === "All") {
            alert('Cannot delete "All" category');
            return;
        }


        if (!window.confirm(`Are you sure you want to delete "${category}"?`)) {
            return;
        }


        try {

            const response = await fetch("/api/categories", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category
                }),
            });


            const result = await response.json();

            console.log("DELETE CATEGORY:", result);


            if (result.success) {

                // update UI
                setLocalCategories(prev =>
                    prev.filter(c => c !== category)
                );


                // update temporary data
                categoryData = categoryData.filter(
                    c => c !== category
                );

            } else {

                alert("Category delete failed");

            }

        } catch (error) {

            console.error("Delete category error:", error);
            alert("Something went wrong");

        }

    };

    const handleSaveCategory = (oldName: string | null, newName: string) => {
        if (oldName) {
            // Edit existing
            setLocalCategories(prev => prev.map(c => c === oldName ? newName : c));
            const index = categoryData.indexOf(oldName);
            if (index !== -1) categoryData[index] = newName;

            // Update products with new category name
            setLocalProducts(prev => prev.map(p =>
                p.category === oldName ? { ...p, category: newName } : p
            ));
            productData = productData.map(p =>
                p.category === oldName ? { ...p, category: newName } : p
            );
        } else {
            // Add new
            setLocalCategories(prev => [...prev, newName]);
            categoryData.push(newName);
        }
        setIsModalOpen(false);
    };

    const handleAddBanner = () => {
        setSelectedBanner(null);
        setIsModalOpen(true);
    };

    const handleEditBanner = (banner: any) => {
        setSelectedBanner(banner);
        setIsModalOpen(true);
    };

    const handleDeleteBanner = async (index: number) => {


        if (!window.confirm("Delete banner?"))
            return;


        const res = await fetch("/api/banners", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                index
            })
        });


        const result = await res.json();


        if (result.success) {

            setLocalBanners(prev =>
                prev.filter((_, i) => i !== index)
            );

        }

    };

    const handleSaveBanner = async (
        banner: any,
        index: number | null
    ) => {


        const response = await fetch("/api/banners", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...banner,
                index
            })
        });


        const result = await response.json();


        if (result.success) {


            const res = await fetch("/api/banners");

            const data = await res.json();


            setLocalBanners(data);


            setIsModalOpen(false);

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
                                                        onClick={() => handleDeleteProduct(product.id)}
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
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{category}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {localProducts.filter(p => p.category === category).length}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm">
                                                <button
                                                    onClick={() => handleEditCategory(category)}
                                                    className="text-blue-600 hover:text-blue-800 mr-3"
                                                    disabled={category === 'All'}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCategory(category)}
                                                    className="text-red-600 hover:text-red-800"
                                                    disabled={category === 'All'}
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
                                <div key={index} className="bg-white rounded-xl shadow overflow-hidden">
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
                                                onClick={() => handleEditBanner({ ...banner, index })}
                                                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteBanner(index)}
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
                {isModalOpen && activeTab === 'products' && (
                    <ProductModal
                        product={selectedProduct}
                        categories={localCategories}
                        onSave={handleSaveProduct}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}
                {isModalOpen && activeTab === 'categories' && (
                    <CategoryModal
                        category={selectedCategory}
                        categories={localCategories}
                        onSave={handleSaveCategory}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}
                {isModalOpen && activeTab === 'banners' && (
                    <BannerModal
                        banner={selectedBanner}
                        onSave={handleSaveBanner}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;