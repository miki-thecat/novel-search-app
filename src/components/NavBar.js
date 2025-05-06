"use client";
import { useState } from "react";

export default function NavBar({ onSiteChange, onSearch }) {
  const [keyword, setKeyword] = useState("");

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* 🔰 左上ロゴ */}
        <h1 className="text-lg font-bold text-blue-600">
          <a href="/">novel-search-app</a>
        </h1>

        {/* 🔍 右上検索フォーム */}
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(keyword);
          }}
        >
          <input
            type="text"
            placeholder="小説タイトルを検索"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border rounded px-3 py-1 w-48"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            {" "}
            🔍
          </button>
        </form>
      </div>
    </header>
  );
}
