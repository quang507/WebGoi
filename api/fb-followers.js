// Số người theo dõi trang Facebook GÓI, để thẻ Facebook ở chân trang tự cập nhật.
// Biến môi trường trên Vercel (xem docs/facebook-followers.md):
//   FB_PAGE_ID     id trang (61593633389379)
//   FB_PAGE_TOKEN  Page Access Token dài hạn của trang
// Chưa đặt biến hoặc Facebook lỗi thì trả 204, web giữ con số trong thiết kế.
// Kết quả được Vercel cache 1 giờ để không gọi Facebook mỗi lượt xem.

module.exports = async function handler(req, res) {
  const id = process.env.FB_PAGE_ID, token = process.env.FB_PAGE_TOKEN;
  if (!id || !token) return res.status(204).end();
  try {
    const r = await fetch(`https://graph.facebook.com/v21.0/${encodeURIComponent(id)}?fields=followers_count,fan_count&access_token=${encodeURIComponent(token)}`);
    if (!r.ok) return res.status(204).end();
    const d = await r.json();
    const followers = Number(d.followers_count || d.fan_count || 0);
    if (!followers) return res.status(204).end();
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json({ followers });
  } catch (e) {
    return res.status(204).end();
  }
};
