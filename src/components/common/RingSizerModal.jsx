import React from 'react';
import { useToast } from '../../context/ToastContext';

export default function RingSizerModal({ isOpen, onClose, selectedSize = "6.0", onSelectSize }) {
  const { showToast } = useToast();

  if (!isOpen) return null;

  const SIZES = [
    { us: "4.5", uk: "I ½", eu: "48.0", diam: "15.3 mm" },
    { us: "5.0", uk: "J ½", eu: "49.3", diam: "15.7 mm" },
    { us: "5.5", uk: "K ½", eu: "50.6", diam: "16.1 mm" },
    { us: "6.0", uk: "L ½", eu: "51.9", diam: "16.5 mm" },
    { us: "6.5", uk: "M ½", eu: "53.1", diam: "16.9 mm" },
    { us: "7.0", uk: "N ½", eu: "54.4", diam: "17.3 mm" },
    { us: "7.5", uk: "O ½", eu: "55.7", diam: "17.7 mm" },
    { us: "8.0", uk: "P ½", eu: "57.0", diam: "18.1 mm" },
    { us: "8.5", uk: "Q ½", eu: "58.3", diam: "18.5 mm" },
    { us: "9.0", uk: "R ½", eu: "59.5", diam: "18.9 mm" }
  ];

  const handleRequestKit = () => {
    showToast("Brass Precision Caliber Sizer Kit Dispatched via Express Post", "success");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="w-full max-w-lg rounded-2xl bg-surface-container-lowest p-6 shadow-2xl space-y-5 border border-surface-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-serif">
              International Ring Sizing Matrix
            </h3>
            <p className="font-body-sm text-[12px] text-on-surface-variant">
              Precision scale conversion for bespoke mounting.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="overflow-x-auto max-h-64 overflow-y-auto">
          <table className="w-full text-left font-label-sm text-[11px] uppercase tracking-wider text-on-surface">
            <thead className="bg-surface-container text-on-surface-variant font-bold sticky top-0">
              <tr>
                <th className="p-2.5 rounded-l">US / Canada</th>
                <th className="p-2.5">UK / Australia</th>
                <th className="p-2.5">EU / ISO</th>
                <th className="p-2.5 rounded-r">Inside Diam (mm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low font-mono">
              {SIZES.map((row) => {
                const isSelected = row.us === selectedSize;
                return (
                  <tr
                    key={row.us}
                    onClick={() => {
                      if (onSelectSize) onSelectSize(row.us);
                    }}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? "bg-surface-container font-bold text-secondary" : "hover:bg-surface-container-low"
                    }`}
                  >
                    <td className="p-2.5 font-bold">
                      {row.us} {isSelected && "(Selected)"}
                    </td>
                    <td className="p-2.5">{row.uk}</td>
                    <td className="p-2.5">{row.eu}</td>
                    <td className="p-2.5">{row.diam}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-surface-container flex items-center justify-between gap-4">
          <div>
            <span className="font-label-sm text-label-sm uppercase font-bold text-primary block">
              Complimentary Ring Sizer Kit
            </span>
            <span className="font-body-sm text-[11px] text-on-surface-variant">
              We express dispatch a physical brass precision caliber ring gauge before casting.
            </span>
          </div>
          <button
            onClick={handleRequestKit}
            className="px-3.5 py-2 rounded bg-primary text-on-primary font-label-sm text-[10px] uppercase tracking-wider font-semibold whitespace-nowrap hover:bg-secondary transition-colors"
            type="button"
          >
            Request Kit Free
          </button>
        </div>
      </div>
    </div>
  );
}
