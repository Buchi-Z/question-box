export async function onRequestPost(context) {
  try {

    const token = context.request.headers.get("Authorization");

    if (!token || !token.startsWith("admin_")) {
      return new Response(JSON.stringify({
        success: false,
        error: "Unauthorized"
      }));
    }

    const body = await context.request.json();
    const id = body.id;

    await context.env.DB.prepare(
      "DELETE FROM questions WHERE id = ?"
    )
    .bind(id)
    .run();

    return new Response(JSON.stringify({
      success: true
    }));

  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }));
  }
}