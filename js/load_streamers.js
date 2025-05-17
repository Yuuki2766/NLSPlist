fetch('data/streamers.json')
  .then(res => {
    if (!res.ok) throw new Error('JSON読み込み失敗: ' + res.status);
    return res.json();
  })
  .then(data => {
    const nolimit = document.getElementById('nolimit-group');
    const shankz = document.getElementById('shankz-group');

    data.forEach(streamer => {
      const groups = Array.isArray(streamer.group) ? streamer.group : [streamer.group];
      console.log(streamer.name, groups);

      if (groups.includes('N')) {
        console.log('Nに追加:', streamer.name);
        const cardN = createCard(streamer);
        nolimit.appendChild(cardN);
      }
      if (groups.includes('S')) {
        console.log('Sに追加:', streamer.name);
        const cardS = createCard(streamer);
        shankz.appendChild(cardS);
      }
    });
  })
  .catch(err => {
    console.error(err);
  });

function createCard(streamer) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <a href="streamer.html?id=${streamer.id}">
      <img src="${streamer.image}" alt="${streamer.name}" />
      <h3>${streamer.name}</h3>
    </a>
  `;
  return card;
}


// タブ切り替え処理
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.tab-button');
  const groups = document.querySelectorAll('.group-tab');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // ボタンの active クラス切り替え
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // 対応するグループ表示
      groups.forEach(group => {
        group.classList.remove('active');
        if (group.id === button.dataset.target) {
          group.classList.add('active');
        }
      });
    });
  });
});
