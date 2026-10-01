import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const { showToast } = useToast();

  const toggleCompare = (item) => {
    setCompareList(prev => {
      const exists = prev.some(i => i.id === item.id);
      if (exists) {
        showToast(`Specimen removed from Comparison Tray`, "info");
        return prev.filter(i => i.id !== item.id);
      } else {
        if (prev.length >= 4) {
          showToast(`Maximum 4 specimens can be compared simultaneously`, "info");
          return prev;
        }
        showToast(`Specimen added to Comparison Tray`, "success");
        return [...prev, item];
      }
    });
  };

  const isCompared = (id) => compareList.some(i => i.id === id);

  const clearCompare = () => {
    setCompareList([]);
    showToast(`Comparison Tray cleared`, "info");
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        toggleCompare,
        isCompared,
        clearCompare,
        compareCount: compareList.length,
        isCompareModalOpen,
        setIsCompareModalOpen
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
