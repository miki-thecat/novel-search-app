export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const res = await fetch(
    `https://api.syosetu.com/novelapi/api/?out=json&ncode=${id}`
  );
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
