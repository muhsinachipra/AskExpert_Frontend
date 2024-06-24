// frontend/src/pages/admin/category/page.tsx

import { useState } from "react";
import { useGetCategoryDataQuery, useAddCategoryMutation, useEditCategoryMutation, CategoryData } from "../../../slices/api/adminApiSlice";
import Spinner from "../../../components/Spinner";
import Modal from "../../../components/admin/Modal";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { addCategorySchema } from "../../../validation/yupValidation";
import { MyError } from "../../../validation/validationTypes";

const Category = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(6);
    const { data, error, isLoading } = useGetCategoryDataQuery({ page, limit });
    const [addCategory] = useAddCategoryMutation();
    const [editCategory] = useEditCategoryMutation();
    const categories = data?.data ?? [];
    const total = data?.total ?? 0;

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    // const [currentCategory, setCurrentCategory] = useState<{ id: string, categoryName: string, categoryDescription: string } | null>(null);
    const [currentCategory, setCurrentCategory] = useState<CategoryData | null>(null);

    const tableHeaders = ["Name", "Description", "Action"];

    const handleEditButtonClick = (category: CategoryData) => {
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
                await addCategory(values).unwrap();
                toast.success("Category added successfully");
                resetForm();
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
                await editCategory({ _id: currentCategory?._id, ...values }).unwrap();
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
        setIsAddModalOpen(false);
    };

    const handleEditModalClose = () => {
        formikEdit.resetForm();
        setIsEditModalOpen(false);
    };

    const handleNextPage = () => {
        if (page * limit < total) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <>
            <span className="font-bold text-4xl">Category</span>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={() => setIsAddModalOpen(true)}
            >
                Add Category
            </button>
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
                                            <td className="p-2">{category.categoryName}</td>
                                            <td className="p-2">{category.categoryDescription}</td>
                                            <button onClick={() => handleEditButtonClick(category)}>
                                                Edit
                                            </button>
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

            <div className="flex justify-between items-center mt-4">
                <button onClick={handlePreviousPage} disabled={page === 1} className="py-1 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded disabled:bg-gray-300">Previous</button>
                <span>Page {page}</span>
                <button onClick={handleNextPage} disabled={page * limit >= total} className="py-1 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded disabled:bg-gray-300">Next</button>
            </div>

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
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Save
                    </button>
                </form>
            </Modal>
        </>
    );
};

export default Category;

// // frontend/src/pages/admin/category/page.tsx

// import { useState } from "react";
// import { useGetCategoryDataQuery, CategoryData, useAddCategoryMutation } from "../../../slices/api/adminApiSlice";
// import AdminTable from "../../../components/admin/Table";
// import Spinner from "../../../components/Spinner";
// import Modal from "../../../components/admin/Modal";
// import { toast } from "react-toastify";
// import { useFormik } from "formik";
// import { addCategorySchema } from "../../../validation/yupValidation";
// import { MyError } from "../../../validation/validationTypes";

// const Category = () => {
//     const [page, setPage] = useState(1);
//     const [limit] = useState(6);
//     const { data, error, isLoading } = useGetCategoryDataQuery({ page, limit });
//     const [addCategory] = useAddCategoryMutation();
//     const categories = data?.data ?? [];
//     const total = data?.total ?? 0;

//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const tableHeaders = ["Name", "Description", "Action"];

//     const handleButtonClick = async (categoryId: string) => {
//         try {
//             await editCategory({ categoryId }).unwrap();
//             toast.success("Category Edited successfully");
//         } catch (error) {
//             console.error("Failed to Edit category", error);
//             toast.error((error as MyError)?.data?.message || (error as MyError)?.error);
//         }
//     };

//     const renderRow = (category: CategoryData, handleButtonClick: (categoryId: string) => void) => (
//         <>
//             <td className="p-2">{category.categoryName}</td>
//             <td className="p-2">{category.categoryDescription}</td>
//             <td className="p-2">
//                 <button onClick={() => handleButtonClick(category._id)}>
//                     Edit
//                 </button>
//             </td>
//         </>
//     );

//     const formik = useFormik({
//         initialValues: {
//             categoryName: "",
//             categoryDescription: "",
//         },
//         validationSchema: addCategorySchema,
//         onSubmit: async (values, { resetForm }) => {
//             try {
//                 await addCategory(values).unwrap();
//                 toast.success("Category added successfully");
//                 resetForm();
//                 setIsModalOpen(false);
//             } catch (error) {
//                 console.error("Failed to add category", error);
//                 toast.error((error as MyError)?.data?.message || (error as MyError)?.error);
//             }
//         },
//     });

//     const handleModalClose = () => {
//         formik.resetForm();
//         setIsModalOpen(false);
//     };

//     const handleNextPage = () => {
//         if (page * limit < total) {
//             setPage(page + 1);
//         }
//     };

//     const handlePreviousPage = () => {
//         if (page > 1) {
//             setPage(page - 1);
//         }
//     };

//     return (
//         <>
//             <span className="font-bold text-4xl">Category</span>
//             <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
//                 onClick={() => setIsModalOpen(true)}
//             >
//                 Add Category
//             </button>
//             {isLoading && <Spinner />}
//             {error && <div>Error loading categories</div>}
//             {!isLoading && !error && (
//                 <AdminTable<CategoryData>
//                     data={categories}
//                     isLoading={isLoading}
//                     error={error}
//                     handleButtonClick={handleButtonClick}
//                     tableHeaders={tableHeaders}
//                     renderRow={renderRow}// why am i getting this error in squiggly line under renderRow "Type '(category: CategoryData, handleButtonClick: (categoryId: string) => void) => JSX.Element' is not assignable to type '(datum: CategoryData, handleButtonClick: (id: string, isVerified: boolean) => void) => ReactNode'.
//                     // Types of parameters 'handleButtonClick' and 'handleButtonClick' are incompatible.
//                     //   Target signature provides too few arguments. Expected 2 or more, but got 1.ts(2322)
//                 //   Table.tsx(17, 5): The expected type comes from property 'renderRow' which is declared here on type 'IntrinsicAttributes & AdminTableProps<CategoryData>'"
//                 />
//             )}

//             <div className="flex justify-between items-center mt-4">
//                 <button onClick={handlePreviousPage} disabled={page === 1} className="py-1 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded disabled:bg-gray-300">Previous</button>
//                 <span>Page {page}</span>
//                 <button onClick={handleNextPage} disabled={page * limit >= total} className="py-1 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded disabled:bg-gray-300">Next</button>
//             </div>

//             <Modal isOpen={isModalOpen} onClose={handleModalClose}>
//                 <h2 className="text-2xl mb-4">Add Category</h2>
//                 <form onSubmit={formik.handleSubmit}>
//                     <input
//                         type="text"
//                         className="border p-2 w-full mb-4"
//                         placeholder="Category Name"
//                         name="categoryName"
//                         value={formik.values.categoryName}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.categoryName && formik.errors.categoryName ? (
//                         <div className="text-red-500">{formik.errors.categoryName}</div>
//                     ) : null}
//                     <textarea
//                         className="border p-2 w-full mb-4"
//                         placeholder="Category Description"
//                         name="categoryDescription"
//                         value={formik.values.categoryDescription}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.categoryDescription && formik.errors.categoryDescription ? (
//                         <div className="text-red-500">{formik.errors.categoryDescription}</div>
//                     ) : null}
//                     <button
//                         type="submit"
//                         className="bg-blue-500 text-white px-4 py-2 rounded"
//                     >
//                         Add
//                     </button>
//                 </form>
//             </Modal>
//         </>
//     );
// };

// export default Category;


// // frontend/src/pages/admin/category/page.tsx

// import { useGetCategoryDataQuery, CategoryData } from "../../../slices/api/adminApiSlice";
// import AdminTable from "../../../components/admin/Table";
// import Spinner from "../../../components/Spinner";

// const Category = () => {
//     const { data, error, isLoading } = useGetCategoryDataQuery();
//     const categories = data?.data ?? [];

//     const tableHeaders = ["Name", "Description"];

//     const renderRow = (category: CategoryData) => (
//         <>
//             <td className="p-2">{category.categoryName}</td>
//             <td className="p-2">{category.categoryDescription}</td>
//         </>
//     );

//     return (
//         <>
//             <span className="font-bold text-4xl">Category</span>
//             {isLoading && <Spinner />}
//             {error && <div>Error loading categories</div>}
//             {!isLoading && !error && (
//                 <AdminTable<CategoryData>
//                     data={categories}
//                     isLoading={isLoading}
//                     error={error}
//                     handleButtonClick={() => {}}
//                     tableHeaders={tableHeaders}
//                     renderRow={renderRow}
//                 />
//             )}
//         </>
//     );
// };

// export default Category;




// // frontend/src/pages/admin/category/page.tsx

// import { useGetCategoryDataQuery, CategoryData } from "../../../slices/api/adminApiSlice";
// import AdminTable from "../../../components/admin/Table";
// import Spinner from "../../../components/Spinner";

// const Category = () => {
//     const { data, error, isLoading } = useGetCategoryDataQuery();
//     const categories = data?.data ?? [];

//     const tableHeaders = ["Name", "Description"];

//     const renderRow = (category: CategoryData) => (
//         <>
//             <td className="p-2">{category.categoryName}</td>
//             <td className="p-2">{category.categoryDescription}</td>
//         </>
//     );

//     return (
//         <>
//             <span className="font-bold text-4xl">Category</span>
//             {isLoading && <Spinner />}
//             {error && <div>Error loading categories</div>}
//             {!isLoading && !error && (
//                 <AdminTable<CategoryData>
//                     data={categories}
//                     isLoading={isLoading}
//                     error={error}
//                     handleButtonClick={() => {}}
//                     tableHeaders={tableHeaders}
//                     renderRow={renderRow}
//                 />
//             )}
//         </>
//     );
// };

// export default Category;


// // frontend/src/pages/admin/category/page.tsx

// import { useGetCategoryDataQuery } from "../../../slices/api/adminApiSlice";
// import AdminTable from "../../../components/admin/Table";
// import { CategoryData } from "../../../slices/api/adminApiSlice";
// import Spinner from "../../../components/Spinner";

// const Category = () => {
//     const { data, error, isLoading } = useGetCategoryDataQuery();
//     const categories = data?.data ?? [];
//     // const total = data?.total ?? 0;

//     const tableHeaders = ["Name", "Description"];

//     const renderRow = (category: CategoryData) => (
//         <>
//             <td className="p-2">{category.categoryName}</td>
//             <td className="p-2">{category.categoryDescription}</td>
//         </>
//     );

//     return (
//         <>
//             <span className="font-bold text-4xl">Category</span>
//             {isLoading && <Spinner />}
//             {error && <div>Error loading categories</div>}
//             {!isLoading && !error && (
//                 <AdminTable
//                     data={categories}
//                     isLoading={isLoading}
//                     error={error}
//                     handleButtonClick={() => {}}
//                     tableHeaders={tableHeaders}
//                     renderRow={renderRow}
//                 />
//             )}
//         </>
//     );
// };

// export default Category;
