export async function onRequestGet(context) {
  return new Response(JSON.stringify({
    debug: true,
    hasDB: !!context.env.DB
  }));
}