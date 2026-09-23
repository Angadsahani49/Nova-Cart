import React, { useState } from 'react';
import {
  X,
  MapPin,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Home,
  Briefcase
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Address } from '../types/ecommerce';

export const AddressManager: React.FC = () => {
  const {
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    isAddressModalOpen,
    setIsAddressModalOpen
  } = useShop();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [locality, setLocality] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [landmark, setLandmark] = useState('');
  const [type, setType] = useState<'HOME' | 'WORK'>('HOME');
  const [isDefault, setIsDefault] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isAddressModalOpen) return null;

  const openAddForm = () => {
    setEditingAddress(null);
    setName('');
    setPhone('');
    setPincode('560001');
    setLocality('');
    setAddressLine('');
    setCity('Bengaluru');
    setState('Karnataka');
    setLandmark('');
    setType('HOME');
    setIsDefault(addresses.length === 0);
    setFormError('');
    setIsFormOpen(true);
  };

  const openEditForm = (addr: Address) => {
    setEditingAddress(addr);
    setName(addr.name);
    setPhone(addr.phone);
    setPincode(addr.pincode);
    setLocality(addr.locality);
    setAddressLine(addr.addressLine);
    setCity(addr.city);
    setState(addr.state);
    setLandmark(addr.landmark || '');
    setType(addr.type);
    setIsDefault(addr.isDefault);
    setFormError('');
    setIsFormOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !pincode.trim() || !addressLine.trim() || !city.trim()) {
      setFormError('Please fill in all mandatory fields.');
      return;
    }
    if (phone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (editingAddress) {
      updateAddress({
        ...editingAddress,
        name,
        phone,
        pincode,
        locality,
        addressLine,
        city,
        state,
        landmark,
        type,
        isDefault
      });
    } else {
      addAddress({
        name,
        phone,
        pincode,
        locality,
        addressLine,
        city,
        state,
        landmark,
        type,
        isDefault
      });
    }

    setIsFormOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
              Manage Delivery Addresses ({addresses.length})
            </h2>
          </div>
          <button
            onClick={() => setIsAddressModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {!isFormOpen ? (
            <>
              {/* Add New Address Button */}
              <button
                onClick={openAddForm}
                className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-600 bg-blue-50/50 hover:bg-blue-50 text-blue-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add a New Delivery Address</span>
              </button>

              {/* Address List */}
              <div className="space-y-3">
                {addresses.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/30 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="delivery_address"
                            checked={isSelected}
                            onChange={() => setSelectedAddressId(addr.id)}
                            className="mt-1 accent-blue-600"
                          />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-slate-900 text-sm">{addr.name}</span>
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 flex items-center gap-1">
                                {addr.type === 'HOME' ? (
                                  <Home className="w-3 h-3" />
                                ) : (
                                  <Briefcase className="w-3 h-3" />
                                )}
                                <span>{addr.type}</span>
                              </span>
                              {addr.isDefault && (
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                  Default
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed">
                              {addr.addressLine}, {addr.locality && `${addr.locality}, `}
                              {addr.landmark && `Near ${addr.landmark}, `}
                              {addr.city}, {addr.state} -{' '}
                              <strong className="text-slate-900 font-mono">{addr.pincode}</strong>
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              Phone:{' '}
                              <strong className="text-slate-700 font-mono">{addr.phone}</strong>
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditForm(addr);
                            }}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Address"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {addresses.length > 1 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteAddress(addr.id);
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Address"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {!addr.isDefault && (
                        <div className="mt-3 pt-2 border-t border-slate-100 flex justify-end">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDefaultAddress(addr.id);
                            }}
                            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                          >
                            Set as Default Address
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* Add / Edit Form */
            <form onSubmit={handleSaveAddress} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                  {editingAddress ? 'Edit Delivery Address' : 'Add New Delivery Address'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              {formError && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 font-medium">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Angad Sahani"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    10-digit Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl outline-hidden focus:border-blue-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pincode / Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="560001"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl outline-hidden focus:border-blue-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Locality / Area
                  </label>
                  <input
                    type="text"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    placeholder="MG Road, Ashok Nagar"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Flat, House No., Building, Company, Apartment *
                </label>
                <textarea
                  required
                  rows={2}
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder="Flat 402, Prestige Tower, Residency Cross Rd"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City / District *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Bengaluru"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Karnataka"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="Near Trinity Metro"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Address Type Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Address Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="addr_type"
                      checked={type === 'HOME'}
                      onChange={() => setType('HOME')}
                      className="accent-blue-600"
                    />
                    <span>Home (All-day delivery)</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="addr_type"
                      checked={type === 'WORK'}
                      onChange={() => setType('WORK')}
                      className="accent-blue-600"
                    />
                    <span>Work (10 AM - 6 PM delivery)</span>
                  </label>
                </div>
              </div>

              {/* Default checkbox */}
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="rounded accent-blue-600"
                />
                <span>Make this my default delivery address</span>
              </label>

              {/* Submit Buttons */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  {editingAddress ? 'Update Address' : 'Save Address'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2.5 border border-slate-300 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Selected address will be used automatically for all checkouts</span>
          </div>
          <button
            onClick={() => setIsAddressModalOpen(false)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
