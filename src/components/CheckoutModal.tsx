import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from '../context/AuthContext';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    const { error } = await stripe.confirmPayment({ elements, confirmParams: { return_url: `${window.location.origin}/success` } });
    if (error) alert(error.message);
    else onSuccess();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe || loading} className="w-full mt-4 bg-emerald-600 text-white p-3 rounded-xl font-bold">
        {loading ? 'Processando...' : 'Pagar Agora'}
      </button>
    </form>
  );
}

export default function CheckoutModal({ isOpen, onClose, amount, onSuccess }: { isOpen: boolean, onClose: () => void, amount: number, onSuccess: () => void }) {
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, email: user.email, userId: user.uid }),
      })
        .then(res => res.json())
        .then(data => setClientSecret(data.clientSecret));
    }
  }, [isOpen, amount, user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-900 p-6 rounded-2xl w-full max-w-md border border-zinc-800">
        <h2 className="text-xl font-bold text-white mb-4">Checkout</h2>
        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm onSuccess={onSuccess} />
          </Elements>
        )}
        <button onClick={onClose} className="mt-4 text-zinc-400 w-full text-center">Cancelar</button>
      </div>
    </div>
  );
}
