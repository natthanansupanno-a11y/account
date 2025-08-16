document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.getElementById("article-content");
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id');
  const articles = JSON.parse(localStorage.getItem("articles")) || [];

  if (articleId === null || isNaN(articleId) || !articles[articleId]) {
    contentDiv.innerHTML = `
      <div class="article-card">
          <h2>ไม่พบบทความ</h2>
          <p>ขออภัย, ไม่พบบทความที่คุณกำลังมองหา หรือบทความอาจถูกลบไปแล้ว</p>
      </div>`;
    return;
  }

  const article = articles[articleId];
  contentDiv.innerHTML = `
      <article class="article-card">
        <h2>${article.title}</h2>
        <small><strong>หมวดหมู่:</strong> ${article.category}</small>
        <p>${article.content}</p>
      </article>
  `;
});