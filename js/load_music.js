fetch("data/video_list.json")
  .then(response => response.json())
  .then(videos => {
    const musicGrid = document.getElementById("music-videos");
    musicGrid.innerHTML = "";

    videos.forEach(video => {
      const card = document.createElement("div");
      card.className = "video-card";

      if (video.group === "A") {
        // Aグループ: iframe埋め込み + タイトルリンク付き
        card.innerHTML = `
          <iframe width="300" height="170" src="https://www.youtube.com/embed/${video.id}" 
            title="${video.title}" frameborder="0" allowfullscreen></iframe>
          <h3><a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener noreferrer">${video.title}</a></h3>
        `;
      } else {
        // Bグループ: サムネクリックでYouTubeへ + タイトルにもリンク付き
        const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
        card.innerHTML = `
          <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener noreferrer">
            <img src="${thumbnailUrl}" alt="${video.title}" />
          </a>
          <h3><a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener noreferrer">${video.title}</a></h3>
        `;
      }

      musicGrid.appendChild(card);
    });
  });
