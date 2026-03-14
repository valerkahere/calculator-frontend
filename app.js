const API_BASE = "https://d4vq4wg0e1.execute-api.eu-west-1.amazonaws.com/dev";

async function calculate(operation) {
  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;

  const resultBox = document.getElementById("result");

  try {
    const response = await fetch(`${API_BASE}/${operation}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        num1: Number(num1),
        num2: Number(num2)
      })
    });

    const data = await response.json();

    if (!response.ok) {
      resultBox.textContent = `Error: ${data.error}`;
      return;
    }

    resultBox.textContent = `${data.num1} ${data.operation} ${data.num2} = ${data.result}`;
  } catch (error) {
    resultBox.textContent = "Error calling API";
  }
}

async function loadHistory() {
  const historyList = document.getElementById("history");
  historyList.innerHTML = "";

  try {
    const response = await fetch(`${API_BASE}/history`);
    const data = await response.json();

    data.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.num1} ${item.operation} ${item.num2} = ${item.result}`;
      historyList.appendChild(li);
    });
  } catch (error) {
    historyList.innerHTML = "<li>Could not load history</li>";
  }
}
