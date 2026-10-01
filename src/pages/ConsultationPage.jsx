import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

export const ConsultationPage = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultationType: 'salon',
    location: 'London (Mayfair)',
    date: '',
    timeSlot: '14:00 GMT',
    gemInterest: 'Royal Blue Sapphires (Ratnapura)',
    budgetRange: '$25,000 – $50,000',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date) {
      showToast('Please fill in your name, email, and preferred date.', 'error');
      return;
    }
    const ref = `SRN-SALON-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsSubmitted(true);
    showToast(`Private appointment requested. Reference #${ref}`, 'success');
  };

  return (
    <div className="w-full pt-29 bg-surface font-body-md text-on-surface antialiased">
      {/* Header */}
      <section className="relative w-full bg-surface-container-low py-space-xl px-6 lg:px-12 border-b border-surface-container-highest/60">
        <div className="max-w-4xl mx-auto text-center space-y-space-xs">
          <div className="inline-flex items-center gap-space-xs text-secondary justify-center">
            <span className="material-symbols-outlined text-[16px]">room_service</span>
            <span className="font-label-sm text-label-sm uppercase tracking-[0.28em]">
              Private Salons &amp; Digital Microscopy
            </span>
          </div>
          <h1 className="font-display-lg text-headline-lg lg:text-display-lg text-primary">
            Private Gemological Consultation
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Experience our unheated museum corundum collection in person at our private global salons or via a dedicated 4K stereomicroscopic video broadcast.
          </p>
        </div>
      </section>

      {/* Salons Showcase */}
      <section className="w-full px-6 lg:px-12 py-space-lg bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-space-md">
          {[
            { city: 'London', location: 'Mayfair, Old Bond Street', desc: 'Private suite with European bank vault transit.' },
            { city: 'Geneva', location: 'Rue du Rhône, Banking District', desc: 'Direct transit to SSEF & Gübelin laboratories.' },
            { city: 'Colombo', location: 'Cinnamon Gardens Vault', desc: 'Flagship repository adjoining historic Ratnapura gravels.' },
            { city: 'Dubai', location: 'DIFC Gate Precinct', desc: 'Private collector salon with diplomatic security detail.' }
          ].map(salon => (
            <div key={salon.city} className="p-space-md rounded-xl bg-surface-container-low border border-surface-container-highest/60 space-y-1">
              <span className="font-label-sm text-[10px] text-secondary font-bold uppercase tracking-widest">{salon.city}</span>
              <h3 className="font-headline-sm text-[17px] text-on-surface font-semibold">{salon.location}</h3>
              <p className="font-body-sm text-[12px] text-on-surface-variant">{salon.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="w-full px-6 lg:px-12 py-space-xl">
        <div className="max-w-3xl mx-auto">
          {isSubmitted ? (
            <div className="p-space-xl rounded-xl bg-surface-container-lowest border border-surface-container-highest/60 text-center space-y-space-md shadow-lg">
              <div className="w-16 h-16 rounded-full bg-surface-container-low text-secondary flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[32px]">verified</span>
              </div>
              <div className="space-y-1">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                  Reservation Received
                </span>
                <h2 className="font-headline-lg text-headline-lg text-primary">Appointment Confirmed</h2>
                <p className="font-mono text-secondary font-semibold text-lg">{bookingRef}</p>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
                Our Senior Gemologist will review your request and confirm security clearance and itinerary within 2 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-highest hover:text-on-surface transition-colors"
              >
                Book Another Session
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-space-xl rounded-xl bg-surface-container-lowest border border-surface-container-highest/60 shadow-md space-y-space-lg">
              <div className="space-y-1 border-b border-surface-container-highest/60 pb-space-sm">
                <h2 className="font-headline-sm text-headline-sm text-primary">Reserve Your Showing</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  All requests are held under strict attorney-client style confidentiality.
                </p>
              </div>

              {/* Consultation Format */}
              <div className="space-y-2">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                  Consultation Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, consultationType: 'salon' })}
                    className={`p-space-md rounded-lg border text-left flex items-start gap-3 transition-all ${formData.consultationType === 'salon'
                        ? 'border-primary bg-surface-container-low ring-1 ring-primary'
                        : 'border-surface-container-highest hover:bg-surface-container-low'
                      }`}
                  >
                    <span className="material-symbols-outlined text-[20px] text-secondary">meeting_room</span>
                    <div>
                      <span className="font-label-md text-label-md font-semibold text-on-surface block">In-Person Salon</span>
                      <span className="font-body-sm text-[12px] text-on-surface-variant">Private view room with armored courier transit.</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, consultationType: 'virtual' })}
                    className={`p-space-md rounded-lg border text-left flex items-start gap-3 transition-all ${formData.consultationType === 'virtual'
                        ? 'border-primary bg-surface-container-low ring-1 ring-primary'
                        : 'border-surface-container-highest hover:bg-surface-container-low'
                      }`}
                  >
                    <span className="material-symbols-outlined text-[20px] text-secondary">videocam</span>
                    <div>
                      <span className="font-label-md text-label-md font-semibold text-on-surface block">4K Live Loupe Session</span>
                      <span className="font-body-sm text-[12px] text-on-surface-variant">Real-time microscopic spectroscopy inspection.</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Lord Alistair Vance"
                    className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg font-body-md text-on-surface focus:outline-none border border-surface-container-highest"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg font-body-md text-on-surface focus:outline-none border border-surface-container-highest"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+44 20 7946 0912"
                    className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg font-body-md text-on-surface focus:outline-none border border-surface-container-highest"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">Preferred Salon / Timezone</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg font-body-md text-on-surface focus:outline-none border border-surface-container-highest"
                  >
                    <option value="London (Mayfair)">London (Mayfair)</option>
                    <option value="Geneva (Rue du Rhône)">Geneva (Rue du Rhône)</option>
                    <option value="Colombo (Vault Flagship)">Colombo (Vault Flagship)</option>
                    <option value="Dubai (DIFC)">Dubai (DIFC)</option>
                    <option value="Virtual (Global Remote)">Virtual (Global Remote)</option>
                  </select>
                </div>
              </div>

              {/* Date & Interest */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg font-body-md text-on-surface focus:outline-none border border-surface-container-highest"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">Gemstone Interest</label>
                  <select
                    value={formData.gemInterest}
                    onChange={(e) => setFormData({ ...formData, gemInterest: e.target.value })}
                    className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg font-body-md text-on-surface focus:outline-none border border-surface-container-highest"
                  >
                    <option value="Royal Blue Sapphires (Ratnapura)">Royal Blue Sapphires (Ratnapura)</option>
                    <option value="Padparadscha (King of Ceylon)">Padparadscha (King of Ceylon)</option>
                    <option value="Untreated Ceylon Rubies">Untreated Ceylon Rubies</option>
                    <option value="Rare Chrysoberyl Alexandrite">Rare Chrysoberyl Alexandrite</option>
                    <option value="Bespoke Haute Joaillerie Suite">Bespoke Haute Joaillerie Suite</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
                  Confidential Notes &amp; Specific Carat / Color Requests
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Mention specific certificate requirements (SSEF/Gübelin) or private security details..."
                  className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg font-body-md text-on-surface focus:outline-none border border-surface-container-highest"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-primary hover:bg-surface-container-highest hover:text-on-surface text-on-primary font-label-md text-label-md uppercase tracking-widest shadow-lg transition-all"
              >
                Submit Confidential Request
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
