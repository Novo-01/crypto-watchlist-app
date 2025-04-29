'use client';

import { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [watchlist, setWatchlist] = useState([]); // ← ウォッチリスト用stateを追加！

  const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);
      const data = await response.json();
      setSearchResults(data.coins); // coins配列をセット
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleAddToWatchlist = (coin) => {
    // すでに追加されてるコインは重複追加しない
    if (!watchlist.find((item) => item.id === coin.id)) {
      setWatchlist([...watchlist, coin]);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">コイン検索</h1>

      {/* 検索フォーム */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="コイン名を入力（例：bitcoin）"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded-l w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600 transition"
        >
          検索
        </button>
      </div>

      {/* 検索結果 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {searchResults.map((coin) => (
          <div key={coin.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center">
            <img src={coin.thumb} alt={coin.name} className="w-16 h-16 mb-4" />
            <h2 className="text-xl font-semibold">{coin.name}</h2>
            <p className="text-gray-500">{coin.symbol}</p>
            <button
              onClick={() => handleAddToWatchlist(coin)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              ウォッチリストに追加
            </button>
          </div>
        ))}
      </div>

      {/* ウォッチリスト表示 */}
      <div>
        <h2 className="text-2xl font-bold mb-4">ウォッチリスト</h2>
        <ul className="bg-white rounded-xl shadow-md p-6 space-y-2">
          {watchlist.map((coin) => (
            <li key={coin.id} className="flex items-center space-x-4">
              <img src={coin.thumb} alt={coin.name} className="w-8 h-8" />
              <span className="font-semibold">{coin.name} ({coin.symbol.toUpperCase()})</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
