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

    // 🔥 genre一覧を限定（エラー防止）
    const validGenres = [
      "", // 総合
      "gf", // ファンタジー
      "gr", // 恋愛
      "gsf", // SF
      "gmod", // 現代
      "gho", // ホラー
    ];
    if (!validGenres.includes(genre)) {
      return new Response(JSON.stringify({ error: "無効なジャンルです" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 🔗 ランキングデータ取得（ジャンル付き）
    const rtype = `${dateStr}${genre ? `-${genre}` : ""}-w`;
    const res = await fetch(
      `https://api.syosetu.com/rank/rankget/?rtype=${rtype}&out=json`
    );

    // 🔥 ステータスコードチェック
    if (!res.ok) {
      console.error("ランキングAPIエラー:", res.status);
      return new Response(JSON.stringify({ error: "ランキング取得失敗" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 🔥 Content-Typeチェック（JSON以外ならエラー）
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("ランキングAPIのレスポンスがJSONじゃない");
      return new Response(JSON.stringify({ error: "JSON以外のデータ" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const rankingData = await res.json();
    const top10 = rankingData.slice(0, 10);

    if (top10.length === 0) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 🔍 ncode をハイフン区切りで一括取得用に変換
    const ncodes = top10.map((item) => item.ncode).join("-");

    // 🔗 小説の詳細を取得（タイトルなど）
    const novelRes = await fetch(
      `https://api.syosetu.com/novelapi/api/?out=json&ncode=${ncodes}`
    );

    if (!novelRes.ok) {
      console.error("小説詳細APIエラー:", novelRes.status);
      return new Response(JSON.stringify({ error: "小説情報取得失敗" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

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
