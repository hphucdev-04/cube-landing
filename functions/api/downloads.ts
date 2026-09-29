interface Env {
  CUBE_STATS?: KVNamespace;
}

const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

export const onRequestGet: PagesFunction<Env> = async (context) => {
  let scriptCount = 0;
  let npmCount = 0;
  const now = Date.now();

  try {
    if (context.env.CUBE_STATS) {
      // 1. Số lượt cài từ script install.ps1 và install.sh
      scriptCount = parseInt((await context.env.CUBE_STATS.get("downloads")) || "0", 10);

      // 2. Số lượt tải từ NPM đã lưu trong KV
      const cachedNpm = parseInt((await context.env.CUBE_STATS.get("npm_downloads")) || "0", 10);
      const lastChecked = parseInt((await context.env.CUBE_STATS.get("npm_last_checked")) || "0", 10);

      // Nếu mới kiểm tra trong vòng 2 tiếng -> Dùng luôn số trong KV, không gọi NPM
      if (now - lastChecked < TWO_HOURS_MS && lastChecked > 0) {
        npmCount = cachedNpm;
      } else {
        // Hết hạn 2 tiếng -> Gọi NPM cập nhật số mới và lưu lại vào KV
        try {
          const res = await fetch("https://api.npmjs.org/downloads/point/last-year/@cube-harness/cli");
          if (res.ok) {
            const data = (await res.json()) as { downloads?: number };
            npmCount = data.downloads || 0;
            await context.env.CUBE_STATS.put("npm_downloads", String(npmCount));
          } else {
            npmCount = cachedNpm;
          }
          await context.env.CUBE_STATS.put("npm_last_checked", String(now));
        } catch {
          npmCount = cachedNpm;
        }
      }
    } else {
      // Fallback khi chạy local (không có KV)
      try {
        const res = await fetch("https://api.npmjs.org/downloads/point/last-year/@cube-harness/cli");
        if (res.ok) {
          const data = (await res.json()) as { downloads?: number };
          npmCount = data.downloads || 0;
        }
      } catch {
        // ignore
      }
    }
  } catch (err) {
    console.error("Downloads counter error:", err);
  }

  const total = scriptCount + npmCount;

  return new Response(
    JSON.stringify({
      total,
      raw: total,
    }),
    {
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=60, s-maxage=60",
        "access-control-allow-origin": "*",
      },
    }
  );
};

