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
survey.onComplete.add(async function (sender) {
  const result = sender.data;
  const uuid = crypto.randomUUID();
  const timestamp = new Date().toISOString();
  const response = await fetch(API_URL + "?action=save-result", {
    method: "POST",

    body: JSON.stringify({
      //   action: "save-result",
      data: {
        uuid: uuid,
        timestamp: timestamp,
        ...result,
      },
    }),
  });
  const r = await response.json();
  console.log("Response status:", r);
  //   console.log(result);
});

survey.onValueChanged.add(saveSurveyData);
survey.onUIStateChanged.add(saveSurveyUIState);
