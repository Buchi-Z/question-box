function json(obj){
  return new Response(JSON.stringify(obj), {
    headers:{ "Content-Type":"application/json" }
  });
}

export async function onRequestPost(context){

  const body = await context.request.json();

  const ADMIN_PASSWORD = "draw_request_only";

  if (body.password !== ADMIN_PASSWORD) {
    return json({ success:false });
  }

  return json({
    success:true,
    token:"admin_" + Date.now()
  });
}