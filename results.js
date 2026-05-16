async function check() {
  const uuid = document.getElementById("uuid").value.trim();

  const resultDiv = document.getElementById("result");

  if (!uuid) {
    resultDiv.innerHTML =
      "<span class='error'>Будь ласка, введіть код для доступу до результатів</span>";
    return;
  }

  resultDiv.innerHTML = "Завантаження...";

  try {
    const url =
      API_URL + "?uuid=" + encodeURIComponent(uuid) + "&action=get-result";
    const res = await fetch(url);

    const data = await res.json();

    if (data.status === "ok") {
      resultDiv.innerHTML =
        "<span class='ok'>Result: " +
        generateInterpretationHTML(
          data.data.result,
          interpretAllScores(data.data.result, scoring, interpretation),
        ) +
        "</span>";
    } else {
      resultDiv.innerHTML = "<span class='error'>Результат не знайдено</span>";
    }
  } catch (err) {
    resultDiv.innerHTML = "<span class='error'>Помилка зчитування</span>";

    console.error(err);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("uuid") || null;
  if (token) {
    const a = document.getElementById("uuid");
    a.value = token;
    check();
  }
});
