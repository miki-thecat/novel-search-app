"use client"; // クライアント側で実行するために必要（useStateなどを使うため）

import { useState } from "react";

export default function SummarySharePage() {
  // 投稿された要約リストを保持する状態
  const [summaries, setSummaries] = useState([]);

  // フォーム入力値（話数・投稿者名・要約テキスト）
  const [startChapter, setStartChapter] = useState("");
  const [endChapter, setEndChapter] = useState("");
  const [userName, setUserName] = useState("");
  const [summaryText, setSummaryText] = useState("");

  // フォームが送信されたときの処理
  const handleSubmit = (e) => {
    e.preventDefault();

    // 新しい投稿オブジェクトを作成
    const newSummary = {
      id: Date.now(), // 一意のID（タイムスタンプ）
      start: startChapter,
      end: endChapter,
      user: userName,
      text: summaryText,
    };

    // 投稿をリストに追加（最新を上に）
    setSummaries([newSummary, ...summaries]);

    // 入力欄をリセット
    setStartChapter("");
    setEndChapter("");
    setUserName("");
    setSummaryText("");
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      {/* ページタイトル */}
      <h1 className="text-2xl font-bold mb-4">📚 小説要約共有ページ</h1>
      <p className="text-gray-700 mb-6">
        仮の小説タイトル：<strong>冥王様が通るのですよ！</strong>
      </p>

      {/* 要約投稿フォーム */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-50 p-4 rounded shadow"
      >
        {/* 話数範囲入力 */}
        <div>
          <label className="block text-sm font-medium">
            範囲（何話〜何話）
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="開始話"
              className="border p-2 rounded w-1/2"
              value={startChapter}
              onChange={(e) => setStartChapter(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="終了話"
              className="border p-2 rounded w-1/2"
              value={endChapter}
              onChange={(e) => setEndChapter(e.target.value)}
              required
            />
          </div>
        </div>

        {/* 投稿者名入力 */}
        <div>
          <label className="block text-sm font-medium">投稿者名</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="例：ミキ"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        {/* 要約テキスト入力 */}
        <div>
          <label className="block text-sm font-medium">要約テキスト</label>
          <textarea
            rows="4"
            className="border p-2 rounded w-full"
            placeholder="本文の要約を書いてください..."
            value={summaryText}
            onChange={(e) => setSummaryText(e.target.value)}
            required
          />
        </div>

        {/* 投稿ボタン */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          投稿する
        </button>
      </form>

      {/* 投稿された要約の一覧 */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">📝 投稿された要約</h2>
        {summaries.length === 0 ? (
          <p className="text-gray-500">まだ投稿はありません。</p>
        ) : (
          <ul className="space-y-4">
            {summaries.map((summary) => (
              <li
                key={summary.id}
                className="border rounded p-4 bg-white shadow"
              >
                <div className="text-sm text-gray-600 mb-1">
                  第{summary.start}話〜{summary.end}話・投稿者：{summary.user}
                </div>
                <div>{summary.text}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
