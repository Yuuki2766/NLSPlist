const params = new URLSearchParams(window.location.search);
const streamerId = params.get('id');

const container = document.getElementById('streamer-detail');

if (!streamerId) {
  container.textContent = '配信者IDが指定されていません。';
} else {
  fetch('data/streamers.json')
    .then(res => {
      if (!res.ok) throw new Error('streamers.jsonの読み込みに失敗しました');
      return res.json();
    })
    .then(data => {
      const streamer = data.find(s => s.id === streamerId);
      if (!streamer) {
        container.textContent = '指定された配信者が見つかりません。';
        return;
      }

      const links = streamer.links || {};

      container.innerHTML = `
        <h2>${streamer.name}</h2>
        <img src="${streamer.image}" alt="${streamer.name}" style="max-width:300px; border-radius:8px;" />
        <p>${streamer.description}</p>
        <ul>
          ${links.x_main ? `<li>X（メイン）: <a href="${links.x_main}" target="_blank" rel="noopener noreferrer">${links.x_main}</a></li>` : ''}
          ${links.x_sub ? `<li>X（サブ）: <a href="${links.x_sub}" target="_blank" rel="noopener noreferrer">${links.x_sub}</a></li>` : ''}
          ${links.youtube ? `<li>YouTube: <a href="${links.youtube}" target="_blank" rel="noopener noreferrer">${links.youtube}</a></li>` : ''}
          ${links.twitch ? `<li>Twitch: <a href="${links.twitch}" target="_blank" rel="noopener noreferrer">${links.twitch}</a></li>` : ''}
        </ul>

        ${Array.isArray(links.other) && links.other.length > 0 ? `
          <p>その他リンク</p>
          <ul>
            ${links.other.map(link => `
              <li>${link.label}: <a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.url}</a></li>
            `).join('')}
          </ul>
        ` : ''}
      `;
    })
    .catch(error => {
      container.textContent = 'エラーが発生しました。';
      console.error(error);
    });
}
