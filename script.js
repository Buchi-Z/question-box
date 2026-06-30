document
.getElementById("requestForm")
.addEventListener("submit", async function(event) {

    event.preventDefault();

    const requestText = document.getElementById("request").value;
    const email = document.getElementById("email").value;
    const imageFile = document.getElementById("image").files[0];

    // 先不处理图片（后面再加）
    const data = {
        request: requestText,
        email: email || null
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
        } else {
            alert("提交失败，请重试");
        }

    } catch (error) {
        console.error(error);
        alert("网络错误");
    }
});