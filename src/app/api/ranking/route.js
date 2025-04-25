export async function GET(req) {
  try {
    // 🔽 今日の日付から最新の火曜日を計算
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceTuesday = (dayOfWeek + 5) % 7;
    today.setDate(today.getDate() - daysSinceTuesday);

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}${mm}${dd}`;

    // 🔍 クエリから genre を取得（例: gf, gr, gsf ...）
    const { searchParams } = new URL(req.url);
    const genre = searchParams.get("genre") || ""; // なければ空文字（総合）

    // 🔗 ランキングデータ取得（ジャンル付き）
    const rtype = `${dateStr}${genre ? `-${genre}` : ""}-w`;
    const res = await fetch(
      `https://api.syosetu.com/rank/rankget/?rtype=${rtype}&out=json`
    );
    const rankingData = await res.json();
    const top10 = rankingData.slice(0, 10);

    // 🔍 ncode をハイフン区切りで一括取得用に変換
    const ncodes = top10.map((item) => item.ncode).join("-");

    // 🔗 小説の詳細を取得（タイトルなど）
    const novelRes = await fetch(
      `https://api.syosetu.com/novelapi/api/?out=json&ncode=${ncodes}`
    );
    const novelData = await novelRes.json();
    const novels = novelData.slice(1); // 先頭はAPI仕様情報

    const result = top10.map((item, index) => {
      const match = novels.find((novel) => novel.ncode === item.ncode);
      return {
        rank: index + 1,
        ncode: item.ncode,
        pt: item.pt,
        title: match ? match.title : "タイトル不明",
      };
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API取得エラー:", error);
    return new Response(JSON.stringify({ error: "取得失敗" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
