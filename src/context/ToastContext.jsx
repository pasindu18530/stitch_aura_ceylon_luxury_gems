import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-primary-container text-surface-container-lowest shadow-2xl border border-secondary/30 backdrop-blur-xl animate-fade-in transition-all">
          <span className="material-symbols-outlined text-[18px] text-secondary-fixed-dim">
            {toast.type === "success" ? "verified" : toast.type === "favorite" ? "favorite" : "info"}
          </span>
          <span className="font-label-md text-label-md tracking-wider uppercase">
            {toast.message}
          </span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-on-primary-container hover:text-surface-container-lowest"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
