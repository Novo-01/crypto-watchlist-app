'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AddCoinForm from '../components/AddCoinForm';

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/coins');
      const data = await response.json();
      setCoins(data);
    } catch (error) {
      console.error('Error fetching coins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCoin = (newCoin) => {
    setCoins([...coins, newCoin]);
  };

  const handleRemove = async (coinId) => {
    try {
      await fetch(`http://localhost:8080/api/coins/${coinId}`, {
        method: 'DELETE',
      });
      setCoins(coins.filter(coin => coin.id !== coinId));
    } catch (error) {
      console.error('Error removing coin:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center space-x-4 mb-8">
        <Link href="/dashboard">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            ダッシュボードへ
          </button>
        </Link>
        <Link href="/search">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            検索ページへ
          </button>
        </Link>
      </div>

      <main className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">仮想通貨ウォッチリスト</h1>
        
        <AddCoinForm onAdd={handleAddCoin} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coins.map(coin => (
            <div key={coin.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{coin.name}</h2>
                  <p className="text-gray-600">{coin.symbol}</p>
                  <p className="text-2xl font-bold mt-2">
                    ${coin.currentPrice.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(coin.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
