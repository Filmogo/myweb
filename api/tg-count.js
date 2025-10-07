// api/tg-count.js
module.exports = async (req, res) => {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    // ТВОИ ДАННЫЕ (позже лучше вынести в ENV и поменять токен у BotFather)
    const TOKEN  = "8401122739:AAF2fCadBePkgZjd9qvaKqJEog5bo2u1Me8";
    const CHATID = "6154976831";

    const url = `https://api.telegram.org/bot${TOKEN}/getChatMemberCount?chat_id=${encodeURIComponent(CHATID)}`;
    const tgRes = await fetch(url);
    const data = await tgRes.json();

    if (!data.ok) {
      return res.status(502).json({ error: "Telegram API error", details: data });
    }

    // Кэш для edge/CDN Vercel на 60 сек
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json({ count: data.result });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
