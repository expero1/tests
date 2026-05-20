function calculate_dostovirnist(answers) {
  const scores = calculateScores(answers, scoring);
  const results = interpretAllScores(scores, interpretationTable);
  return results;
}

function calculateScores(answers, scoring) {
  let score = 0;
  for (const question_number of scoring.yes) {
    questionName = rawData[question_number - 1];
    answer = answers[questionName];
    if (answer === "Так") {
      score++;
    }
  }
  for (const question_number of scoring.no) {
    questionName = rawData[question_number - 1];
    answer = answers[questionName];
    if (answer === "Ні") {
      score++;
    }
  }
  return score;
}
function interpretScore(score, interpretationTable) {
  for (const entry in interpretationTable) {
    if (
      score >= interpretationTable[entry].min &&
      score <= interpretationTable[entry].max
    ) {
      return {
        value: interpretationTable[entry].text,
        description: interpretationTable[entry].description,
      };
    }
  }
  return "Немає інтерпретації";
}
function interpretAllScores(answers, scores, interpretation) {
  const results = {};
  for (const scaleIndex in scores) {
    const scoreTabel = scores[scaleIndex];
    const name = scoring[scaleIndex].name;
    score = calculateScores(answers, scoring[scaleIndex]);
    const interpretationTable = interpretation[name];
    results[name] = interpretScore(score, interpretation[name]);
  }
  return results;
}

function generateInterpretationHTML(
  commonInfo,
  interpretationResults,
  showDescriptions = false,
) {
  let html = `<table id = "resultTable" border="1" cellpadding="8" cellspacing="0" width="100%">`;
  const common_info_fields = [
    "Військове звання",
    "Прізвище, ім'я та по батькові",
    "Підрозділ",
    "Час заповнення",
  ];
  for (const field of common_info_fields) {
    html += `
	  <tr data-name = "${field}">
    <td><b>${field}</b></td>
    <td>${commonInfo[field] || ""}</td>
  </tr>
  `;
  }

  for (const scaleName in interpretationResults) {
    html += `
      <tr data-name = "${scaleName}">
        <td><b>${scaleName}</b></td>
        <td><p>${interpretationResults[scaleName].value}</p>
        ${showDescriptions && interpretationResults[scaleName].description ? interpretationResults[scaleName].description : ""}</td>
      </tr>
    `;
  }
  html += `</table>`;
  return html;
}
