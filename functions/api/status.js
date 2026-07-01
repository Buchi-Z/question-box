function json(obj){
  return new Response(JSON.stringify(obj), {
    headers:{ "Content-Type":"application/json" }
  });
}

export async function onRequestPost(context){

  const body = await context.request.json();

  const id = body.id;
  const status = body.status;

  if (!["pending","done"].includes(status)) {
    return json({
      success:false,
      error:"非法状态"
    });
  }

  await context.env.DB.prepare(
    `UPDATE questions SET status=? WHERE id=?`
  ).bind(status, id).run();

  return json({ success:true });
}