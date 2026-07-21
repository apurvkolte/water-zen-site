import Swal from "sweetalert2";

interface DeleteConfirmProps {
    title: string;
    onDelete: () => Promise<void>;
}

export const deleteWithConfirm = async ({
    title,
    onDelete
}: DeleteConfirmProps) => {

    const result = await Swal.fire({
        title,
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
    });


    if (!result.isConfirmed) {
        return false;
    }


    await onDelete();

    return true;
};