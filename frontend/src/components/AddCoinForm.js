'use client';

import { useState } from 'react';

export default function AddCoinForm({ onAdd }) {
  const [symbol, setSymbol] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!symbol.trim()) {
      setError('Please enter a coin symbol');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/coins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbol: symbol.toUpperCase() }),
      });

      if (!response.ok) {
        throw new Error('Failed to add coin');
      }

      const data = await response.json();
      onAdd(data);
      setSymbol('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-4">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter coin symbol (e.g., BTC)"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Coin
        </button>
      </div>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </form>
  );
} 