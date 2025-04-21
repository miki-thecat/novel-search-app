// 📄 src/app/page.js

import Link from "next/link";

export default function HomePage() {
  // 仮の小説データ
  const novels = [
    { id: "1", title: "冥王様が通るのですよ！" },
    { id: "2", title: "異世界でスローライフ" },
  ];

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📚 小説一覧</h1>

      <ul className="space-y-4">
        {novels.map((novel) => (
          <li key={novel.id}>
            <Link
              href={`/summary/${novel.id}`}
              className="block bg-gray-100 hover:bg-gray-200 p-4 rounded shadow"
            >
              {novel.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
