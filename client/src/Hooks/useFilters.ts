import { useState } from 'react';
import { Filter, ColumnKey } from '../types';

const useFilters = (onFilterChange: (filters: Filter[]) => void) => {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [localFilters, setLocalFilters] = useState<Filter[]>([]);
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  // Filtreyi ekler
  const addFilter = (Column: ColumnKey, value: string, type: Filter['type']) => {
    const newFilter: Filter = { Column, type, value };
    const updatedFilters = [...filters, newFilter];
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Filtreleri üst bileşene gönder
  };

  // Pop-up filtresi değiştiğinde çağrılır
  const handlePopupFilterChange = (Column: ColumnKey, value: string, type: Filter['type']) => {
    const newFilter: Filter = { Column, type, value };
    setLocalFilters(prev => {
      const existingFilterIndex = prev.findIndex(f => f.Column === Column);
      if (existingFilterIndex !== -1) {
        // Filtre zaten var, güncelle
        const updatedFilters = [...prev];
        updatedFilters[existingFilterIndex] = newFilter;
        return updatedFilters;
      }
      // Filtre yok, ekle
      return [...prev, newFilter];
    });
  };

  // Yerel filtreleri uygulama
  const applyFilters = () => {
    const mergedFilters = [...filters, ...localFilters];
    setFilters(mergedFilters);
    onFilterChange(mergedFilters); // Filtreleri üst bileşene gönder
    setLocalFilters([]); // Yerel filtreleri sıfırla
    setShowFilterPopup(false); // Pop-up'ı kapat
  };

  const AddSelectListItemFilter = (Column: ColumnKey, value: string, type: Filter['type']) => {
    " listbox şeklindeki filtreler buraya gelir burada kontrol edilir sağlanır."
    let mergedFilters: any[];
    const newFilter: Filter = { Column, type, value };

    const existingFilterIndex = filters.findIndex(f => f.Column === Column);
    // eğer ilgili kolonun filtresi yoksa -1 döner. varsa onun indexini döner.

    if (existingFilterIndex === -1) {
      // Filtre yok demektir. ekleyelim.
      mergedFilters = [...filters, newFilter];
    }else{
      // Filtre varmış. güncelle.
      mergedFilters = [...filters];
      mergedFilters[existingFilterIndex] = newFilter;
    }
    setFilters(mergedFilters);
    onFilterChange(mergedFilters); // Filtreleri üst bileşene gönder
  }

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
    AddSelectListItemFilter
  };
};

export default useFilters;
