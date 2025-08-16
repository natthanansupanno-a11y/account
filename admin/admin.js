document.addEventListener("DOMContentLoaded", function () {
  const categoryInput = document.getElementById("categoryInput");
  const addCategoryBtn = document.getElementById("addCategoryBtn");
  const categoryList = document.getElementById("categoryList");
  const articleForm = document.getElementById("articleForm");
  const articleTitle = document.getElementById("articleTitle");
  const articleCategory = document.getElementById("articleCategory");
  const articleContent = document.getElementById("articleContent");
  const articleList = document.getElementById("articleList");

  const imageUrlInput = document.getElementById("imageUrlInput");
  const addImageUrlBtn = document.getElementById("addImageUrlBtn");
  const triggerImageUploadBtn = document.getElementById("triggerImageUploadBtn");
  const imageFileInput = document.getElementById("imageFileInput");

  let categories = JSON.parse(localStorage.getItem("categories")) || [];
  let articles = JSON.parse(localStorage.getItem("articles")) || [];

  function saveCategories() {
    localStorage.setItem("categories", JSON.stringify(categories));
  }

  function saveArticles() {
    localStorage.setItem("articles", JSON.stringify(articles));
  }

  function renderCategories() {
    categoryList.innerHTML = "";
    articleCategory.innerHTML = '<option value="">เลือกหมวดหมู่</option>';
    categories.forEach((cat, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${cat}
        <button onclick="editCategory(${index})">✏️</button>
        <button onclick="deleteCategory(${index})">🗑️</button>
      `;
      categoryList.appendChild(li);

      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      articleCategory.appendChild(option);
    });
  }

  function renderArticles() {
    articleList.innerHTML = "";
    articles.forEach((article, index) => {
      const div = document.createElement("div");
      div.className = "article-item";
      div.innerHTML = `
        <strong>${article.title}</strong> <br/>
        <em>${article.category}</em>
        <div>${article.content}</div>
        <div class="article-actions">
          <button onclick="editArticle(${index})">แก้ไข</button>
          <button onclick="deleteArticle(${index})">ลบ</button>
        </div>
      `;
      articleList.appendChild(div);
    });
  }

  addCategoryBtn.addEventListener("click", () => {
    const newCategory = categoryInput.value.trim();
    if (newCategory && !categories.includes(newCategory)) {
      categories.push(newCategory);
      saveCategories();
      renderCategories();
      categoryInput.value = "";
    }
  });

  articleForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newArticle = {
      title: articleTitle.value.trim(),
      category: articleCategory.value,
      content: articleContent.value.trim(),
    };

    if (newArticle.title && newArticle.category && newArticle.content) {
      articles.push(newArticle);
      saveArticles();
      renderArticles();
      articleForm.reset();
    }
  });
  
  addImageUrlBtn.addEventListener('click', () => {
    const url = imageUrlInput.value.trim();
    if (url) {
      const imageTag = `\n<img src="${url}" alt="รูปภาพจากลิงก์" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 10px; margin-bottom: 10px;">\n`;
      articleContent.value += imageTag;
      imageUrlInput.value = '';
    } else {
      alert('กรุณาวาง URL ของรูปภาพก่อน');
    }
  });

  triggerImageUploadBtn.addEventListener('click', () => {
    imageFileInput.click();
  });

  imageFileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const imageTag = `\n<img src="${e.target.result}" alt="รูปภาพที่อัปโหลด" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 10px; margin-bottom: 10px;">\n`;
        articleContent.value += imageTag;
      };
      reader.readAsDataURL(file);
    }
  });

  window.editArticle = function (index) {
    const article = articles[index];
    articleTitle.value = article.title;
    articleCategory.value = article.category;
    articleContent.value = article.content;

    articles.splice(index, 1);
    saveArticles();
    renderArticles();
  };

  window.deleteArticle = function (index) {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบบทความนี้?")) {
      articles.splice(index, 1);
      saveArticles();
      renderArticles();
    }
  };

  window.deleteCategory = function (index) {
    const catToDelete = categories[index];
    if (
      confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบหมวดหมู่ "${catToDelete}"?\nบทความในหมวดนี้จะหายไปด้วย!`)
    ) {
      categories.splice(index, 1);
      saveCategories();

      articles = articles.filter((a) => a.category !== catToDelete);
      saveArticles();

      renderCategories();
      renderArticles();
    }
  };

  window.editCategory = function (index) {
    const oldName = categories[index];
    const newName = prompt("ใส่ชื่อหมวดหมู่ใหม่:", oldName);
    if (newName && newName.trim() !== "" && !categories.includes(newName)) {
      categories[index] = newName;

      articles = articles.map((a) =>
        a.category === oldName ? { ...a, category: newName } : a
      );

      saveCategories();
      saveArticles();
      renderCategories();
      renderArticles();
    }
  };

  renderCategories();
  renderArticles();
});