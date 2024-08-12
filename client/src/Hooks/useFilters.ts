// src/Hooks/useFilters.ts
import { useState } from 'react';
import { Filter } from '../types';

const useFilters = (onFilterChange: (filters: Record<string, Filter>) => void) => {
  const [filters, setFilters] = useState<Record<string, Filter>>({});
  const [localFilters, setLocalFilters] = useState<Record<string, Filter>>({});
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  const handleFilterChange = (header: string, value: string, type: Filter['type']) => {
    const newFilter: Filter = { type, value };
    const newFilters = { ...filters, [header]: newFilter };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
    
  };

  const handlePopupFilterChange = (header: string, value: string, type: Filter['type']) => {
    const newFilter: Filter = { type, value };
    const newLocalFilters = { ...localFilters, [header]: newFilter };
    setLocalFilters(newLocalFilters);
  };

  const applyFilters = () => {
    setFilters(localFilters);
    onFilterChange(localFilters); // Filtreleri üst bileşene gönder
    setShowFilterPopup(false); // Pop-up'ı kapat
  };

  const clearFilter = (header: string) => {
    const newFilters = { ...filters };
    delete newFilters[header];
    setFilters(newFilters);
    onFilterChange(newFilters); // Filtreleri üst bileşene gönder
  };

  return {
    filters,
    localFilters,
    showFilterPopup, // Bu satırı ekleyin
    setShowFilterPopup, // Bu satırı ekleyin
    handleFilterChange,
    handlePopupFilterChange,
    applyFilters,
    clearFilter,
  };
};

export default useFilters;
