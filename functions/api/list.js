export async function onRequestGet(context) {
  try {

    const token = context.request.headers.get("Authorization");

    if (!token || !token.startsWith("admin_")) {
      return new Response(JSON.stringify({
        success: false,
        error: "Unauthorized"
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // 📄 分页参数
    const url = new URL(context.request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    // 📦 数据
    const result = await context.env.DB.prepare(
      "SELECT * FROM questions ORDER BY id DESC LIMIT ? OFFSET ?"
    )
    .bind(pageSize, offset)
    .all();

    return new Response(JSON.stringify({
      success: true,
      data: result.results,
      page: page
    }), {
      headers: {
        "Content-Type": "application/json"
      }
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