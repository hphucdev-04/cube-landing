interface Env {
  CUBE_STATS?: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  // Non-blocking counter increment in Cloudflare KV
  try {
    if (context.env.CUBE_STATS) {
      const current = parseInt((await context.env.CUBE_STATS.get("downloads")) || "0", 10);
      await context.env.CUBE_STATS.put("downloads", String(current + 1));
    }
  } catch (err) {
    console.error("KV increment error:", err);
  }

  // Fetch actual install.ps1 from Cloudflare R2 bucket
  const response = await fetch("https://pub-3313f2900e0948b5849dc47c989406ab.r2.dev/install.ps1");
  const scriptContent = await response.text();

  return new Response(scriptContent, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-cache, no-store, must-revalidate",
      "access-control-allow-origin": "*",
    },
  });
};
