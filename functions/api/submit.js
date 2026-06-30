export async function onRequestPost(context) {

  console.log(context.env.DB); // ⭐ 就加在这里（最上面）

  try {
    const body = await context.request.json();

    const question = body.request;

    await context.env.DB.prepare(
      "INSERT INTO questions (question, answer) VALUES (?, ?)"
    )
    .bind(question, null)
    .run();

    return new Response(JSON.stringify({
      success: true
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