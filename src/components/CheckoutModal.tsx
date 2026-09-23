import React, { useState } from 'react';
import {
  X,
  MapPin,
  Truck,
  CreditCard,
  QrCode,
  Building,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    deliveryCharge,
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    setIsAddressModalOpen,
    placeOrder,
    currentUser,
    setIsAuthModalOpen
  } = useShop();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [deliverySpeed, setDeliverySpeed] = useState<'STANDARD' | 'EXPRESS'>('EXPRESS');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NETBANKING' | 'COD'>('UPI');

  // Form states for Payment Gateways
  const [upiId, setUpiId] = useState('angadsahani@oksbi');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('842');
  const [cardName, setCardName] = useState('Angad Sahani');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [captchaInput, setCaptchaInput] = useState('');
  const captchaTarget = '7492';

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  if (!isCheckoutModalOpen) return null;

  const activeAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];
  const speedFee = deliverySpeed === 'EXPRESS' ? 99 : 0;
  const finalDeliveryCharge = deliveryCharge + speedFee;
  const grandTotal = Math.max(0, cartSubtotal - cartDiscount + finalDeliveryCharge);

  const formatPrice = (amt: number) => '₹' + amt.toLocaleString('en-IN');

  const handleCompleteOrder = () => {
    setPaymentError('');

    // Validation per payment method
    if (paymentMethod === 'UPI' && !upiId.includes('@')) {
      setPaymentError('Please enter a valid UPI ID (e.g. name@bank)');
      return;
    }
    if (paymentMethod === 'CARD' && (cardCvv.length < 3 || !cardName.trim())) {
      setPaymentError('Please enter valid card details and CVV');
      return;
    }
    if (paymentMethod === 'COD' && captchaInput.trim() !== captchaTarget) {
      setPaymentError(`Incorrect Captcha code. Please enter ${captchaTarget} to confirm COD.`);
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCheckoutModalOpen(false);
      placeOrder({
        paymentMethod,
        deliverySpeed
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header with Step Tracker */}
        <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
              Secure Checkout
            </span>
            <h2 className="text-lg font-bold text-slate-900 font-['Space_Grotesk']">
              Complete Your Purchase
            </h2>
          </div>

          {/* Stepper Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium cursor-pointer ${
                step === 1 ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
              <span>Address</span>
            </button>
            <span className="text-slate-300">›</span>

            <button
              onClick={() => setStep(2)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium cursor-pointer ${
                step === 2 ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span>
              <span>Delivery</span>
            </button>
            <span className="text-slate-300">›</span>

            <button
              onClick={() => setStep(3)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium cursor-pointer ${
                step === 3 ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span>
              <span>Payment</span>
            </button>
          </div>

          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            title="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1">
          {/* Main Form Area */}
          <div className="lg:col-span-7 p-6 border-r border-slate-200 overflow-y-auto space-y-6">
            {/* Step 1: Select Delivery Address */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-['Space_Grotesk']">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>Select Delivery Address</span>
                  </h3>
                  <button
                    onClick={() => setIsAddressModalOpen(true)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    + Add New Address
                  </button>
                </div>

                <div className="space-y-3">
                  {addresses.map((addr) => {
                    const isSelected = selectedAddressId === addr.id;
                    return (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="checkout_address"
                            checked={isSelected}
                            onChange={() => setSelectedAddressId(addr.id)}
                            className="mt-1 accent-blue-600"
                          />
                          <div className="text-xs">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-slate-900 text-sm">{addr.name}</span>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                {addr.type}
                              </span>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                              {addr.addressLine}, {addr.locality && `${addr.locality}, `}
                              {addr.city}, {addr.state} -{' '}
                              <strong className="text-slate-900 font-mono">{addr.pincode}</strong>
                            </p>
                            <p className="text-slate-500 mt-1">
                              Mobile: <strong className="text-slate-700 font-mono">{addr.phone}</strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Deliver to this Address</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Choose Delivery Speed */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-['Space_Grotesk']">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>Choose Delivery Speed & Packaging</span>
                  </h3>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    Change Address
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Express Delivery Option */}
                  <div
                    onClick={() => setDeliverySpeed('EXPRESS')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      deliverySpeed === 'EXPRESS'
                        ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery_speed"
                          checked={deliverySpeed === 'EXPRESS'}
                          onChange={() => setDeliverySpeed('EXPRESS')}
                          className="accent-blue-600"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <span>Express Next-Day Guaranteed</span>
                            <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-semibold">
                              Fastest
                            </span>
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Delivers Tomorrow by 11:00 AM · Priority logistics dispatch
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-900 font-mono">₹99</span>
                    </div>
                  </div>

                  {/* Standard Delivery Option */}
                  <div
                    onClick={() => setDeliverySpeed('STANDARD')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      deliverySpeed === 'STANDARD'
                        ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery_speed"
                          checked={deliverySpeed === 'STANDARD'}
                          onChange={() => setDeliverySpeed('STANDARD')}
                          className="accent-blue-600"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Standard Delivery</p>
                          <p className="text-[11px] text-slate-500">
                            Delivers in 2-3 Business Days · Safe contact-free packaging
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 font-mono">FREE</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 border border-slate-300 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method Gateways */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-['Space_Grotesk']">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span>Select Payment Gateway</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">100% Encrypted</span>
                </div>

                {paymentError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                    {paymentError}
                  </div>
                )}

                {/* Gateway Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'UPI'
                        ? 'border-blue-600 bg-blue-50/60 font-bold text-blue-700 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <QrCode className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                    <span className="text-xs block">UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CARD')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'CARD'
                        ? 'border-blue-600 bg-blue-50/60 font-bold text-blue-700 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                    <span className="text-xs block">Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('NETBANKING')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'NETBANKING'
                        ? 'border-blue-600 bg-blue-50/60 font-bold text-blue-700 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Building className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                    <span className="text-xs block">NetBanking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'COD'
                        ? 'border-blue-600 bg-blue-50/60 font-bold text-blue-700 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Banknote className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                    <span className="text-xs block">Cash On Del</span>
                  </button>
                </div>

                {/* Gateway Detail Panels */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  {/* UPI Gateway */}
                  {paymentMethod === 'UPI' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800">
                          Instant UPI Apps & Virtual Payment Address
                        </span>
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Zero Fees
                        </span>
                      </div>

                      <div className="flex gap-2">
                        {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                          <div
                            key={app}
                            className="flex-1 p-2 bg-white rounded-lg border border-slate-200 text-center text-xs font-semibold text-slate-700"
                          >
                            {app}
                          </div>
                        ))}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Enter UPI ID / VPA
                        </label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="yourname@bank"
                          className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-hidden focus:border-blue-600 font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {/* Card Gateway */}
                  {paymentMethod === 'CARD' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800">
                          Credit / Debit Card (Visa, Mastercard, RuPay)
                        </span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4532 0000 0000 0000"
                          className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-hidden focus:border-blue-600 font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                            Expiry (MM/YY)
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-hidden focus:border-blue-600 font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                            CVV / CVC
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="123"
                            className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-hidden focus:border-blue-600 font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="Name as printed on card"
                          className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-hidden focus:border-blue-600"
                        />
                      </div>
                    </div>
                  )}

                  {/* NetBanking Gateway */}
                  {paymentMethod === 'NETBANKING' && (
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-slate-800">
                        Select Your Banking Institution
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((bank) => (
                          <button
                            key={bank}
                            type="button"
                            onClick={() => setSelectedBank(bank)}
                            className={`p-2 rounded-lg border text-xs text-left cursor-pointer transition-colors ${
                              selectedBank === bank
                                ? 'border-blue-600 bg-blue-50 font-bold text-blue-700'
                                : 'border-slate-200 bg-white text-slate-700'
                            }`}
                          >
                            {bank}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cash on Delivery Gateway */}
                  {paymentMethod === 'COD' && (
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-slate-800">
                        Pay Cash / UPI upon delivery at your doorstep
                      </p>
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                        To prevent automated bot orders, please enter the anti-bot verification code shown below.
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-900 text-white font-mono font-bold text-sm tracking-widest px-4 py-2 rounded-lg select-none">
                          {captchaTarget}
                        </div>
                        <input
                          type="text"
                          maxLength={4}
                          value={captchaInput}
                          onChange={(e) => setCaptchaInput(e.target.value)}
                          placeholder="Enter 4-digit code"
                          className="text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-hidden focus:border-blue-600 font-mono w-40"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Final Order CTA Button */}
                <div className="pt-2">
                  <button
                    onClick={handleCompleteOrder}
                    disabled={isProcessing}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-400 text-white font-bold text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-emerald-600/20 cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying & Placing Order...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        <span>
                          {paymentMethod === 'COD' ? 'Confirm Order' : 'Pay'} {formatPrice(grandTotal)}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Order Summary & Review */}
          <div className="lg:col-span-5 p-6 bg-slate-50/70 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 font-['Space_Grotesk']">
                Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
              </h3>

              {/* Items Mini List */}
              <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1 mb-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200/80 text-xs"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-contain rounded border border-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 truncate">{item.product.title}</p>
                      <p className="text-slate-400 text-[11px]">
                        Qty: {item.quantity} · {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <span className="font-bold text-slate-900 font-mono tabular-nums">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Selected Delivery Address Preview */}
              {activeAddress && (
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs mb-4">
                  <div className="flex items-center justify-between text-slate-500 mb-1">
                    <span className="font-semibold text-slate-700">Delivery To:</span>
                    <button
                      onClick={() => setStep(1)}
                      className="text-blue-600 hover:text-blue-800 text-[11px] font-semibold cursor-pointer"
                    >
                      Change
                    </button>
                  </div>
                  <p className="font-bold text-slate-900">{activeAddress.name}</p>
                  <p className="text-slate-600 truncate">{activeAddress.addressLine}, {activeAddress.city} - {activeAddress.pincode}</p>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="text-xs space-y-2 text-slate-600 border-t border-slate-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount Savings</span>
                    <span className="font-mono tabular-nums">- {formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery ({deliverySpeed === 'EXPRESS' ? 'Express' : 'Standard'})</span>
                  <span className="font-mono tabular-nums">
                    {finalDeliveryCharge === 0 ? (
                      <span className="text-emerald-600 font-semibold">FREE</span>
                    ) : (
                      formatPrice(finalDeliveryCharge)
                    )}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold text-slate-900">
                  <span>Total Payable</span>
                  <span className="text-base text-blue-600 font-mono tabular-nums">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Security Trust */}
            <div className="pt-4 border-t border-slate-200/80 text-[11px] text-slate-400 space-y-1">
              <p className="flex items-center gap-1.5 text-slate-600 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>NovaCart Safe & Assured Guarantee</span>
              </p>
              <p>Your payment details are strictly processed via ISO/PCI-DSS certified gateway.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
