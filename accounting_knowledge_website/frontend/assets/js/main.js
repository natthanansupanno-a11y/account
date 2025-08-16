document.addEventListener('DOMContentLoaded', () => {
  const articleList = document.getElementById('article-list');
  const categoryList = document.getElementById('category-list');

  const articles = JSON.parse(localStorage.getItem('articles')) || [];
  const categories = JSON.parse(localStorage.getItem('categories')) || [];

  function renderCategories() {
    categoryList.innerHTML = '';
    if (categories.length === 0) {
      categoryList.innerHTML = '<li>ยังไม่มีหมวดหมู่</li>';
      return;
    }
    const allLi = document.createElement('li');
    allLi.innerHTML = '<a href="#" data-category="all" class="active">ทั้งหมด</a>';
    categoryList.appendChild(allLi);
    categories.forEach(cat => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#" data-category="${cat}">${cat}</a>`;
      categoryList.appendChild(li);
    });
  }

  function renderArticles(filterCategory = 'all') {
    articleList.innerHTML = '';
    if (articles.length === 0) {
      articleList.innerHTML = '<p>ยังไม่มีบทความ</p>';
      return;
    }
    let filtered = filterCategory === 'all' ? articles : articles.filter(a => a.category === filterCategory);
    if (filtered.length === 0) {
      articleList.innerHTML = '<p>ไม่พบบทความในหมวดนี้</p>';
      return;
    }
    filtered.forEach(article => {
      const originalIndex = articles.indexOf(article);
      const div = document.createElement('div');
      div.className = 'article-item';
      
      div.addEventListener('click', () => {
        window.location.href = `article.html?id=${originalIndex}`;
      });

      div.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.content.substring(0, 80)}...</p>
        <small>หมวดหมู่: ${article.category}</small>
      `;
      articleList.appendChild(div);
    });
  }

  categoryList.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      categoryList.querySelectorAll('a').forEach(a => a.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.dataset.category;
      renderArticles(cat);
    }
  });
  renderCategories();
  renderArticles();
});

document.addEventListener('keydown', function(event) {
  if (event.altKey && event.key.toLowerCase() === 'k') {
    event.preventDefault();

    const username = prompt('กรุณากรอก Username');
    if (username === null) return;

    const password = prompt('กรุณากรอก Password');
    if (password === null) return;

    if (username === 'admin' && password === 'admin1234') {
      alert('เข้าสู่ระบบ Admin สำเร็จ');
      window.location.href = '../admin/index.html';
    } else {
      alert('Username หรือ Password ไม่ถูกต้อง');
    }
  }
});

document.addEventListener('keydown', function(event) {
  if (event.altKey && event.key.toLowerCase() === 'k') {
    event.preventDefault();

    const username = prompt('กรุณากรอก Username');
    if (username === null) return;

    const password = prompt('กรุณากรอก Password');
    if (password === null) return;

    if (username === 'admin' && password === 'admin1234') {
      alert('เข้าสู่ระบบ Admin สำเร็จ');
      window.location.href = '../admin/index.html';
    } else {
      alert('Username หรือ Password ไม่ถูกต้อง');
    }
  }
});