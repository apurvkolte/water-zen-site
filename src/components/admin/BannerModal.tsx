// src/components/admin/BannerModal.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BannerModalProps {
    banner: any;
    onSave: (banner: any, index: number | null) => void;
    onClose: () => void;
}

const BannerModal = ({ banner, onSave, onClose }: BannerModalProps) => {
    const [formData, setFormData] = useState({
        url: '',
        title: '',
        subtitle: ''
    });

    useEffect(() => {
        if (banner) {
            setFormData({
                url: banner.url || '',
                title: banner.title || '',
                subtitle: banner.subtitle || ''
            });
        } else {
            setFormData({
                url: '',
                title: '',
                subtitle: ''
            });
        }
    }, [banner]);

    const [uploading, setUploading] = useState(false);

    const CLOUD_NAME = "juhojyvi";
    const UPLOAD_PRESET = "sgsro1";

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;


        const data = new FormData();

        data.append("file", file);
        data.append("upload_preset", UPLOAD_PRESET);


        try {

            setUploading(true);


            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: data
                }
            );


            const result = await response.json();


            if (result.secure_url) {

                setFormData(prev => ({
                    ...prev,
                    url: result.secure_url
                }));

            }
            else {

                alert(result.error?.message);

            }


        } catch (error) {

            console.error(error);
            alert("Image upload failed");

        }
        finally {

            setUploading(false);

        }

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            const bannerData = {
                ...formData,
                index: banner?.index
            };


            const response = await fetch("/api/banners", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bannerData)
            });


            const result = await response.json();


            if (result.success) {

                onSave(
                    formData,
                    banner?.index !== undefined ? banner.index : null
                );

                onClose();

            } else {

                alert("Failed to save banner");

            }

        } catch (error) {

            console.error("Save banner error:", error);
            alert("Something went wrong");

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
                        {banner ? 'Edit Banner' : 'Add New Banner'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
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


                            {formData.url && (
                                <img
                                    src={formData.url}
                                    className="mt-3 w-full h-32 object-cover rounded-lg"
                                />
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                placeholder="Banner title"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                            <input
                                type="text"
                                value={formData.subtitle}
                                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                placeholder="Banner subtitle"
                                required
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
                                {banner ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default BannerModal;