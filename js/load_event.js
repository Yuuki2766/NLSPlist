fetch("data/event_list.json")
  .then(response => response.json())
  .then(videos => {
    const eventGrid = document.getElementById("event-videos");
    eventGrid.innerHTML = "";

    videos.forEach(video => {
      const card = document.createElement("div");
      card.className = "video-card";

      if (video.group === "A") {
        card.innerHTML = `
          <iframe width="300" height="170" src="https://www.youtube.com/embed/${video.id}" 
            title="${video.title}" frameborder="0" allowfullscreen></iframe>
          <h3><a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener noreferrer">${video.title}</a></h3>
        `;
      } else if (video.group === "B") {
        const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
        card.innerHTML = `
          <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener noreferrer">
            <img src="${thumbnailUrl}" alt="${video.title}" />
          </a>
          <h3><a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener noreferrer">${video.title}</a></h3>
        `;
      } else if (video.group === "C") {
        // C: 静止画像とリンク付きタイトル
        card.innerHTML = `
          <img src="${video.image}" alt="${video.title}" />
          <h3><a href="${video.link}" target="_blank" rel="noopener noreferrer">${video.title}</a></h3>
        `;
      }

      eventGrid.appendChild(card);
    });
  });
