const nolimit = document.getElementById('nolimit-group');
const shankz = document.getElementById('shankz-group');

if (!nolimit || !shankz) {
  console.error("HTMLに 'nolimit-group' または 'shankz-group' が見つかりません。");
}

fetch('streamers.json')
  .then(response => {
    console.log("レスポンス status:", response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("JSON読み込み成功:", data);
    // 省略（forEachなど元のコード）
  })
  .catch(error => {
    console.error('データ読み込みエラー:', error);
  });
