function json(obj){
  return new Response(JSON.stringify(obj), {
    headers:{ "Content-Type":"application/json" }
  });
}

export async function onRequestGet(context){

  const url = new URL(context.request.url);

  const page = parseInt(url.searchParams.get("page") || "1");
  const q = url.searchParams.get("q");

  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  let data, count;

  if (q) {

    const like = `%${q}%`;

    data = await context.env.DB.prepare(
      `SELECT * FROM questions
       WHERE question LIKE ?
       ORDER BY
         CASE WHEN status='pending' THEN 0 ELSE 1 END,
         id DESC
       LIMIT ? OFFSET ?`
    ).bind(like, pageSize, offset).all();

    count = await context.env.DB.prepare(
      `SELECT COUNT(*) as total FROM questions
       WHERE question LIKE ?`
    ).bind(like).first();

  } else {

    data = await context.env.DB.prepare(
      `SELECT * FROM questions
       ORDER BY
         CASE WHEN status='pending' THEN 0 ELSE 1 END,
         id DESC
       LIMIT ? OFFSET ?`
    ).bind(pageSize, offset).all();

    count = await context.env.DB.prepare(
      `SELECT COUNT(*) as total FROM questions`
    ).first();
  }

  return json({
    success:true,
    data:data.results,
    pagination:{
      page,
      pageSize,
      total:count.total
    }
  });
}