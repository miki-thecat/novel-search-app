"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [ranking, setRanking] = useState([]);

  // ✅ ランキングデータを読み込む処理
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
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      {/* 小説リスト */}
      <h1 className="text-2xl font-bold mb-2">📚 小説家になろう の作品一覧</h1>
      <ul className="space-y-2">
        <li className="bg-gray-100 p-4 rounded shadow">異世界でスローライフ</li>
        <li className="bg-gray-100 p-4 rounded shadow">
          ダークエルフの王女は働きたくない
        </li>
      </ul>

      {/* ランキング */}
      <h2 className="text-xl font-bold mt-8 mb-2">
        📊 小説家になろう・週間ランキング
      </h2>
      <ul className="space-y-2">
        {ranking.map((item) => (
          <li key={item.rank} className="bg-white border p-3 rounded shadow">
            <span className="font-bold">#{item.rank}</span>：
            <Link
              href={`https://ncode.syosetu.com/${item.ncode}`}
              target="_blank"
              className="text-blue-600 underline ml-2"
            >
              {item.ncode}
            </Link>{" "}
            <span className="text-sm text-gray-500">（{item.pt}pt）</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
