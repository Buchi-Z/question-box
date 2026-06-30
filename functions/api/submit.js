export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    const content = body.request;
    const email = body.email || null;

    // ⚠️ 关键：DB 必须已绑定
    await context.env.DB.prepare(
      "INSERT INTO requests (content, email) VALUES (?, ?)"
    )
    .bind(content, email)
    .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: "saved"
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}