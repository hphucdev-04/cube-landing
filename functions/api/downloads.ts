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

  // Base milestone seed + real-time downloads
  const baseSeed = 1420;
  const total = baseSeed + count;

  return new Response(
    JSON.stringify({
      total,
      raw: count,
      baseSeed,
    }),
    {
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=30, s-maxage=60",
        "access-control-allow-origin": "*",
      },
    }
  );
};
