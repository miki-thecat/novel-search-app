"use client";
import { useState } from "react";

// ダミーデータ（仮の小説リスト）
const dummyNovels = [
  { id: 1, title: "異世界転生した俺が最強だった件" },
  { id: 2, title: "現実世界で魔法を使う方法" },
  { id: 3, title: "恋と魔法と高校生活" },
  { id: 4, title: "異世界ファンタジー冒険記" },
  { id: 5, title: "サイバーパンク東京2025" },
];

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const filtered = dummyNovels.filter((novel) =>
      novel.title.includes(keyword)
    );
    setResults(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-10 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        小説検索フォーム
      </h1>
      <div className="flex w-full max-w-2xl border border-gray-300 rounded overflow-hidden shadow bg-white mb-6">
        <input
          type="text"
          className="flex-1 px-4 py-3 text-lg focus:outline-none"
          placeholder="キーワードを入力（例：異世界）"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 text-lg font-semibold"
        >
          検索
        </button>
      </div>

      {/* 検索結果表示 */}
      <div className="w-full max-w-2xl">
        {results.length === 0 ? (
          <p className="text-gray-500 text-center">検索結果がありません</p>
        ) : (
          <ul className="space-y-2">
            {results.map((novel) => (
              <li
                key={novel.id}
                className="bg-white shadow-sm rounded p-4 border border-gray-200"
              >
                📘 {novel.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
