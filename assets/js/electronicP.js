let electronicProducts = [
  {
    id: "1",
    name: "iPhone 14",
    stock: 25,
    origin: "USA",
    price: 999,
    category: "Smartphone",
    icon: "📱"
  },
  {
    id: "2",
    name: "Samsung Galaxy S22",
    stock: 30,
    origin: "South Korea",
    price: "$899",
    category: "Smartphone",
    icon: "📱"
  },
  {
    id: "3",
    name: "MacBook Pro",
    stock: 15,
    origin: "USA",
    price: "$1999",
    category: "Laptop",
    icon: "💻"
  },
  {
    id: "4",
    name: "Dell XPS 13",
    stock: 20,
    origin: "USA",
    price: "$1299",
    category: "Laptop",
    icon: "💻"
  },
  {
    id: "5",
    name: "Sony WH-1000XM4",
    stock: 40,
    origin: "Japan",
    price: "$349",
    category: "Headphones",
    icon: "🎧"
  },
  {
    id: "6",
    name: "Apple Watch Series 7",
    stock: 35,
    origin: "USA",
    price: "$399",
    category: "Smartwatch",
    icon: "⌚"
  },
  {
    id: "7",
    name: "iPad Pro",
    stock: 25,
    origin: "USA",
    price: "$1099",
    category: "Tablet",
    icon: "📱"
  },
  {
    id: "8",
    name: "Amazon Echo Dot",
    stock: 50,
    origin: "USA",
    price: "$49",
    category: "Smart Speaker",
    icon: "🔊"
  },
  {
    id: "9",
    name: "Google Nest Hub",
    stock: 40,
    origin: "USA",
    price: "$89",
    category: "Smart Display",
    icon: "🖥️"
  },
  {
    id: "10",
    name: "PlayStation 5",
    stock: 10,
    origin: "Japan",
    price: "$499",
    category: "Gaming Console",
    icon: "🎮"
  },
  {
    id: "11",
    name: "Xbox Series X",
    stock: 12,
    origin: "USA",
    price: "$499",
    category: "Gaming Console",
    icon: "🎮"
  },
  {
    id: "12",
    name: "Nikon D850",
    stock: 8,
    origin: "Japan",
    price: "$2999",
    category: "Camera",
    icon: "📷"
  },
  {
    id: "13",
    name: "Canon EOS R5",
    stock: 7,
    origin: "Japan",
    price: "$3899",
    category: "Camera",
    icon: "📷"
  },
  {
    id: "14",
    name: "LG OLED TV",
    stock: 18,
    origin: "South Korea",
    price: "$1299",
    category: "Television",
    icon: "📺"
  },
  {
    id: "15",
    name: "Samsung QLED TV",
    stock: 20,
    origin: "South Korea",
    price: "$1499",
    category: "Television",
    icon: "📺"
  },
  {
    id: "16",
    name: "Apple AirPods Pro",
    stock: 50,
    origin: "USA",
    price: "$249",
    category: "Earbuds",
    icon: "🎧"
  },
  {
    id: "17",
    name: "Bose QuietComfort Earbuds",
    stock: 45,
    origin: "USA",
    price: "$279",
    category: "Earbuds",
    icon: "🎧"
  },
  {
    id: "18",
    name: "Fitbit Charge 5",
    stock: 30,
    origin: "USA",
    price: "$149",
    category: "Fitness Tracker",
    icon: "📟"
  },
  {
    id: "19",
    name: "GoPro Hero 9",
    stock: 15,
    origin: "USA",
    price: "$399",
    category: "Action Camera",
    icon: "📹"
  },
  {
    id: "20",
    name: "DJI Mavic Air 2",
    stock: 10,
    origin: "China",
    price: "$799",
    category: "Drone",
    icon: "🚁"
  }
];

let sales = [];


function createHtml(product) {

  return `<div class="product">
   <label>
      <input ${product.stock <= 1 ? 'disabled' : ''} 
      required type="radio" name="selectedProduct"
       value="${product.id}"> (${product.stock}) 
      ${product.name} - 
      ${product.origin} -
      ${product.category} -
      ${product.icon} - 
      ${product.price}$
    </label>
  </div>`;
}

function renderProducts() {
  electronicProductsList.innerHTML = electronicProducts.map(x => createHtml(x)).join(''); 
}
//urun satis
function handleSalesForm(e) {
  e.preventDefault();

  let formData = new FormData(salesForm);
  let formObj = Object.fromEntries(formData);

  
  if(!formObj.selectedProduct) {
    alert('Ürün kalmadı !!');
    return;
  }

  let product = electronicProducts.find(x => x.id === formObj.selectedProduct);
  
  if(product.stock - 1 < 0) {
    alert('Bu üründe yeterli stok yok!');
    return;
  }
  product.stock--;
  
  sales.push(
    {
      name: product.name,
      price:product.price
    }
  );

calculateSalesTotal();
salesForm.reset();
renderProducts();
}

function handlePaymentTypeClick() {
  switch (this.value) {
    case '1':
        paidTotalInput.disabled = true;
        paidTotalInput.required = false;
        paidTotalInput.value = '';
      break;
    case '2':
        paidTotalInput.disabled = false;
        paidTotalInput.required = true;
        paidTotalInput.focus();
      break;
  }
}

function bindSalesFormEvents() {

  salesForm.addEventListener('submit', handleSalesForm);
  let paymentTypeSelectors = document.querySelectorAll('input[name="paymentType"]');
  paymentTypeSelectors.forEach(x => x.addEventListener('click', handlePaymentTypeClick));
}

function handleNewProduct(e) {
  e.preventDefault();

  let formData = new FormData(newProductForm);
  let formObj = Object.fromEntries(formData);

  formObj.id = crypto.randomUUID();
  formObj.price = Number(formObj.price);
  formObj.stock = Number(formObj.stock);
  electronicProducts.push(formObj);
  newProductForm.reset();
  renderProducts();
}


// dizideki ürünlerin fiyatını numbera çevirmek için (bu fonksiyon olmayınca total hesaplanmıyor nan dönüyor)
for (let i = 0; i < electronicProducts.length; i++) {

  let product = electronicProducts[i];

  if (typeof product.price === 'string') {

    product.price = parseFloat(product.price.replace('$', ''));
  }
}

// hesaplama yapıyoruz
function calculateSalesTotal() {

  let total=0;
  for (let i =0; i < sales.length; i++ ){
    total += Number(sales[i].price) ;
  }

  salesTotal.innerText = total; 
  }



//editleme butonu
function handleEditProduct(e) {
  e.preventDefault();
  let formData = new FormData(editProductForm);
  let formObj = Object.fromEntries(formData);

  formObj.price = Number(formObj.price);
  formObj.stock = Number(formObj.stock);

  let product = electronicProducts.find(x => x.name === formObj.name);
  if(product) {
    product.price = formObj.price
    product.stock = formObj.stock
    product.icon = formObj.icon
    product.category = formObj.category
    product.origin = formObj.origin
  } else {
    alert('Bu isimde bir ürün bulunmamaktadır. Kontrol edip tekrar deneyiniz.');
  }

  editProductForm.reset();
  renderProducts();
}

// silme butonu
function handleDeleteProduct(e) {
  e.preventDefault();
  let formData = new FormData(editProductForm);
  let formObj = Object.fromEntries(formData);

  let productIndex = products.findIndex(x => x.name === formObj.name);

  if (productIndex > -1) {
    products.splice(productIndex, 1);

  } else {
    alert('Bu isimde bir ürün bulunmamaktadır. Kontrol edip tekrar deneyiniz.');
  }

  editProductForm.reset();
  renderProducts();
}

function bindEditorEvents() {
  newProductForm.addEventListener('submit', handleNewProduct);
  editProductForm.addEventListener('submit', handleEditProduct);
  document.querySelector('#deleteBtn').addEventListener('click', handleDeleteProduct);
}

function init() {
  renderProducts();
  bindSalesFormEvents();
  bindEditorEvents();
}

init();