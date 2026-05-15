async function check() {
  const uuid = document.getElementById("uuid").value.trim();

  const resultDiv = document.getElementById("result");

  if (!uuid) {
    resultDiv.innerHTML = "<span class='error'>Please enter UUID</span>";
    return;
  }

  resultDiv.innerHTML = "Loading...";

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
      resultDiv.innerHTML = "<span class='error'>Not found</span>";
    }
  } catch (err) {
    resultDiv.innerHTML = "<span class='error'>API error</span>";

    console.error(err);
  }
}
