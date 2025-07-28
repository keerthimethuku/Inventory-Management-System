const inventory = [
  { name: 'బియ్యం (Rice)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'కందిపప్పు (Toor Dal)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'పెసరపప్పు (Moong Dal)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'మినపప్పు (Urad Dal)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'ఉప్పు (Salt)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'పంచదార (Sugar)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'సన్ ఫ్లవర్ నూనె (Sunflower Oil)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'వేరుశెనగ నూనె (Groundnut Oil)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'పసుపు (Turmeric)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'కారం (Chilli Powder)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'ధనియాలు (Coriander Seeds)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'జీలకర్ర (Cumin Seeds)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'ఆవాలు (Mustard Seeds)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'మెంతులు (Fenugreek Seeds)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'ఇంగువ (Hing)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'లవంగాలు (Cloves)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'యాలకులు (Cardamom)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'దాల్చిన చెక్క (Cinnamon)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'మిరియాలు (Black Pepper)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'బెల్లం (Jaggery)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'అటుకులు (Poha)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'సగ్గుబియ్యం (Sago)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'గోధుమపిండి (Wheat Flour)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'బియ్యం పిండి (Rice Flour)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'శనగపిండి (Besan)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'రవ్వ (Sooji)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'చింతపండు (Tamarind)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
  { name: 'ఎండుమిరపకాయలు (Dry Chillies)', cp: 10, rp: 14, wp: 12, sp: 11, stock: 150 },
];

let bill = [];
let total = 0;
let dailyBills = 0;
let dailyRevenue = 0;
let dailyItems = 0;

function renderInventory() {
  const tbody = document.getElementById('inventoryBody');
  const select = document.getElementById('billingItem');
  tbody.innerHTML = '';
  select.innerHTML = '';
  inventory.forEach((item, i) => {
    tbody.innerHTML += `<tr>
      <td>${item.name}</td>
      <td><input type='number' value='${item.cp}' onchange='updateItem(${i}, \"cp\", this.value)'></td>
      <td><input type='number' value='${item.rp}' onchange='updateItem(${i}, \"rp\", this.value)'></td>
      <td><input type='number' value='${item.wp}' onchange='updateItem(${i}, \"wp\", this.value)'></td>
      <td><input type='number' value='${item.sp}' onchange='updateItem(${i}, \"sp\", this.value)'></td>
      <td><input type='number' value='${item.stock}' onchange='updateItem(${i}, \"stock\", this.value)'></td>
      <td><button onclick='deleteItem(${i})'>🗑️</button></td>
    </tr>`;
    select.innerHTML += `<option value='${i}'>${item.name}</option>`;
  });
}

function updateItem(index, field, value) {
  inventory[index][field] = parseFloat(value);
  renderInventory();
}

function deleteItem(index) {
  inventory.splice(index, 1);
  renderInventory();
}

function addOrUpdateItem() {
  const name = document.getElementById('itemName').value;
  const cp = parseFloat(document.getElementById('cp').value);
  const rp = parseFloat(document.getElementById('rp').value);
  const wp = parseFloat(document.getElementById('wp').value);
  const sp = parseFloat(document.getElementById('sp').value);
  const stock = parseFloat(document.getElementById('stock').value);

  const existing = inventory.find(item => item.name === name);
  if (existing) {
    existing.cp = cp;
    existing.rp = rp;
    existing.wp = wp;
    existing.sp = sp;
    existing.stock = stock;
  } else {
    inventory.push({ name, cp, rp, wp, sp, stock });
  }
  renderInventory();
}

function addToBill() {
  const i = document.getElementById('billingItem').value;
  const qty = parseFloat(document.getElementById('billingQty').value);
  const item = inventory[i];
  const amount = qty * item.rp;
  item.stock -= qty;
  bill.push(`${item.name} - ${qty}kg - ₹${amount}`);
  total += amount;
  dailyItems += qty;
  document.getElementById('totalAmount').innerText = total;
  document.getElementById('billList').innerHTML = bill.map(b => `<li>${b}</li>`).join('');
  renderInventory();
}

function printBill() {
  const name = document.getElementById('customerName').value;
  const list = bill.map(i => `<li>${i}</li>`).join('');
  const history = document.getElementById('billHistory');
  history.innerHTML += `<li><strong>${name}</strong>: ₹${total} <ul>${list}</ul></li>`;
  dailyRevenue += total;
  dailyBills++;
  document.getElementById('totalRevenue').innerText = dailyRevenue;
  document.getElementById('totalBills').innerText = dailyBills;
  document.getElementById('totalItems').innerText = dailyItems;
  bill = [];
  total = 0;
  document.getElementById('billList').innerHTML = '';
  document.getElementById('totalAmount').innerText = 0;
  document.getElementById('customerName').value = '';
}

function resetDailyCounter() {
  dailyBills = 0;
  dailyRevenue = 0;
  dailyItems = 0;
  document.getElementById('billHistory').innerHTML = '';
  document.getElementById('totalRevenue').innerText = 0;
  document.getElementById('totalBills').innerText = 0;
  document.getElementById('totalItems').innerText = 0;
}

renderInventory();


