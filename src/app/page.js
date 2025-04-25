"use client";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar.js";
import Link from "next/link";

export default function HomePage() {
  const [ranking, setRanking] = useState([]);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genre, setGenre] = useState(""); // ← 🔥ジャンル選択用の状態を追加

  // 🔍 検索実行
  const handleSearch = async (kw) => {
    if (!kw.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/search?word=${encodeURIComponent(kw)}`);
      const data = await res.json();
      setResults(data.slice(1));
    } catch (err) {
      console.error("検索失敗:", err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 📊 ランキング取得（ジャンル切り替え対応）
  useEffect(() => {
    async function fetchRanking() {
      try {
        const res = await fetch(`/api/ranking?genre=${genre}`);
        if (!res.ok) throw new Error("API呼び出し失敗");
        const data = await res.json();
        setRanking(data);
      } catch (err) {
        console.error("ランキング取得エラー:", err);
      }
    }

    fetchRanking();
  }, [genre]); // ← 🔥ジャンルが変更されるたびに再取得！

  // 🔘 ジャンル選択ボタン（表示）
  const genreList = [
    { label: "総合", value: "" },
    { label: "ファンタジー", value: "gf" },
    { label: "恋愛", value: "gr" },
    { label: "SF", value: "gsf" },
    { label: "現代", value: "gmod" },
    { label: "ホラー", value: "gho" },
  ];

  return (
    <>
      <NavBar onSearch={handleSearch} />
      <main className="max-w-2xl mx-auto p-6 space-y-6">
        {/* 🔘 ジャンル選択 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {genreList.map((g) => (
            <button
              key={g.value}
              className={`px-3 py-1 rounded border ${
                genre === g.value ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => setGenre(g.value)}
            >
              {g.label}
            </button>
          ))}
        </div>

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
          📊 小説家になろう・週間ランキング（
          {genreList.find((g) => g.value === genre)?.label}）
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
