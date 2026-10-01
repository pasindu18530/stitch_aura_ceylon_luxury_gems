import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../context/ToastContext';

export const CheckoutPage = () => {
  const { cart: cartItems, cartTotal, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const { showToast } = useToast();

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('wire');
  const [formData, setFormData] = useState({
    firstName: 'Lord Alistair',
    lastName: 'Vance',
    email: 'alistair.vance@mayfairvault.co.uk',
    phone: '+44 20 7946 0912',
    deliveryType: 'private-residence', // or 'bank-vault'
    addressLine1: '42 Berkeley Square, Mayfair',
    city: 'London',
    postalCode: 'W1J 5AW',
    country: 'United Kingdom',
    bankName: 'Coutts & Co',
    specialInstructions: 'Direct handoff to private security detail required.'
  });

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  const subtotal = cartTotal;
  // Bank wire gives a 2% settlement discount
  const wireDiscount = paymentMethod === 'wire' ? subtotal * 0.02 : 0;
  const finalTotal = subtotal - wireDiscount;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const ref = `SRN-ESCROW-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(ref);
    setOrderComplete(true);
    clearCart();
    showToast(`Order confirmed under reference #${ref}. Escrow account details generated.`, 'success');
  };

  if (orderComplete) {
    return (
      <div className="w-full pt-29 bg-surface font-body-md text-on-surface antialiased min-h-screen">
        <section className="max-w-3xl mx-auto px-6 py-space-xl">
          <div className="bg-surface-container-lowest p-space-xl rounded-xl border border-surface-container-highest/60 shadow-xl space-y-space-lg text-center">
            <div className="w-20 h-20 rounded-full bg-surface-container-low text-secondary flex items-center justify-center mx-auto ring-8 ring-surface-container-low/50">
              <span className="material-symbols-outlined text-[40px]">verified_user</span>
            </div>

            <div className="space-y-1">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                Bank Escrow Allocation Initiated
              </span>
              <h1 className="font-display-md text-headline-lg lg:text-display-md text-primary">
                Acquisition Confirmed
              </h1>
              <p className="font-mono text-secondary font-bold text-xl pt-1">{orderRef}</p>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low text-left space-y-2 text-body-sm border border-surface-container-highest/40">
              <div className="flex justify-between font-semibold text-primary">
                <span>Escrow Trust Account:</span>
                <span className="font-mono">Banque Cantonale de Genève (BCGE)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Beneficiary:</span>
                <span>Serendib Impérial Haute Joaillerie S.A.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">IBAN Reference:</span>
                <span className="font-mono font-medium">CH93 0078 8000 1234 5678 9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Insured Armored Carrier:</span>
                <span>Brink's Global Services (Armored Vault Division)</span>
              </div>
              <div className="flex justify-between border-t border-surface-container-highest pt-2 font-bold text-primary">
                <span>Settlement Total:</span>
                <span className="font-mono text-base">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto">
              A physical cryptographic Bill of Lading and sealed GIA/SSEF certificates have been assigned to your reference. Our Private Vault Master will contact you within 60 minutes for courier scheduling.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-space-xs">
              <a
                href="/account"
                className="px-6 py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-highest hover:text-on-surface transition-colors shadow-md"
              >
                View in Client Dashboard
              </a>
              <button
                onClick={() => window.print()}
                className="px-6 py-3 rounded-lg border border-surface-container-highest text-on-surface font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-low transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                <span>Print Bill of Lading</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full pt-29 bg-surface font-body-md text-on-surface antialiased min-h-screen">
      {/* Header */}
      <section className="w-full bg-surface-container-low py-space-lg px-6 lg:px-12 border-b border-surface-container-highest/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-space-xs text-secondary">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.24em]">
                256-Bit SSL Encrypted Armored Escrow
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary">
              Armored Vault Acquisition Checkout
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-3 font-label-sm text-label-sm uppercase text-on-surface-variant">
            <span>Lloyd's Underwritten</span>
            <span>•</span>
            <span>Swiss Bank Escrow</span>
          </div>
        </div>
      </section>

      {/* Main Checkout Grid */}
      <section className="w-full px-6 lg:px-12 py-space-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-space-xl items-start">
          {/* Form Columns (2) */}
          <div className="lg:col-span-2 space-y-space-lg">
            {/* Step 1: Armored Dispatch Address */}
            <div className="p-space-lg bg-surface-container-lowest rounded-xl border border-surface-container-highest/60 shadow-sm space-y-space-md">
              <div className="flex items-center justify-between border-b border-surface-container-highest pb-space-xs">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-mono text-xs flex items-center justify-center font-bold">1</span>
                  <h3 className="font-headline-sm text-[18px] text-primary font-semibold">
                    Armored Delivery &amp; Vault Custody Address
                  </h3>
                </div>
                <span className="font-label-sm text-[10px] uppercase text-secondary font-bold">
                  Brink's Armored Courier
                </span>
              </div>

              {/* Delivery Type selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryType: 'private-residence' })}
                  className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-all ${
                    formData.deliveryType === 'private-residence'
                      ? 'border-primary bg-surface-container-low ring-1 ring-primary'
                      : 'border-surface-container-highest hover:bg-surface-container-low'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] text-secondary">home</span>
                  <div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface block">Private Estate / Residence</span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">Armored courier with two-guard security protocol.</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryType: 'bank-vault' })}
                  className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-all ${
                    formData.deliveryType === 'bank-vault'
                      ? 'border-primary bg-surface-container-low ring-1 ring-primary'
                      : 'border-surface-container-highest hover:bg-surface-container-low'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] text-secondary">account_balance</span>
                  <div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface block">Designated Bank Safe Deposit</span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">Direct vault-to-vault custodian transfer.</span>
                  </div>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-lg font-body-md text-on-surface focus:outline-none border border-surface-container-highest"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-lg font-body-md text-on-surface focus:outline-none border border-surface-container-highest"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">Email (Encrypted Invoices) *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-lg font-body-md text-on-surface focus:outline-none border border-surface-container-highest"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">Phone (Courier Handshake) *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-lg font-body-md text-on-surface focus:outline-none border border-surface-container-highest"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
                    {formData.deliveryType === 'bank-vault' ? 'Bank Vault Facility & Branch Address *' : 'Delivery Address *'}
                  </label>
                  <input
                    type="text"
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-lg font-body-md text-on-surface focus:outline-none border border-surface-container-highest"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-lg font-body-md text-on-surface focus:outline-none border border-surface-container-highest"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">Country / Territory *</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-lg font-body-md text-on-surface focus:outline-none border border-surface-container-highest"
                  >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="United States">United States</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Payment & Escrow Settlement */}
            <div className="p-space-lg bg-surface-container-lowest rounded-xl border border-surface-container-highest/60 shadow-sm space-y-space-md">
              <div className="flex items-center justify-between border-b border-surface-container-highest pb-space-xs">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-mono text-xs flex items-center justify-center font-bold">2</span>
                  <h3 className="font-headline-sm text-[18px] text-primary font-semibold">
                    Payment Method &amp; Escrow Settlement
                  </h3>
                </div>
                <span className="font-label-sm text-[10px] uppercase text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  2% Discount for Bank Wire
                </span>
              </div>

              <div className="space-y-space-sm">
                {/* Method 1: Bank Wire */}
                <div
                  onClick={() => setPaymentMethod('wire')}
                  className={`p-space-md rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'wire'
                      ? 'border-primary bg-surface-container-low ring-1 ring-primary'
                      : 'border-surface-container-highest hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[24px] text-secondary">account_balance</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md font-semibold text-on-surface">
                            Direct Swiss Bank Wire (BCGE Escrow)
                          </span>
                          <span className="font-label-sm text-[9px] uppercase px-1.5 py-0.5 rounded bg-secondary text-on-secondary font-bold">
                            Save 2%
                          </span>
                        </div>
                        <p className="font-body-sm text-[12px] text-on-surface-variant">
                          Allocated immediately. Swiss banking escrow instructions dispatched via PGP encrypted PDF.
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[20px] text-primary">
                      {paymentMethod === 'wire' ? 'radio_button_checked' : 'radio_button_unchecked'}
                    </span>
                  </div>
                </div>

                {/* Method 2: Encrypted Card */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-space-md rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-primary bg-surface-container-low ring-1 ring-primary'
                      : 'border-surface-container-highest hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[24px] text-secondary">credit_card</span>
                      <div>
                        <span className="font-label-md text-label-md font-semibold text-on-surface block">
                          Centurion / Visa Infinite / Private Client Card
                        </span>
                        <p className="font-body-sm text-[12px] text-on-surface-variant">
                          Tokenized 3D Secure 2.0 authorization with zero liability guarantee.
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[20px] text-primary">
                      {paymentMethod === 'card' ? 'radio_button_checked' : 'radio_button_unchecked'}
                    </span>
                  </div>
                </div>

                {/* Method 3: Crypto Escrow */}
                <div
                  onClick={() => setPaymentMethod('crypto')}
                  className={`p-space-md rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'crypto'
                      ? 'border-primary bg-surface-container-low ring-1 ring-primary'
                      : 'border-surface-container-highest hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[24px] text-secondary">currency_bitcoin</span>
                      <div>
                        <span className="font-label-md text-label-md font-semibold text-on-surface block">
                          Institutional Crypto Escrow (USDT / BTC / ETH)
                        </span>
                        <p className="font-body-sm text-[12px] text-on-surface-variant">
                          Multi-sig corporate vault settlement via BitGo Trust.
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[20px] text-primary">
                      {paymentMethod === 'crypto' ? 'radio_button_checked' : 'radio_button_unchecked'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Ledger & Confirmation */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container-highest/60 shadow-md space-y-space-md">
            <div className="flex items-center justify-between border-b border-surface-container-highest pb-space-sm">
              <h3 className="font-label-lg text-label-lg uppercase tracking-wider text-primary font-bold">
                Acquisition Ledger
              </h3>
              <span className="font-label-sm text-[10px] uppercase px-2 py-0.5 rounded bg-surface-container-low text-on-surface-variant">
                {cartItems.length} Allocations
              </span>
            </div>

            <div className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-start gap-2">
                  <div className="line-clamp-1">
                    <span className="text-on-surface font-semibold">{item.title}</span>
                    <span className="text-[11px] block text-on-surface-variant">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-mono font-medium text-on-surface whitespace-nowrap">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}

              <div className="border-t border-surface-container-highest pt-2 space-y-1.5">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono font-medium text-on-surface">{formatPrice(subtotal)}</span>
                </div>
                {wireDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Wire Settlement Discount (2%):</span>
                    <span className="font-mono">-{formatPrice(wireDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Armored Transport:</span>
                  <span className="font-label-sm text-label-sm uppercase font-bold text-secondary">Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span>Dual Swiss Passports:</span>
                  <span className="font-label-sm text-label-sm uppercase font-bold text-secondary">Included</span>
                </div>
              </div>
            </div>

            <div className="border-t border-surface-container-highest pt-space-sm space-y-1">
              <div className="flex justify-between items-end">
                <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-bold">
                  Final Settlement:
                </span>
                <span className="font-headline-sm text-headline-sm font-bold text-primary font-mono">
                  {formatPrice(finalTotal)}
                </span>
              </div>
              <p className="font-label-sm text-[10px] text-on-surface-variant text-right">
                Underwritten by Lloyd's of London Policy #LL-9182
              </p>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0}
              className="w-full py-4 rounded-lg bg-primary hover:bg-surface-container-highest hover:text-on-surface text-on-primary font-label-md text-label-md uppercase tracking-widest text-center block shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Lock Allocation &amp; Execute Escrow
            </button>

            <div className="pt-space-xs text-center space-y-1 text-on-surface-variant text-[11px]">
              <div className="flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-secondary">lock</span>
                <span>256-Bit SSL End-to-End Encryption</span>
              </div>
              <p>Non-disclosure agreement automatically binds upon confirmation.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
