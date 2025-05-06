export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const genre = searchParams.get("genre") || "";
    const page = parseInt(searchParams.get("page") || "1");

    const genreMap = {
      "": "",
      gf: "2",
      gr: "1",
      gsf: "3",
      gmod: "4",
      gho: "6",
    };

    const biggenre = genreMap[genre];
    if (biggenre === undefined || isNaN(page) || page < 1) {
      return new Response(JSON.stringify({ error: "無効なクエリ" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const lim = 50;
    const start = (page - 1) * lim + 1;

    const apiURL = `https://api.syosetu.com/novelapi/api/?out=json&order=hyoka&lim=${lim}&start=${start}${
      biggenre ? `&biggenre=${biggenre}` : ""
    }&of=t-n-s-gp`;

    const res = await fetch(apiURL);
    if (!res.ok) {
      console.error("novelapi取得失敗:", res.status);
      return new Response(JSON.stringify({ error: "取得失敗" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    const allcount = data[0].allcount || 0;
    const novels = data.slice(1);

    const result = novels.map((item, index) => ({
      rank: start + index,
      ncode: item.ncode,
      title: item.title,
      story: item.story,
      pt: item.global_point,
    }));

    return new Response(
      JSON.stringify({
        allcount,
        items: result,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("API取得エラー:", error);
    return new Response(JSON.stringify({ error: "サーバーエラー" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
