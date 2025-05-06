// ✅ src/app/api/search/route.js
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const word = searchParams.get("word");

  const res = await fetch(
    `https://api.syosetu.com/novelapi/api/?out=json&word=${encodeURIComponent(
      word
    )}`
  );
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
