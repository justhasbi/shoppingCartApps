const modals = document.getElementById('modals');
const floatingButton = document.getElementById('floating_button');
const modalOverlay = document.getElementById('modal_overlay');
const addListForm = document.getElementById('addlist_form');
const root = document.getElementById('root');
const subtitle = document.getElementById('date_now');
const totalPriceElement = document.getElementById('total');
totalPriceElement.innerHTML = 0;
let shoppingCartList = [];

subtitle.innerHTML = new Date().toLocaleDateString();

floatingButton.addEventListener('click', () => {
  if (modals.style.display == 'none') {
    showModals();
    return;
  }

  hideModals();
});

modalOverlay.addEventListener('click', () => {
  if (modals.style.display == 'flex') {
    hideModals();
    return;
  }
});

addListForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let cartObject = {
    id: Date.now(),
    item: e.target.item.value,
    price: e.target.price.value,
    createdAt: new Date().toLocaleString(),
  };

  shoppingCartList.push(cartObject);

  e.target.item.value = '';
  e.target.price.value = '';
  hideModals();
  renderToHTML();
});

const showModals = () => {
  modals.style.display = 'flex';
  floatingButton.style.backgroundColor = 'gray';
  floatingButton.style.transform = 'rotate(45deg)';
};

const hideModals = () => {
  modals.style.display = 'none';
  floatingButton.style.backgroundColor = 'rgb(74, 74, 196)';
  floatingButton.style.transform = 'rotate(0deg)';
};

const renderToHTML = () => {
  root.innerHTML = '';
  let total = 0;
  shoppingCartList.forEach((e, i) => {
    root.innerHTML += `
      <div class="card">
        <small>
          ${e.createdAt}  
        </small>
        <div>
          ${e.item} <span>Rp. ${e.price}</span>
        </div>
        <button onclick="handleDelete(${i})">Done</button>
      </div>
    `;
    total += parseInt(e.price);
  });
  totalPriceElement.innerHTML = total;
};

const handleDelete = (idx) => {
  if (confirm('Are you sure to finish this order?')) {
    shoppingCartList.splice(idx, 1);
    renderToHTML();
  }
};
