// // frontend/src/pages/admin/category/page.tsx

// import { useState } from "react";
// import { useGetCategoryDataQuery, CategoryData, useAddCategoryMutation } from "../../../slices/api/adminApiSlice";
// import AdminTable from "../../../components/admin/Table";
// import Spinner from "../../../components/Spinner";
// import Modal from "../../../components/admin/Modal";
// import { toast } from "react-toastify";

// const Category = () => {
//     const [page, setPage] = useState(1);
//     const [limit] = useState(6);
//     const { data, error, isLoading } = useGetCategoryDataQuery({ page, limit });
//     const [addCategory] = useAddCategoryMutation();
//     const categories = data?.data ?? [];
//     const total = data?.total ?? 0;

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [categoryName, setCategoryName] = useState("");
//     const [categoryDescription, setCategoryDescription] = useState("");

//     const tableHeaders = ["Name", "Description"];

//     const renderRow = (category: CategoryData) => (
//         <>
//             <td className="p-2">{category.categoryName}</td>
//             <td className="p-2">{category.categoryDescription}</td>
//         </>
//     );

//     const handleAddCategory = async () => {
//         try {
//             const response = await addCategory({ categoryName, categoryDescription });
//             toast.error(response?.error?.data?.message);
//             setIsModalOpen(false);
//             setCategoryName("");
//             setCategoryDescription("");
//         } catch (error) {
//             console.error("Failed to add category", error);
//             // toast.error(error?.data?.message);
//         }
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
//                     handleVerificationToggle={() => { }}
//                     tableHeaders={tableHeaders}
//                     renderRow={renderRow}
//                 />
//             )}

//             <div className="flex justify-between items-center mt-4">
//                 <button onClick={handlePreviousPage} disabled={page === 1} className="py-1 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded disabled:bg-gray-300">Previous</button>
//                 <span>Page {page}</span>
//                 <button onClick={handleNextPage} disabled={page * limit >= total} className="py-1 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded disabled:bg-gray-300">Next</button>
//             </div>

//             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//                 <h2 className="text-2xl mb-4">Add Category</h2>
//                 <input
//                     type="text"
//                     className="border p-2 w-full mb-4"
//                     placeholder="Category Name"
//                     value={categoryName}
//                     onChange={(e) => setCategoryName(e.target.value)}
//                 />
//                 <textarea
//                     className="border p-2 w-full mb-4"
//                     placeholder="Category Description"
//                     value={categoryDescription}
//                     onChange={(e) => setCategoryDescription(e.target.value)}
//                 />
//                 <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                     onClick={handleAddCategory}
//                 >
//                     Add
//                 </button>
//             </Modal>
//         </>
//     );
// };

// export default Category;


// // // frontend/src/pages/admin/category/page.tsx

// // import { useGetCategoryDataQuery, CategoryData } from "../../../slices/api/adminApiSlice";
// // import AdminTable from "../../../components/admin/Table";
// // import Spinner from "../../../components/Spinner";

// // const Category = () => {
// //     const { data, error, isLoading } = useGetCategoryDataQuery();
// //     const categories = data?.data ?? [];

// //     const tableHeaders = ["Name", "Description"];

// //     const renderRow = (category: CategoryData) => (
// //         <>
// //             <td className="p-2">{category.categoryName}</td>
// //             <td className="p-2">{category.categoryDescription}</td>
// //         </>
// //     );

// //     return (
// //         <>
// //             <span className="font-bold text-4xl">Category</span>
// //             {isLoading && <Spinner />}
// //             {error && <div>Error loading categories</div>}
// //             {!isLoading && !error && (
// //                 <AdminTable<CategoryData>
// //                     data={categories}
// //                     isLoading={isLoading}
// //                     error={error}
// //                     handleVerificationToggle={() => {}}
// //                     tableHeaders={tableHeaders}
// //                     renderRow={renderRow}
// //                 />
// //             )}
// //         </>
// //     );
// // };

// // export default Category;




// // // frontend/src/pages/admin/category/page.tsx

// // import { useGetCategoryDataQuery, CategoryData } from "../../../slices/api/adminApiSlice";
// // import AdminTable from "../../../components/admin/Table";
// // import Spinner from "../../../components/Spinner";

// // const Category = () => {
// //     const { data, error, isLoading } = useGetCategoryDataQuery();
// //     const categories = data?.data ?? [];

// //     const tableHeaders = ["Name", "Description"];

// //     const renderRow = (category: CategoryData) => (
// //         <>
// //             <td className="p-2">{category.categoryName}</td>
// //             <td className="p-2">{category.categoryDescription}</td>
// //         </>
// //     );

// //     return (
// //         <>
// //             <span className="font-bold text-4xl">Category</span>
// //             {isLoading && <Spinner />}
// //             {error && <div>Error loading categories</div>}
// //             {!isLoading && !error && (
// //                 <AdminTable<CategoryData>
// //                     data={categories}
// //                     isLoading={isLoading}
// //                     error={error}
// //                     handleVerificationToggle={() => {}}
// //                     tableHeaders={tableHeaders}
// //                     renderRow={renderRow}
// //                 />
// //             )}
// //         </>
// //     );
// // };

// // export default Category;


// // // frontend/src/pages/admin/category/page.tsx

// // import { useGetCategoryDataQuery } from "../../../slices/api/adminApiSlice";
// // import AdminTable from "../../../components/admin/Table";
// // import { CategoryData } from "../../../slices/api/adminApiSlice";
// // import Spinner from "../../../components/Spinner";

// // const Category = () => {
// //     const { data, error, isLoading } = useGetCategoryDataQuery();
// //     const categories = data?.data ?? [];
// //     // const total = data?.total ?? 0;

// //     const tableHeaders = ["Name", "Description"];

// //     const renderRow = (category: CategoryData) => (
// //         <>
// //             <td className="p-2">{category.categoryName}</td>
// //             <td className="p-2">{category.categoryDescription}</td>
// //         </>
// //     );

// //     return (
// //         <>
// //             <span className="font-bold text-4xl">Category</span>
// //             {isLoading && <Spinner />}
// //             {error && <div>Error loading categories</div>}
// //             {!isLoading && !error && (
// //                 <AdminTable
// //                     data={categories}
// //                     isLoading={isLoading}
// //                     error={error}
// //                     handleVerificationToggle={() => {}}
// //                     tableHeaders={tableHeaders}
// //                     renderRow={renderRow}
// //                 />
// //             )}
// //         </>
// //     );
// // };

// // export default Category;
