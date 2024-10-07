import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number; // Toplam kayıt sayısını ekleyin
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    totalItems, // Toplam kayıt sayısını al
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange
}) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const itemsPerPageOptions = [5, 10, 20, 50];

    return (
        <div className="flex flex-col md:flex-row items-center justify-between mt-4">
            {/* Sayfa Başına Öğeleri Seçme */}
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
                {itemsPerPageOptions.map(option => (
                    <button
                        key={option}
                        onClick={() => onItemsPerPageChange(option)}
                        className={`px-3 py-1 text-sm font-medium border rounded-md ${
                            option === itemsPerPage
                                ? 'bg-cyan-600 text-white border-cyan-600'
                                : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
    
            {/* Toplam Kayıt Sayısı (Sağa Hizalanmış) */}
            <div className="text-sm text-gray-700 mb-4 md:mb-0">
                <span>Toplam Kayıt: {totalItems}</span>
            </div>
    
            {/* Sayfalama Kontrolleri */}
            <nav className="relative z-0 inline-flex shadow-sm flex-wrap">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-md mr-2 mb-2 md:mr-0 md:mb-0"
                >
                    Önceki
                </button>
    
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium mb-2 md:mb-0 ${
                            page === currentPage
                                ? 'bg-cyan-600 text-white border-cyan-600'
                                : 'bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                        {page}
                    </button>
                ))}
    
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-md"
                >
                    Sonraki
                </button>
            </nav>
        </div>
    );
    
};

export default Pagination;
