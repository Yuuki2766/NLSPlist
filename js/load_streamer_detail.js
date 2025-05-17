const params = new URLSearchParams(window.location.search);
const streamerId = params.get('id');

if (!streamerId) {
  document.getElementById('streamer-detail').textContent = '配信者IDが指定されていません。';
} else {
  fetch('data/streamers.json')
    .then(res => {
      if (!res.ok) throw new Error('streamers.jsonの読み込みに失敗しました');
      return res.json();
    })
    .then(data => {
      const streamer = data.find(s => s.id === streamerId);
      if (!streamer) {
        document.getElementById('streamer-detail').textContent = '指定された配信者が見つかりません。';
        return;
      }

      const links = streamer.links || {};
      const container = document.getElementById('streamer-detail');
      container.innerHTML = `
        <h2>${streamer.name}</h2>
        <img src="${streamer.image}" alt="${streamer.name}" style="max-width:300px; border-radius:8px;" />
        <p>${streamer.description}</p>
        <ul>
          ${links.x_main ? `<li>X（メイン）: <a href="${links.x_main}" target="_blank">${links.x_main}</a></li>` : ''}
          ${links.x_sub ? `<li>X（サブ）: <a href="${links.x_sub}" target="_blank">${links.x_sub}</a></li>` : ''}
          ${links.youtube ? `<li>YouTube: <a href="${links.youtube}" target="_blank">${links.youtube}</a></li>` : ''}
          ${links.twitch ? `<li>Twitch: <a href="${links.twitch}" target="_blank">${links.twitch}</a></li>` : ''}
        </ul>

        ${Array.isArray(links.other) && links.other.length > 0 ? `
          <p>その他リンク</p>
          <ul>
            ${links.other.map(link => `
              <li>${link.label}: <a href="${link.url}" target="_blank">${link.url}</a></li>
            `).join('')}
          </ul>
        ` : ''}
      `;
    })
    .catch(error => {
      document.getElementById('streamer-detail').textContent = 'エラーが発生しました。';
      console.error(error);
    });
}
