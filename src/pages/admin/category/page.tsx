// frontend/src/pages/admin/category/page.tsx

import { useState } from "react";
import { useGetCategoryDataQuery, useAddCategoryMutation, useEditCategoryMutation } from "../../../slices/api/adminApiSlice";
import Spinner from "../../../components/Spinner";
import { ICategory } from "../../../types/domain";
import Modal from "../../../components/admin/Modal";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { addCategorySchema } from "../../../validation/yupValidation";
import { MyError } from "../../../validation/validationTypes";
import { storage } from "../../../app/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Pagination from "../../../components/Pagination";


const Category = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(6);
    const { data, error, isLoading } = useGetCategoryDataQuery({ page, limit });
    const [addCategory] = useAddCategoryMutation();
    const [editCategory] = useEditCategoryMutation();
    const categories = data?.data ?? [];
    const total = data?.total ?? 0;
    const totalPages = Math.ceil(total / limit);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<ICategory | null>(null);

    const [categoryImage, setCategoryImage] = useState<File | null>(null);

    const tableHeaders = ["image", "Name", "Description", "Action"];

    const handleEditButtonClick = (category: ICategory) => {
        setCurrentCategory(category);
        setIsEditModalOpen(true);
    };


    const formikAdd = useFormik({
        initialValues: {
            categoryName: "",
            categoryDescription: "",
        },
        validationSchema: addCategorySchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                let categoryImageUrl = "";

                if (categoryImage) {
                    const imageRef = ref(storage, `admin/categoryImages/${uuidv4()}-${categoryImage.name}`);
                    await uploadBytes(imageRef, categoryImage);
                    categoryImageUrl = await getDownloadURL(imageRef);
                }
                await addCategory({ ...values, categoryImage: categoryImageUrl }).unwrap();
                // await addCategory(values).unwrap();
                toast.success("Category added successfully");
                resetForm();
                setCategoryImage(null);
                setIsAddModalOpen(false);
            } catch (error) {
                console.error("Failed to add category", error);
                toast.error((error as MyError)?.data?.message || (error as MyError)?.error);
            }
        },
    });

    const formikEdit = useFormik({
        initialValues: {
            categoryName: currentCategory?.categoryName || "",
            categoryDescription: currentCategory?.categoryDescription || "",
        },
        enableReinitialize: true,
        validationSchema: addCategorySchema,
        onSubmit: async (values) => {
            try {
                let categoryImageUrl = currentCategory?.categoryImage || "";

                if (categoryImage) {
                    const imageRef = ref(storage, `categories/images/${uuidv4()}-${categoryImage.name}`);
                    await uploadBytes(imageRef, categoryImage);
                    categoryImageUrl = await getDownloadURL(imageRef);
                }
                await editCategory({ _id: currentCategory?._id, ...values, categoryImage: categoryImageUrl }).unwrap();
                // await editCategory({ _id: currentCategory?._id, ...values }).unwrap();
                setCategoryImage(null);
                toast.success("Category edited successfully");
                setIsEditModalOpen(false);
            } catch (error) {
                console.error("Failed to edit category", error);
                toast.error((error as MyError)?.data?.message || (error as MyError)?.error);
            }
        },
    });

    const handleAddModalClose = () => {
        formikAdd.resetForm();
        setCategoryImage(null);
        setIsAddModalOpen(false);
    };

    const handleEditModalClose = () => {
        formikEdit.resetForm();
        setCategoryImage(null);
        setIsEditModalOpen(false);
    };

    return (
        <>
            <div className="flex justify-between items-center py-1 px-2">
                <span className="font-bold text-4xl">Category Management</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={() => setIsAddModalOpen(true)}>
                    Add Category
                </button>
            </div>

            {isLoading && <Spinner />}
            {error && <div>Error loading categories</div>}
            {!isLoading && !error && (

                <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200">
                    <div className="overflow-x-auto mt-3">
                        <table className="w-full text-left text-gray-700">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    {tableHeaders.map((header, index) => (
                                        <th key={index} className="p-2">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 ? (
                                    categories.map((category) => (
                                        <tr key={category._id} className="border-b hover:bg-gray-50">
                                            <td className="p-2">
                                                {category.categoryImage ? (
                                                    <img src={category.categoryImage} alt={category.categoryName} className="w-16 h-16 object-cover rounded" />
                                                ) : (
                                                    "No Image"
                                                )}
                                            </td>
                                            {/* <td className="p-2">{category.categoryImage}</td> */}
                                            <td className="p-2">{category.categoryName}</td>
                                            <td className="p-2">{category.categoryDescription}</td>
                                            <td className="p-2">
                                                <button onClick={() => handleEditButtonClick(category)}>
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={tableHeaders.length} className="text-center p-2">No data found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <Pagination page={page} totalPages={totalPages} setPage={setPage} />

            <Modal isOpen={isAddModalOpen} onClose={handleAddModalClose}>
                <h2 className="text-2xl mb-4">Add Category</h2>
                <form onSubmit={formikAdd.handleSubmit}>
                    <input
                        type="text"
                        className="border p-2 w-full mb-4"
                        placeholder="Category Name"
                        name="categoryName"
                        value={formikAdd.values.categoryName}
                        onChange={formikAdd.handleChange}
                        onBlur={formikAdd.handleBlur}
                    />
                    {formikAdd.touched.categoryName && formikAdd.errors.categoryName ? (
                        <div className="text-red-500">{formikAdd.errors.categoryName}</div>
                    ) : null}
                    <textarea
                        className="border p-2 w-full mb-4"
                        placeholder="Category Description"
                        name="categoryDescription"
                        value={formikAdd.values.categoryDescription}
                        onChange={formikAdd.handleChange}
                        onBlur={formikAdd.handleBlur}
                    />
                    {formikAdd.touched.categoryDescription && formikAdd.errors.categoryDescription ? (
                        <div className="text-red-500">{formikAdd.errors.categoryDescription}</div>
                    ) : null}
                    <input
                        type="file"
                        accept="image/*"
                        // placeholder=""
                        placeholder="Category Image"
                        onChange={(e) => setCategoryImage(e.currentTarget.files?.[0] || null)}
                        className="border p-2 w-full mb-4"
                    />
                    {categoryImage && (
                        <div className="mb-4">
                            <img src={URL.createObjectURL(categoryImage)} alt="Category Preview" className="w-32 h-32 object-cover" />
                        </div>
                    )}
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Add
                    </button>
                </form>
            </Modal>

            <Modal isOpen={isEditModalOpen} onClose={handleEditModalClose}>
                <h2 className="text-2xl mb-4">Edit Category</h2>
                <form onSubmit={formikEdit.handleSubmit}>
                    <input
                        type="text"
                        className="border p-2 w-full mb-4"
                        placeholder="Category Name"
                        name="categoryName"
                        value={formikEdit.values.categoryName}
                        onChange={formikEdit.handleChange}
                        onBlur={formikEdit.handleBlur}
                    />
                    {formikEdit.touched.categoryName && formikEdit.errors.categoryName ? (
                        <div className="text-red-500">{formikEdit.errors.categoryName}</div>
                    ) : null}
                    <textarea
                        className="border p-2 w-full mb-4"
                        placeholder="Category Description"
                        name="categoryDescription"
                        value={formikEdit.values.categoryDescription}
                        onChange={formikEdit.handleChange}
                        onBlur={formikEdit.handleBlur}
                    />
                    {formikEdit.touched.categoryDescription && formikEdit.errors.categoryDescription ? (
                        <div className="text-red-500">{formikEdit.errors.categoryDescription}</div>
                    ) : null}
                    <input
                        type="file"
                        placeholder="Category Image"
                        accept="image/*"
                        onChange={(e) => setCategoryImage(e.currentTarget.files?.[0] || null)}
                        className="border p-2 w-full mb-4"
                    />
                    {categoryImage && (
                        <div className="mb-4">
                            <img src={URL.createObjectURL(categoryImage)} alt="Category Preview" className="w-32 h-32 object-cover" />
                        </div>
                    )}
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Save
                    </button>
                </form>
            </Modal>
        </>
    );
};

export default Category;
