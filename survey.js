const survey = new Survey.Model();
survey.locale = "uk";
document.addEventListener("DOMContentLoaded", function () {
  survey.fromJSON(surveyJson);
  restoreSurvey(survey);
  survey.render(document.getElementById("surveyContainer"));
});

function saveSurveyData(survey) {
  window.localStorage.setItem(
    STORAGE_ITEM_DATA_KEY,
    JSON.stringify(survey.data),
  );
}

function saveSurveyUIState(survey) {
  window.localStorage.setItem(
    STORAGE_ITEM_UI_STATE_KEY,
    JSON.stringify(survey.uiState),
  );
}
function restoreSurvey(survey) {
  const prevData = window.localStorage.getItem(STORAGE_ITEM_DATA_KEY) || null;
  if (prevData) {
    const data = JSON.parse(prevData);
    survey.data = data;
  }
  const prevState =
    window.localStorage.getItem(STORAGE_ITEM_UI_STATE_KEY) || null;
  if (prevState) {
    const state = JSON.parse(prevState);
    survey.uiState = state;
  }
}
survey.onCompleting.add(async function (sender, options) {
  sender.completedHtml =
    "<h2>Відправляємо дані...</h2><p>Зачекайте, будь ласка.</p>";
  const result = sender.data;
  const uuid = crypto.randomUUID();
  const timestamp = new Date().toISOString();
  result["Згода на обробку даних"] =
    Array.isArray(result["Згода на обробку даних"]) &&
    result["Згода на обробку даних"].length > 0
      ? result["Згода на обробку даних"][0]
      : false;
  document.surveyResult = {
    "Час заповнення": timestamp,
    "Ключ доступу": uuid,
    ...result,
  };
  console.log("Survey result to be sent:", document.surveyResult);
  try {
    const response = await fetch(API_URL + "?action=save-result", {
      method: "POST",

      body: JSON.stringify({
        //   action: "save-result",
        data: document.surveyResult,
      }),
    });
    const r = await response.json();
    if (r.result === "ok") {
      document.getElementById("surveyContainer").innerHTML =
        ` <div id="completedForm">
	  <h3>Дякуємо за участь у тестуванні! Ваші відповіді успішно збережені.</h3>
	  <p>Якщо ви хочете перевірити свій результат, будь ласка, запишіть цей ключ доступу:</p> <p><strong> 
      ${uuid}
      </strong></p>
	  <p>Ви можете використати цей код для перевірки результату на сторінці <a href="/results.html?uuid=${uuid}">перевірка результату</a>.</p>
	  </div>`;
      document.getElementById("form-error-message")?.remove();
      window.localStorage.removeItem(STORAGE_ITEM_DATA_KEY);
      window.localStorage.removeItem(STORAGE_ITEM_UI_STATE_KEY);
    }
    console.log("Response status:", r);
    //   console.log(result);
  } catch (err) {
    options.allow = false;
    sender.state = "running";
    console.error("Error saving survey data:", err);
    document.getElementById("form-error-message")?.remove();
    const errorElement = document.createElement("div");
    errorElement.id = "form-error-message";
    errorElement.classList.add("error");
    errorElement.innerHTML =
      "<h2>Помилка при відправці даних</h2><p>Збережіть дані в локальний файл та відправте командиру</p><button id='saveLocal' onclick='saveLocalData()'>Зберегти дані</button>";
    document.getElementById("surveyContainer").after(errorElement);

    // document.getElementById("surveyContainer").after().innerHTML =
    //   "<h2 class='error'>Помилка при відправці даних</h2><p>Збережіть дані в локальний файл та відправте командиру</p><button id='saveLocal' onclick='saveLocalData()'>Зберегти дані</button>";
  }
});

function saveLocalData() {
  // const data = survey.data;
  const timestamp = new Date().toISOString();

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet([document.surveyResult]);
  XLSX.utils.book_append_sheet(wb, ws, "Survey Data");
  XLSX.writeFile(wb, `survey-data-${timestamp}.xlsx`);
}
survey.onValueChanged.add(saveSurveyData);
survey.onUIStateChanged.add(saveSurveyUIState);
