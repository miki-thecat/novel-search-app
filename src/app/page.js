// ✅ page.js（ジャンル切替＋ページネーション＋あらすじ表示＋URL確認）
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [ranking, setRanking] = useState([]);
  const [allcount, setAllcount] = useState(0);
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const genreList = [
    { label: "総合", value: "" },
    { label: "ファンタジー", value: "gf" },
    { label: "恋愛", value: "gr" },
    { label: "SF", value: "gsf" },
    { label: "現代", value: "gmod" },
    { label: "ホラー", value: "gho" },
  ];

  useEffect(() => {
    async function fetchRanking() {
      setIsLoading(true);
      try {
        const url = `/api/ranking?genre=${genre}&page=${page}`;
        console.log("📡 リクエストURL:", url);

        const res = await fetch(url);
        if (!res.ok) throw new Error("API呼び出し失敗");
        const data = await res.json();
        setRanking(data.items);
        setAllcount(data.allcount);
      } catch (err) {
        console.error("ランキング取得エラー:", err);
        setRanking([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRanking();
  }, [genre, page]);

  const maxPage = Math.ceil(allcount / 50);

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex flex-wrap gap-2 mb-4">
        {genreList.map((g) => (
          <button
            key={g.value}
            onClick={() => {
              setGenre(g.value);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-full border text-sm ${
              genre === g.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {isLoading && <p className="text-gray-500">読み込み中...</p>}

      <h2 className="text-2xl font-bold border-b pb-2">
        📊 小説家になろう 評価順ランキング（
        {genreList.find((g) => g.value === genre)?.label || "総合"}） Page{" "}
        {page}
      </h2>

      <ul className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        {ranking.map((item) => (
          <li
            key={item.rank}
            className="bg-white border p-4 rounded shadow hover:shadow-md transition"
          >
            <div className="text-sm text-gray-500 mb-1">#{item.rank}</div>
            <Link
              href={`/summary/${item.ncode}`}
              className="text-blue-600 text-base font-semibold hover:underline"
            >
              {item.title}
            </Link>
            <p className="text-sm text-gray-700 mt-1 line-clamp-3">
              {item.story}
            </p>
            <div className="text-xs text-gray-400 mt-2">
              評価pt：{item.pt.toLocaleString()}pt
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className={`px-4 py-2 rounded border ${
            page === 1
              ? "bg-gray-200 text-gray-400"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          ← 前へ
        </button>

        <span className="px-4 py-2 text-sm font-semibold">Page {page}</span>

        <button
          disabled={page >= maxPage}
          onClick={() => setPage((p) => p + 1)}
          className={`px-4 py-2 rounded border ${
            page >= maxPage
              ? "bg-gray-200 text-gray-400"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          次へ →
        </button>
      </div>
    </main>
  );
}
