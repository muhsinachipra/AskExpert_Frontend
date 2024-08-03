// frontend\src\components\Pagination.tsx

const Pagination = ({ page, totalPages, setPage }: { page: number, totalPages: number, setPage: (page: number) => void }) => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-8 h-8 rounded-full mx-1 border ${page !== i ? 'bg-gray-100 hover:bg-gray-300 text-gray-700' : 'bg-indigo-500 text-white border-indigo-500'}`}
            >
                {i}
            </button>
        );
    }

    return (
        <div className="flex justify-center mt-4">
            {pages}
        </div>
    );
};

export default Pagination;
