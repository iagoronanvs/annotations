let selectIndex = 0;

document.addEventListener('DOMContentLoaded', function () {
  updateMenu();
  initializeDocument();

  const page = localStorage.getItem('@ContentEditable:page');

  if (page) {
    document.getElementById('root').innerHTML = page;
  }

  document.getElementById('editable-1').addEventListener('input', function () {
    const titleElement = document.getElementById('editable-1');

    let items = getItems();

    let item = items[selectIndex];

    items[selectIndex] = {
      ...item,
      title: titleElement.innerHTML,
    };

    localStorage.setItem(`@ContentEditable:items`, JSON.stringify(items));

    localStorage.setItem(`@ContentEditable:${item.id}`, document.getElementById('root').innerHTML);

    updateMenu();
  });

  document.getElementById('editable-2').addEventListener('input', function () {
    const item = getItems()[selectIndex];

    console.log(item);

    localStorage.setItem(`@ContentEditable:${item.id}`, document.getElementById('root').innerHTML);
  });
}, false);


const updateMenu = () => {
  var html = ``;
  let items = getItems();

  items.map((item, index) => {
    html += `<div id="${item.id}" class="menu-item" onclick="selectItem('${index}')">${item.title}</div>`;
  });

  const menuItems = document.getElementById('menu-items');
  menuItems.innerHTML = '';
  menuItems.insertAdjacentHTML('beforeend', html);
}

const initializeDocument = (index = 0) => {
  let items = getItems();

  const item = items[index];
  const page = getPage(item.id);

  const root = document.getElementById('root');
  root.innerHTML = '';
  root.insertAdjacentHTML('beforeend', page);

  document.getElementById('editable-1').addEventListener('input', function () {
    const titleElement = document.getElementById('editable-1');

    let items = getItems();

    let item = items[selectIndex];

    items[selectIndex] = {
      ...item,
      title: titleElement.innerHTML,
    };

    localStorage.setItem(`@ContentEditable:items`, JSON.stringify(items));

    localStorage.setItem(`@ContentEditable:${item.id}`, document.getElementById('root').innerHTML);

    updateMenu();
  });

  document.getElementById('editable-2').addEventListener('input', function () {
    const item = getItems()[selectIndex];

    console.log(item);

    localStorage.setItem(`@ContentEditable:${item.id}`, document.getElementById('root').innerHTML);
  });
}

const selectItem = (index) => {
  selectIndex = index;

  initializeDocument(index);
}

const add = () => {
  let items = getItems();

  const newItem = {
    id: `page${items.length + 1}`,
    title: 'Empty document'
  };

  items = [
    ...items,
    newItem,
  ];

  const newPage = `
    <h2 contenteditable id="editable-1">${newItem.title}</h2>
    <div contenteditable id="editable-2">Document Text</div>
  `;

  localStorage.setItem('@ContentEditable:items', JSON.stringify(items));
  localStorage.setItem(`@ContentEditable:${newItem.id}`, newPage);

  updateMenu();
}

const getItems = () => {
  let items = JSON.parse(localStorage.getItem('@ContentEditable:items'));

  if (!items) {
    items = [{
      id: 'page1',
      title: 'Empty document'
    }];
  }

  return items;
}

const getPage = (pageId) => {
  let page = localStorage.getItem(`@ContentEditable:${pageId}`);

  if (!page) {
    page = `
      <h2 contenteditable id="editable-1">Empty document</h2>
      <div contenteditable id="editable-2">Document Text</div>
    `;
  }

  return page;
}

const remove = () => {
  const items = getItems();

  const item = items[selectIndex];

  localStorage.removeItem(`@ContentEditable:${item.id}`);

  items.splice(selectIndex, 1);

  console.log(items);

  localStorage.setItem('@ContentEditable:items', JSON.stringify(items));

  updateMenu();
  initializeDocument();
}
