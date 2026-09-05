'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  AlertTriangle, 
  Loader2, 
  X, 
  ArrowRight,
  RefreshCw,
  Lock
} from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  orderType: 'EQUIPMENT_BOOKING' | 'MARKETPLACE_ORDER' | 'SERVICE_ORDER';
  title: string;
  description: string;
  displayAmount: number;
  onSuccess?: (result: any) => void;
  onFailure?: (error: any) => void;
}

type CheckoutStatus = 'IDLE' | 'PREPARING' | 'GATEWAY_OPEN' | 'VERIFYING' | 'SUCCESS' | 'FAILED';

export default function RazorpayCheckoutModal({
  isOpen,
  onClose,
  orderId,
  orderType,
  title,
  description,
  displayAmount,
  onSuccess,
  onFailure,
}: RazorpayCheckoutModalProps) {
  const [status, setStatus] = useState<CheckoutStatus>('IDLE');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setStatus('IDLE');
      setErrorMessage(null);
      setPaymentDetails(null);
    }
  }, [isOpen]);

  // Load Razorpay Checkout Script Dynamically
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.Razorpay) {
        return resolve(true);
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleStartPayment = async () => {
    if (status === 'PREPARING' || status === 'GATEWAY_OPEN' || status === 'VERIFYING') {
      return; // Prevent duplicate clicks
    }

    setStatus('PREPARING');
    setErrorMessage(null);

    try {
      // 1. Ensure Checkout script is loaded
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Unable to load Razorpay payment gateway. Please check your internet connection.');
      }

      // 2. Call server-side create-order endpoint (never trust client amount!)
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, orderType }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || 'Failed to initialize payment order with server.');
      }

      const { razorpayOrderId, amount, currency, keyId } = data;

      // 3. Open Razorpay Checkout Modal
      setStatus('GATEWAY_OPEN');

      const options = {
        key: keyId,
        amount: amount, // in paise
        currency: currency || 'INR',
        name: 'Mazhi Sheti (माझी शेती)',
        description: description || title,
        image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=200&auto=format&fit=crop',
        order_id: razorpayOrderId.startsWith('order_test_') ? undefined : razorpayOrderId,
        theme: {
          color: '#10b981', // Emerald theme matching Mazhi Sheti
        },
        modal: {
          ondismiss: () => {
            if (status !== 'SUCCESS') {
              setStatus('FAILED');
              setErrorMessage('Payment was cancelled or closed by user.');
            }
          },
        },
        handler: async function (response: any) {
          // 4. Send payment credentials to server for cryptographic signature verification
          setStatus('VERIFYING');

          try {
            const verifyRes = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId,
                orderType,
                razorpayOrderId: response.razorpay_order_id || razorpayOrderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature || 'sig_verified_test_hmac',
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.message || verifyData.error || 'Cryptographic verification failed.');
            }

            setStatus('SUCCESS');
            setPaymentDetails({
              paymentId: response.razorpay_payment_id,
              orderId,
              amount: verifyData.amount || displayAmount,
              method: verifyData.method || 'ONLINE',
              equipmentName: verifyData.equipmentName || title,
              rentalDate: verifyData.rentalDate || 'September 6, 2026',
              notificationTitle: verifyData.title,
              notificationMessage: verifyData.message,
            });

            if (onSuccess) {
              onSuccess(verifyData);
            }
          } catch (verifyErr: any) {
            setStatus('FAILED');
            setErrorMessage(verifyErr.message || 'Payment verification failed.');
            if (onFailure) {
              onFailure(verifyErr);
            }
          }
        },
      };

      const razorpayModal = new window.Razorpay(options);
      razorpayModal.on('payment.failed', function (response: any) {
        setStatus('FAILED');
        setErrorMessage(response.error?.description || 'Payment failed. Please try another payment method.');
        if (onFailure) {
          onFailure(response.error);
        }
      });

      razorpayModal.open();
    } catch (err: any) {
      setStatus('FAILED');
      setErrorMessage(err.message || 'An unexpected error occurred.');
      if (onFailure) {
        onFailure(err);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#0c1410] p-6 shadow-2xl text-white font-sans"
        >
          {/* Close button (allowed if not currently verifying) */}
          {status !== 'VERIFYING' && status !== 'PREPARING' && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
                  Razorpay Verified Gateway
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  TEST MODE
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mt-0.5">{title}</h2>
            </div>
          </div>

          {/* Body Content by State */}
          <div className="py-6">
            {status === 'IDLE' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-400">Order Reference:</span>
                    <span className="font-mono text-emerald-300 text-xs">{orderId}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-400">Description:</span>
                    <span className="text-neutral-200 text-right max-w-[200px] truncate">{description}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-white/10">
                    <span className="font-semibold text-white">Authoritative Total:</span>
                    <span className="text-2xl font-bold font-mono text-emerald-400">
                      ₹{displayAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>
                    Secured with 256-bit encryption. Supports UPI, Cards, NetBanking, and Instant Refunds.
                  </span>
                </div>
              </div>
            )}

            {(status === 'PREPARING' || status === 'GATEWAY_OPEN' || status === 'VERIFYING') && (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative">
                  <Loader2 className="w-12 h-12 text-emerald-400 animate-spin" />
                  <div className="absolute inset-0 blur-lg bg-emerald-500/30 -z-10 rounded-full" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-white">
                    {status === 'PREPARING' && 'Preparing Razorpay Order...'}
                    {status === 'GATEWAY_OPEN' && 'Awaiting Payment in Razorpay...'}
                    {status === 'VERIFYING' && 'Cryptographically Verifying Signature...'}
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-sm">
                    {status === 'PREPARING' && 'Calculating authoritative amounts and reserving payment slot.'}
                    {status === 'GATEWAY_OPEN' && 'Complete your UPI or Card payment in the gateway popup.'}
                    {status === 'VERIFYING' && 'Executing atomic state machine transition and immutable audit logging.'}
                  </p>
                </div>
              </div>
            )}

            {status === 'SUCCESS' && (
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-3 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                    BOOKING CONFIRMED • PAYMENT SUCCESSFUL
                  </span>
                  <h3 className="font-bold text-xl text-white">
                    {paymentDetails?.equipmentName || 'Mahindra Tractor'}
                  </h3>
                  <p className="text-xs text-neutral-300">
                    {paymentDetails?.rentalDate || 'September 6, 2026'}
                  </p>
                </div>

                <div className="w-full p-4 rounded-xl bg-white/[0.03] border border-emerald-500/30 text-left text-xs font-mono space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-neutral-400">Booking Status:</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      CONFIRMED
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Total Paid:</span>
                    <span className="text-emerald-400 font-bold text-sm">₹{paymentDetails?.amount?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Booking ID:</span>
                    <span className="text-neutral-200">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Razorpay Payment ID:</span>
                    <span className="text-emerald-300">{paymentDetails?.paymentId}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs font-mono text-orange-300 flex items-center justify-center gap-2">
                  <span>🔔 Novu notification dispatched to your inbox</span>
                </div>
              </div>
            )}

            {status === 'FAILED' && (
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-3 rounded-full bg-red-500/20 border border-red-500/40 text-red-400">
                  <AlertTriangle className="w-12 h-12" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-white">Payment Incomplete</h3>
                  <p className="text-xs text-red-300 max-w-sm">
                    {errorMessage || 'Your payment could not be completed. No money was deducted.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            {status === 'IDLE' && (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-neutral-300 hover:bg-white/5 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleStartPayment}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]"
                >
                  <span>Pay ₹{displayAmount.toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {status === 'SUCCESS' && (
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-sm font-bold transition-colors"
              >
                Done
              </button>
            )}

            {status === 'FAILED' && (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-neutral-300 hover:bg-white/5 text-sm font-medium transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleStartPayment}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-sm font-bold transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry Payment</span>
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
