"use client";
import Link from "next/link";
import { useState } from "react";

export default function SummaryDetailPageClient({ novelId }) {
  const dummyData = [
    {
      id: "2",
      title: "異世界でスローライフ",
      summaries: [
        {
          start: 1,
          end: 3,
          user: "アオイ",
          text: "農業をしながらのんびり暮らす物語の始まり。",
        },
      ],
    },
  ];

  const novel = dummyData.find((n) => n.id === novelId);

  if (!novel) {
    return <p className="p-6 text-red-600">作品が見つかりません。</p>;
  }

  const [summaries, setSummaries] = useState(novel.summaries);
  const [startChapter, setStartChapter] = useState("");
  const [endChapter, setEndChapter] = useState("");
  const [userName, setUserName] = useState("");
  const [summaryText, setSummaryText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSummary = {
      start: Number(startChapter),
      end: Number(endChapter),
      user: userName,
      text: summaryText,
    };

    setSummaries([newSummary, ...summaries]);
    setStartChapter("");
    setEndChapter("");
    setUserName("");
    setSummaryText("");
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <Link href="/" className="text-blue-600 underline mb-4 inline-block">
        ← トップに戻る
      </Link>

      <h1 className="text-2xl font-bold mb-2">{novel.title}</h1>
      <p className="text-gray-600 mb-6">作品ID: {novel.id}</p>

      <h2 className="text-xl font-semibold mb-2">📝 投稿された要約</h2>
      {summaries.length === 0 ? (
        <p className="text-gray-500">まだ要約が投稿されていません。</p>
      ) : (
        <ul className="space-y-4 mb-8">
          {summaries.map((summary, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded shadow">
              <div className="text-sm text-gray-700 mb-1">
                第{summary.start}〜{summary.end}話・投稿者：{summary.user}
              </div>
              <div>{summary.text}</div>
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-xl font-semibold mb-2">✍️ 新しい要約を投稿</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-50 p-4 rounded shadow"
      >
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="開始話数"
            value={startChapter}
            onChange={(e) => setStartChapter(e.target.value)}
            required
            className="border p-2 rounded w-1/2"
          />
          <input
            type="number"
            placeholder="終了話数"
            value={endChapter}
            onChange={(e) => setEndChapter(e.target.value)}
            required
            className="border p-2 rounded w-1/2"
          />
        </div>

        <input
          type="text"
          placeholder="投稿者名"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />

        <textarea
          placeholder="要約テキスト"
          value={summaryText}
          onChange={(e) => setSummaryText(e.target.value)}
          required
          rows={4}
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          投稿する
        </button>
      </form>
    </main>
  );
}
