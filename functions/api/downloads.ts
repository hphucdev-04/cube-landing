interface Env {
  CUBE_STATS?: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  let count = 0;
  try {
    if (context.env.CUBE_STATS) {
      count = parseInt((await context.env.CUBE_STATS.get("downloads")) || "0", 10);
    }
  } catch (err) {
    console.error("KV read error:", err);
  }

  return new Response(
    JSON.stringify({
      total: count,
      raw: count,
    }),
    {
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=10, s-maxage=10",
        "access-control-allow-origin": "*",
      },
    }
  );
};
