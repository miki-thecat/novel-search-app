// 📄 src/app/summary/[id]/page.js

export default async function SummaryDetailPage({ params }) {
  const { id: novelId } = await params;

  // 仮の小説データ（通常はAPIやDBから取得予定）
  const dummyData = [
    {
      id: "1",
      title: "冥王様が通るのですよ！",
      summaries: [
        {
          start: 1,
          end: 5,
          user: "ミキ",
          text: "冥界に転生した社畜が、冥王として目覚める物語。",
        },
        {
          start: 6,
          end: 10,
          user: "ナナ",
          text: "仲間と出会い、冒険が本格化する章。",
        },
      ],
    },
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

  // IDに一致する小説を探す
  const novel = dummyData.find((n) => n.id === novelId);

  // 見つからなければ「Not Found」表示
  if (!novel) {
    return <p className="p-6 text-red-600">作品が見つかりません。</p>;
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{novel.title}</h1>
      <p className="text-gray-600 mb-6">作品ID: {novel.id}</p>

      <h2 className="text-xl font-semibold mb-2">📝 投稿された要約</h2>
      {novel.summaries.length === 0 ? (
        <p className="text-gray-500">まだ要約が投稿されていません。</p>
      ) : (
        <ul className="space-y-4">
          {novel.summaries.map((summary, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded shadow">
              <div className="text-sm text-gray-700 mb-1">
                第{summary.start}〜{summary.end}話・投稿者：{summary.user}
              </div>
              <div>{summary.text}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
