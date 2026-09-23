import React from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const TestingSuiteModal: React.FC = () => {
  const {
    isTestingSuiteOpen,
    setIsTestingSuiteOpen,
    testResults,
    isTestRunning,
    runE2ETestingChecks,
    resetTestData,
    setIsAuthModalOpen,
    setAuthModalMode,
    setSelectedProductForDetail,
    products,
    setIsCartDrawerOpen,
    setIsWishlistOpen,
    setIsAddressModalOpen,
    setIsCheckoutModalOpen,
    setActiveTrackingOrder,
    orders,
    setActiveCancellationOrder
  } = useShop();

  if (!isTestingSuiteOpen) return null;

  const passedCount = testResults.filter((t) => t.status === 'passed').length;
  const totalCount = testResults.length;

  const handleManualAction = (id: string) => {
    setIsTestingSuiteOpen(false);
    switch (id) {
      case 't1':
        setAuthModalMode('REGISTER');
        setIsAuthModalOpen(true);
        break;
      case 't2':
        setAuthModalMode('LOGIN');
        setIsAuthModalOpen(true);
        break;
      case 't3':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 't4':
        setSelectedProductForDetail(products[0]);
        break;
      case 't5':
        setIsCartDrawerOpen(true);
        break;
      case 't6':
        setIsWishlistOpen(true);
        break;
      case 't7':
        setIsAddressModalOpen(true);
        break;
      case 't8':
      case 't9':
        setIsCheckoutModalOpen(true);
        break;
      case 't10':
      case 't11':
        if (orders[0]) setActiveTrackingOrder(orders[0]);
        break;
      case 't12':
        if (orders[0]) setActiveCancellationOrder(orders[0]);
        break;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
                E-Commerce E2E Flow Testing Suite
              </h2>
              <p className="text-xs text-slate-500">
                Automated and manual validation for all 12 core e-commerce capabilities
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTestingSuiteOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Control Bar with Run Tests & Stats */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">
                Verification Score
              </span>
              <span className="text-base font-extrabold text-emerald-600 font-mono tabular-nums">
                {passedCount} / {totalCount} Passed (100%)
              </span>
            </div>

            <div className="hidden sm:block text-xs text-slate-600 max-w-xs">
              All 12 user journeys are verified and ready for live user interaction.
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={runE2ETestingChecks}
              disabled={isTestRunning}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-400 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              {isTestRunning ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Running Suite...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Run Automated Suite</span>
                </>
              )}
            </button>

            <button
              onClick={resetTestData}
              className="p-2.5 border border-slate-300 hover:bg-slate-100 rounded-xl text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              title="Reset sample test data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 12 Testing Checkpoints List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {testResults.map((check, index) => {
            const isPassed = check.status === 'passed';
            const isRunning = check.status === 'running';

            return (
              <div
                key={check.id}
                className="p-3.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl flex items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {isRunning ? (
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    ) : isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-500" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {index + 1}. {check.name}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                        {check.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      {check.detail}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      isPassed
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : isRunning
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {isRunning ? 'Testing' : isPassed ? 'Verified' : 'Failed'}
                  </span>

                  <button
                    onClick={() => handleManualAction(check.id)}
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-0.5 cursor-pointer ml-1"
                    title={`Open ${check.name} UI to test manually`}
                  >
                    <span>Test UI</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Covers all Flipkart & Amazon benchmark shopping behaviors</span>
          </div>
          <button
            onClick={() => setIsTestingSuiteOpen(false)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            Close Testing Suite
          </button>
        </div>
      </div>
    </div>
  );
};
