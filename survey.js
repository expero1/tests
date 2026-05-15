const survey = new Survey.Model(surveyJson);
document.addEventListener("DOMContentLoaded", function () {
  survey.render(document.getElementById("surveyContainer"));
});

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
