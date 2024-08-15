import { useState } from 'react';
import { Filter } from '../types';

const useFilters = (onFilterChange: (filters: Filter[]) => void) => {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [localFilters, setLocalFilters] = useState<Filter[]>([]);
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  // Filtreyi ekler
  const addFilter = (value: string, type: Filter['type']) => {
    const newFilter: Filter = { type, value };
    const updatedFilters = [...filters, newFilter];
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Filtreleri üst bileşene gönder
  };

  // Pop-up filtresi değiştiğinde çağrılır
  const handlePopupFilterChange = (header: string, value: string, type: Filter['type']) => {
    const newFilter: Filter = { type, value };
    const updatedLocalFilters = [...localFilters, newFilter];
    setLocalFilters(updatedLocalFilters);
  };

  // Yerel filtreleri uygulama
  const applyFilters = () => {
    const mergedFilters = [...filters, ...localFilters];
    setFilters(mergedFilters);
    onFilterChange(mergedFilters); // Filtreleri üst bileşene gönder
    setLocalFilters([]); // Yerel filtreleri sıfırla
    setShowFilterPopup(false); // Pop-up'ı kapat
  };

  // Belirli bir filtreyi temizler
  const clearFilter = (filterToRemove: Filter) => {
    const updatedFilters = filters.filter(f => f !== filterToRemove);
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Filtreleri üst bileşene gönder

    const updatedLocalFilters = localFilters.filter(f => f !== filterToRemove);
    setLocalFilters(updatedLocalFilters);
  };

  return {
    filters,
    localFilters,
    showFilterPopup,
    setShowFilterPopup,
    addFilter,
    handlePopupFilterChange,
    applyFilters,
    clearFilter,
  };
};

export default useFilters;
