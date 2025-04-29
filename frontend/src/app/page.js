'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [newCoinName, setNewCoinName] = useState('');
  const [newCoinSymbol, setNewCoinSymbol] = useState('');
  const [newCoinPrice, setNewCoinPrice] = useState('');

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/coins');
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    };

    fetchCoins();
  }, []);

  const handleRemove = (id) => {
    const updatedCoins = coins.filter((coin) => coin.id !== id);
    setCoins(updatedCoins);
  };

  const handleAdd = () => {
    if (newCoinName && newCoinSymbol && newCoinPrice) {
      const newCoin = {
        id: newCoinName.toLowerCase().replace(/ /g, '-'),
        name: newCoinName,
        symbol: newCoinSymbol.toUpperCase(),
        currentPrice: parseFloat(newCoinPrice)
      };
      setCoins([...coins, newCoin]);
      // 入力フィールドをクリア
      setNewCoinName('');
      setNewCoinSymbol('');
      setNewCoinPrice('');
    }
  };

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
        
        {/* 新しいコインを追加するフォーム */}
        <div className="mb-8 max-w-md mx-auto bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">新しいコインを追加</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={newCoinName}
              onChange={(e) => setNewCoinName(e.target.value)}
              placeholder="コイン名"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={newCoinSymbol}
              onChange={(e) => setNewCoinSymbol(e.target.value)}
              placeholder="シンボル（例：BTC）"
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              value={newCoinPrice}
              onChange={(e) => setNewCoinPrice(e.target.value)}
              placeholder="価格（USD）"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleAdd}
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              追加
            </button>
          </div>
        </div>

        {coins.length === 0 ? (
          <p className="text-center text-gray-500">ウォッチリストにコインがありません</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coins.map((coin) => (
              <div key={coin.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <h2 className="text-2xl font-semibold">{coin.name}</h2>
                <p className="text-gray-500">{coin.symbol}</p>
                <p className="mt-4 text-xl font-bold">${coin.currentPrice}</p>
                <button
                  onClick={() => handleRemove(coin.id)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  削除
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
