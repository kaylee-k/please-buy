//Fetch the items from the JSON file
function loadItems() {
  return fetch('data/data.json')
    .then((response) => response.json())
    .then((json) => json.items);
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map((item) => createHTMLString(item)).join('');
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return ` 
    <li class="item">
        <img src="${item.image}" alt="${item.brand}" class="item__thumbnail" />
         <span class="item__description">${item.devices}, ${item.capacity}</span>
    </li>
        `;
}

function onButtonClick(event, items) {
  const dataSet = event.target.dataset;
  const key = dataSet.key;
  const value = dataSet.value;

  if (key == null || value == null) {
    return;
  }

  const filtered = items.filter((item) => item[key] === value);
  displayItems(filtered);
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', (event) => onButtonClick(event, items));
}

loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
