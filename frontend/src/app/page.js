'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/coins', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          mode: 'cors'
        });
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    };

    fetchCoins();
  }, []);

  return (
    <main style={{ padding: '20px' }}>
      <h1>仮想通貨ウォッチリスト</h1>
      {coins.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {coins.map((coin) => (
            <li key={coin.id}>
              {coin.name} ({coin.symbol}): ${coin.currentPrice}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
