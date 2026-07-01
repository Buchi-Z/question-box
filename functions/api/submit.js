function json(obj){
  return new Response(JSON.stringify(obj), {
    headers:{ "Content-Type":"application/json" }
  });
}

function fail(msg){

  let tip = "提交失败";

  if (msg.includes("广告")) tip = "内容可能包含广告信息";
  else if (msg.includes("太短")) tip = "内容太短，再多写一点吧";
  else if (msg.includes("违规")) tip = "内容可能不符合发布规则";
  else if (msg.includes("不能为空")) tip = "还没有填写内容";

  return json({
    success:false,
    error: tip
  });
}

export async function onRequestPost(context){

  const ip =
    context.request.headers.get("cf-connecting-ip") || "unknown";

  const body = await context.request.json();
  const question = (body.request || "").trim();

  if (!question) return fail("内容不能为空");
  if (question.length < 2) return fail("内容太短");
  if (question.length > 2000) return fail("内容过长");

  const lower = question.toLowerCase();

  const badWords = [
    "http","https","www","加微信","赚钱","广告","赌博","代购"
  ];

  for (const w of badWords) {
    if (lower.includes(w)) {
      return fail("违规内容");
    }
  }

  await context.env.DB.prepare(
    `INSERT INTO questions (question, ip, status)
     VALUES (?, ?, 'pending')`
  ).bind(question, ip).run();

  return json({
    success:true,
    message:"已收到你的内容，我会尽快查看"
  });
}