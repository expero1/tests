function renderResults(results, scores) {
  let html = `
			<table border="1" cellpadding="8" cellspacing="0" width="100%">
            <tr>
                <td><b>Військове звання</b></td>
                <td>${results || ""}</td>
            </tr>

            <tr>
                <td><b>Прізвище</b></td>
                <td>${state.meta.lastname || ""}</td>
            </tr>

            <tr>
                <td><b>Дата</b></td>
                <td>${state.meta.date || ""}</td>
            </tr>

            <tr>
                <td><b>Підрозділ</b></td>
                <td>${state.meta.unit || ""}</td>
            </tr>
			</table>
        <table border="1" cellpadding="10" cellspacing="0" width="100%">
            <tr>
                <th>Критерій</th>
                <th>Бали</th>
                <th>Результат</th>
            </tr>
    `;

  for (const criterion in results) {
    html += `
            <tr>
                <td>${criterion}</td>
                <td>${scores[criterion] ?? 0}</td>
                <td>${results[criterion]}</td>
            </tr>
        `;
  }

  html += `</table>`;

  return html;
}

function calculateScores(answers, scoring) {
  const results = {};

  scoring.forEach((scale) => {
    let score = 0;

    // Перевірка YES
    scale.yes.forEach((questionNumber) => {
      const answer = answers[questionNumber - 1];

      if (answer === true) {
        score++;
      }
    });

    // Перевірка NO
    scale.no.forEach((questionNumber) => {
      const answer = answers[questionNumber - 1];

      if (answer === false) {
        score++;
      }
    });

    results[scale.name] = score;
  });

  return results;
}

function interpretAllScores(scores, interpretation) {
  const results = {};

  for (const scaleName in scores) {
    const score = scores[scaleName];
    const interpretationTable = interpretation[scaleName];

    results[scaleName] = interpretScore(score, interpretationTable);
  }

  return results;
}

function interpretScore(score, interpretationTable) {
  for (const item of interpretationTable) {
    if (score >= item.min && score <= item.max) {
      return item.text;
    }
  }

  return "Немає інтерпретації";
}
