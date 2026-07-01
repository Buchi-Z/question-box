const ipMap = new Map();

export async function onRequestPost(context) {
  try {

    // =====================
    // 🧠 IP 获取
    // =====================
    const ip =
      context.request.headers.get("cf-connecting-ip") ||
      "unknown";

    // =====================
    // ⛔ 防刷（10秒）
    // =====================
    const now = Date.now();
    const lastTime = ipMap.get(ip);

    if (lastTime && now - lastTime < 10000) {
      return fail("提交太频繁，请稍后再试");
    }

    ipMap.set(ip, now);

    // =====================
    // 📦 读取数据
    // =====================
    const body = await context.request.json();
    let question = (body.request || "").trim();

    // =====================
    // 🧹 1. 空值
    // =====================
    if (!question) {
      return fail("内容不能为空");
    }

    // =====================
    // 🧹 2. 长度
    // =====================
    if (question.length < 3) {
      return fail("内容太短");
    }

    if (question.length > 2000) {
      return fail("内容过长");
    }

    // =====================
    // 🧹 3. 垃圾词
    // =====================
    const badWords = [
      "http",
      "https",
      "www.",
      "加微信",
      "赚钱",
      "广告",
      "推广",
      "淘宝",
      "代购",
      "赌博"
    ];

    const lower = question.toLowerCase();

    for (const word of badWords) {
      if (lower.includes(word)) {
        return fail("内容包含违规信息");
      }
    }

    // =====================
    // 🧹 4. 重复字符
    // =====================
    if (/^(.)\1{5,}$/.test(question)) {
      return fail("内容异常");
    }

    // =====================
    // 💾 写入 D1 数据库
    // =====================
    await context.env.DB.prepare(
      "INSERT INTO questions (question, status) VALUES (?, 'pending')"
    )
    .bind(question)
    .run();

    return json({
      success: true
    });

  } catch (err) {
    return json({
      success: false,
      error: err.message
    });
  }
}

// =====================
// 工具函数
// =====================
function fail(msg){
  return json({
    success: false,
    error: msg
  });
}

function json(obj){
  return new Response(JSON.stringify(obj), {
    headers: { "Content-Type": "application/json" }
  });
}