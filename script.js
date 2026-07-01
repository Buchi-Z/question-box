document.getElementById("requestForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const btn = document.getElementById("submitBtn");
    const msg = document.getElementById("msg");

    const text = document.getElementById("request").value;

    if(!text){
        msg.innerText = "请填写内容";
        return;
    }

    btn.disabled = true;
    btn.innerText = "提交中...";

    msg.innerText = "";

    try{

        const res = await fetch("/api/submit", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({ request:text })
        });

        const data = await res.json();

        if(data.success){

            msg.style.color = "#2e7d32";
            msg.innerText = data.message || "提交成功";

            document.getElementById("request").value = "";

        }else{

            msg.style.color = "#c62828";
            msg.innerText = data.error || "提交失败";
        }

    }catch(err){

        msg.style.color = "#c62828";
        msg.innerText = "网络错误，请稍后再试";
    }

    btn.disabled = false;
    btn.innerText = "提交";
});