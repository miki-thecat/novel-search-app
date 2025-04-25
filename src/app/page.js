"use client";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar.js";
import Link from "next/link";

export default function HomePage() {
  const [ranking, setRanking] = useState([]);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 🔍 検索実行
  const handleSearch = async (kw) => {
    if (!kw.trim()) return;
    setIsLoading(true);
    try {
      // 👇 自作APIを使って検索
      const res = await fetch(`/api/search?word=${encodeURIComponent(kw)}`);
      const data = await res.json();
      setResults(data.slice(1)); // 先頭のAPI仕様情報を除外
    } catch (err) {
      console.error("検索失敗:", err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 📊 ランキング取得
  useEffect(() => {
    async function fetchRanking() {
      try {
        const res = await fetch("/api/ranking");
        if (!res.ok) throw new Error("API呼び出し失敗");
        const data = await res.json();
        setRanking(data);
      } catch (err) {
        console.error("ランキング取得エラー:", err);
      }
    }

    fetchRanking();
  }, []);

  return (
    <>
      <NavBar onSearch={handleSearch} />
      <main className="max-w-2xl mx-auto p-6 space-y-6">
        {/* 🔍 検索結果 */}
        {isLoading && <p className="text-gray-500">検索中...</p>}
        {results.length > 0 && (
          <>
            <h2 className="text-xl font-bold mt-4 mb-2">🔎 検索結果</h2>
            <ul className="space-y-4">
              {results.map((novel) => (
                <li
                  key={novel.ncode}
                  className="bg-gray-100 p-4 rounded shadow"
                >
                  <h3 className="font-bold">
                    <Link
                      href={`/summary/${novel.ncode}`}
                      className="text-blue-600 underline text-sm"
                    >
                      {novel.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {novel.story}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* 📊 ランキング */}
        <h2 className="text-xl font-bold mt-8 mb-2">
          📊 小説家になろう・週間ランキング
        </h2>
        <ul className="space-y-2">
          {ranking.map((item) => (
            <li key={item.rank} className="bg-white border p-3 rounded shadow">
              <span className="font-bold">#{item.rank}</span>：
              <Link
                href={`/summary/${item.ncode}`}
                className="text-blue-600 underline ml-2"
              >
                {item.title}
              </Link>
              <span className="text-sm text-gray-500">（{item.pt}pt）</span>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
