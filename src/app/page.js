"use client";
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  // 🔸 選択中の投稿サイト（初期は 'narou'）
  const [selectedSite, setSelectedSite] = useState("narou");

  // 🔸 検索キーワード（まだ使わないけど今後のために）
  const [searchKeyword, setSearchKeyword] = useState("");

  // 🔸 仮の小説データ（投稿サイト別）
  const allNovels = {
    narou: [
      { id: "1", title: "異世界でスローライフ" },
      { id: "2", title: "ダークエルフの王女は働きたくない" },
    ],
    kakuyomu: [
      { id: "3", title: "AIが支配する世界で猫になった話" },
      { id: "4", title: "錬金術師と青い森の魔女" },
    ],
  };

  // 🔸 選択中の小説リストだけを表示
  const novels = allNovels[selectedSite];

  return (
    <main className="max-w-3xl mx-auto p-4">
      {/* 🔰 ナビバー */}
      <header className="bg-white shadow mb-4">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-xl font-bold text-blue-600">
            <a href="/">novel-search-app</a>
          </h1>

          {/* 🔍 検索フォーム（今は表示だけ） */}
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              console.log("検索:", searchKeyword);
            }}
          >
            <input
              type="text"
              placeholder="小説タイトルを検索"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="border px-3 py-1 rounded w-48"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              🔍
            </button>
          </form>
        </div>

        {/* 📚 小説サイト切替ボタン */}
        <nav className="flex gap-4 border-t pt-2 pb-4">
          <button
            onClick={() => setSelectedSite("narou")}
            className={`px-3 py-1 rounded text-sm ${
              selectedSite === "narou"
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "bg-white hover:bg-blue-50"
            }`}
          >
            小説家になろう
          </button>
          <button
            onClick={() => setSelectedSite("kakuyomu")}
            className={`px-3 py-1 rounded text-sm ${
              selectedSite === "kakuyomu"
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "bg-white hover:bg-blue-50"
            }`}
          >
            カクヨム
          </button>
        </nav>
      </header>

      {/* 📖 小説一覧 */}
      <section>
        <h2 className="text-xl font-bold mb-4">
          📚 {selectedSite === "narou" ? "小説家になろう" : "カクヨム"}{" "}
          の作品一覧
        </h2>

        <ul className="space-y-4">
          {novels.map((novel) => (
            <li key={novel.id}>
              <Link
                href={`/summary/${novel.id}`}
                className="block p-4 bg-gray-100 hover:bg-gray-200 rounded shadow"
              >
                {novel.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
