import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Banner, createBanner, updateBanner } from "@/services/banners";


const bannerSchema = z.object({
    url: z
        .string()
        .min(1, "Banner image is required."),

    title: z
        .string()
        .trim()
        .min(1, "Title is required.")
        .min(3, "Title must be at least 3 characters."),

    subtitle: z
        .string()
        .trim()
        .min(1, "Subtitle is required.")
});


type BannerFormData = z.infer<typeof bannerSchema>;



interface BannerModalProps {

    banner: Banner | null;

    onSave: (
        banner: Banner
    ) => void;

    onClose: () => void;

}



const BannerModal = ({
    banner,
    onSave,
    onClose
}: BannerModalProps) => {


    const [uploading, setUploading] = useState(false);


    const CLOUD_NAME = "juhojyvi";
    const UPLOAD_PRESET = "sgsro1";



    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<BannerFormData>({
        resolver: zodResolver(bannerSchema),
        defaultValues: {
            url: "",
            title: "",
            subtitle: ""
        }
    });



    const imageUrl = watch("url");



    useEffect(() => {

        if (banner) {

            reset({
                url: banner.url || "",
                title: banner.title || "",
                subtitle: banner.subtitle || ""
            });

        } else {

            reset({
                url: "",
                title: "",
                subtitle: ""
            });

        }

    }, [banner, reset]);



    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {


        const file = e.target.files?.[0];


        if (!file) return;


        if (!file.type.startsWith("image/")) {

            alert("Please select an image file.");
            return;

        }


        try {

            setUploading(true);


            const data = new FormData();

            data.append(
                "file",
                file
            );

            data.append(
                "upload_preset",
                UPLOAD_PRESET
            );


            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: data
                }
            );


            const result = await response.json();



            if (result.secure_url) {

                setValue(
                    "url",
                    result.secure_url,
                    {
                        shouldValidate: true
                    }
                );

            } else {

                alert(
                    result.error?.message || "Upload failed"
                );

            }


        } catch (error) {

            console.error(error);
            alert("Image upload failed");


        } finally {

            setUploading(false);

        }

    };




    const onSubmit = async (
        data: BannerFormData
    ) => {


        try {


            const bannerData = {
                id: banner?.id,
                url: data.url,
                title: data.title,
                subtitle: data.subtitle
            };



            if (banner?.id) {

                await updateBanner(
                    bannerData
                );

            } else {

                await createBanner(
                    bannerData
                );

            }



            onSave(
                bannerData
            );


            onClose();



        } catch (error) {

            console.error(error);
            alert("Failed to save banner");

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
                        {banner ? "Edit Banner" : "Add New Banner"}
                    </h2>



                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >


                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Banner Image
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


                            {errors.url && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.url.message}
                                </p>
                            )}


                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    className="mt-3 w-full h-32 object-cover rounded-lg"
                                />
                            )}

                        </div>



                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>


                            <input
                                type="text"
                                {...register("title")}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Banner title"
                            />


                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.title.message}
                                </p>
                            )}

                        </div>




                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Subtitle
                            </label>


                            <input
                                type="text"
                                {...register("subtitle")}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Banner subtitle"
                            />


                            {errors.subtitle && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.subtitle.message}
                                </p>
                            )}

                        </div>




                        <div className="flex justify-end space-x-3 pt-4 border-t">


                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 border rounded-lg"
                            >
                                Cancel
                            </button>



                            <button
                                type="submit"
                                disabled={isSubmitting || uploading}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                            >
                                {
                                    isSubmitting
                                        ? "Saving..."
                                        : banner
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


export default BannerModal;