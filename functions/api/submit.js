export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    return new Response(
      JSON.stringify({
        success: true,
        received: body
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