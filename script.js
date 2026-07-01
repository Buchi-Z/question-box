document
.getElementById("requestForm")
.addEventListener("submit", async function(event) {

    event.preventDefault();

    // 🧠 只保留核心输入
    const requestText = document.getElementById("request").value;

    // 📦 发送数据
    const data = {
        request: requestText
    };

    try {

        const res = await fetch("/api/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        console.log("服务器返回：", result);

        if (result.success) {
            alert("提交成功！");
            document.getElementById("request").value = "";
        } else {
            alert("提交失败，请重试");
        }

    } catch (error) {
        console.error(error);
        alert("网络错误");
    }
});