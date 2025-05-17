const nolimit = document.getElementById('nolimit-group');
const shankz = document.getElementById('shankz-group');

if (!nolimit && !shankz) {
  console.error("HTMLに 'nolimit-group' または 'shankz-group' が見つかりません。");
}

function createCard(streamer) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <a href="streamer.html?id=${encodeURIComponent(streamer.id)}">
      <img src="${streamer.image}" alt="${streamer.name}" />
      <h3>${streamer.name}</h3>
    </a>
  `;
  return card;
}

fetch('data/streamers.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    data.forEach((streamer, index) => {
      if (!streamer.id || !streamer.name || !streamer.image) return;
      const groups = Array.isArray(streamer.group) ? streamer.group : [streamer.group];

      if (nolimit && groups.includes('N')) {
        nolimit.appendChild(createCard(streamer));
      }

      if (shankz && groups.includes('S')) {
        shankz.appendChild(createCard(streamer));
      }
    });
  })
  .catch(error => {
    console.error('データ読み込みエラー:', error);
  });
