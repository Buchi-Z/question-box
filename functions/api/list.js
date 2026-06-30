export async function onRequestGet(context) {
  try {
    const result = await context.env.DB.prepare(
      "SELECT * FROM questions ORDER BY created_at DESC"
    ).all();

    return new Response(JSON.stringify({
      success: true,
      data: result.results
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