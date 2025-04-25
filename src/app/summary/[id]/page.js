"use client";
import { use, useState, useEffect } from "react";

export default function NovelSummaryPage({ params }) {
  const { id } = use(params);
  const [novel, setNovel] = useState(null);

  useEffect(() => {
    async function fetchNovel() {
      try {
        const res = await fetch(`/api/novel?id=${id}`); // ✅ 自作APIを使う
        const data = await res.json();
        setNovel(data[1]);
      } catch (err) {
        console.error("小説取得エラー:", err);
      }
    }

    fetchNovel();
  }, [id]);

  if (!novel) return <p>読み込み中...</p>;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{novel.title}</h1>
      <p className="mt-2 text-gray-700">{novel.story}</p>
      <p className="mt-4 text-sm text-gray-500">作者：{novel.writer}</p>
      <a
        href={`https://ncode.syosetu.com/${novel.ncode}/`}
        target="_blank"
        className="text-blue-600 underline text-sm mt-4 inline-block"
      >
        公式ページはこちら →
      </a>
    </main>
  );
}
