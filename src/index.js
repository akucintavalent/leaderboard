import './styles/main.css';

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  return response.json();
}

const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', async () => {
  await postData(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/QG3sxOihEfABZTgB6FYu/scores/',
    { user: nameInput.value, score: +scoreInput.value },
  );
  nameInput.value = '';
  scoreInput.value = '';
});

const refreshButton = document.getElementById('refresh');
const scoresUl = document.getElementsByClassName('scores')[0];

const loadScores = async () => {
  scoresUl.innerHTML = '';
  const { result: scores } = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/QG3sxOihEfABZTgB6FYu/scores/')
    .then((response) => response.json());
  scores.sort((a, b) => b.score - a.score).forEach((score) => {
    const li = document.createElement('li');
    li.innerHTML = `${score.user}: ${score.score}`;
    scoresUl.appendChild(li);
  });
};

refreshButton.addEventListener('click', loadScores);
window.onload = loadScores;