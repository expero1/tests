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
        "<div><span class='ok'>Результат: </span>" +
        generateInterpretationHTML(
          data.data,
          interpretAllScores(data.data, scoring, interpretation),
        ) +
        "</div>" +
        "<button class='btn btn-success  btn-lg' onclick='exportPDF()'>Завантажити PDF</button>";
    } else {
      resultDiv.innerHTML = "<span class='error'>Результат не знайдено</span>";
    }
  } catch (err) {
    resultDiv.innerHTML = "<span class='error'>Помилка отримання даних</span>";

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

function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.addFileToVFS("Roboto-Regular.ttf", robotoBase64);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  const name =
    document
      .querySelector(
        `#resultTable tr[data-name="Прізвище, ім'я та по батькові"] td:nth-child(2)`,
      )
      ?.textContent.trim() || "result";
  const timestamp = formatLocal(
    document
      .querySelector(
        `#resultTable tr[data-name="Час заповнення"] td:nth-child(2)`,
      )
      ?.textContent.trim() || new Date().toISOString(),
  );
  // 2. set font
  doc.setFont("Roboto");
  doc.autoTable({
    html: "#resultTable",
    styles: {
      font: "Roboto",
      fontStyle: "normal",
    },

    headStyles: {
      font: "Roboto",
    },

    bodyStyles: {
      font: "Roboto",
    },
  });

  doc.save(`${name}-${timestamp}.pdf`);
}
function formatLocal(isoString) {
  const date = new Date(isoString);

  const pad = (n) => String(n).padStart(2, "0");

  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());

  return `${yyyy}-${mm}-${dd}-${hh}-${min}`;
}
