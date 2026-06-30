const questionBox = document.getElementById("question");

const submitButton = document.getElementById("submitButton");

const message = document.getElementById("message");

submitButton.addEventListener("click", function () {

    if (questionBox.value.trim() === "") {

        message.textContent = "Please enter a question.";

        return;

    }

    message.textContent = "Thank you! Your question has been submitted.";

});