export async function GET() {
  try {
    // 🔽 最新の火曜日の日付を取得（週間ランキングの仕様）
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceTuesday = (dayOfWeek + 5) % 7; // 火曜 = 2
    today.setDate(today.getDate() - daysSinceTuesday);

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}${mm}${dd}`; // 例: 20250415

    // 🔗 なろうAPIの形式に合わせたリクエスト（週間ランキング）
    const res = await fetch(
      `https://api.syosetu.com/rank/rankget/?rtype=${dateStr}-w&out=json`
    );
    const data = await res.json();

    // 🔙 上位10件を返す
    return new Response(JSON.stringify(data.slice(0, 10)), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("外部API取得エラー:", error);
    return new Response(JSON.stringify({ error: "API取得に失敗しました" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
