export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const password = body.password;

    // 🔐 这里是你的后台密码（改这里）
    const ADMIN_PASSWORD = "draw_request_only";

    if (password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({
        success: false,
        message: "密码错误"
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // 🎫 简单 token（先用轻量版）
    const token = "admin_" + Date.now();

    return new Response(JSON.stringify({
      success: true,
      token: token
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}