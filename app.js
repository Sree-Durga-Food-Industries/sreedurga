const products = [
  {id:"murukku",name:"Traditional Murukku",category:"snacks",categoryName:"Traditional Snacks",price:299,weight:"250 g",symbol:"🌀",desc:"Crisp, savoury traditional snack. Sample catalogue item.",badge:"BESTSELLER"},
  {id:"mixture",name:"Chennai Mixture",category:"snacks",categoryName:"Traditional Snacks",price:249,weight:"250 g",symbol:"🥜",desc:"A crunchy savoury mix for tea time and sharing.",badge:"POPULAR"},
  {id:"laddu",name:"Traditional Laddu",category:"sweets",categoryName:"Sweets",price:349,weight:"500 g",symbol:"🟠",desc:"A classic sweet for celebrations and everyday treats.",badge:"FAVOURITE"},
  {id:"mysorepak",name:"Mysore Pak",category:"sweets",categoryName:"Sweets",price:399,weight:"500 g",symbol:"🟨",desc:"Rich, melt-in-the-mouth sweet. Sample catalogue item.",badge:"SPECIAL"},
  {id:"mango-pickle",name:"Mango Pickle",category:"pickles",categoryName:"Pickles",price:229,weight:"300 g",symbol:"🥭",desc:"A traditional accompaniment for rice, snacks and meals.",badge:"NEW"},
  {id:"lemon-pickle",name:"Lemon Pickle",category:"pickles",categoryName:"Pickles",price:219,weight:"300 g",symbol:"🍋",desc:"Tangy, spicy and made for a satisfying meal.",badge:"POPULAR"},
  {id:"idli-powder",name:"Idli Podi",category:"powders",categoryName:"Traditional Powders",price:199,weight:"200 g",symbol:"🌶️",desc:"A versatile traditional spice powder for idli and dosa.",badge:"EVERYDAY"},
  {id:"sambar-powder",name:"Sambar Powder",category:"powders",categoryName:"Traditional Powders",price:249,weight:"250 g",symbol:"🌿",desc:"A fragrant spice blend for everyday South Indian cooking.",badge:"NEW"}
];

const categories = [
  {id:"snacks",name:"Traditional Snacks",count:"Crisp & savoury",symbol:"🌀"},
  {id:"sweets",name:"Sweets",count:"For every celebration",symbol:"🍬"},
  {id:"pickles",name:"Pickles",count:"Tangy & traditional",symbol:"🥭"},
  {id:"powders",name:"Food Powders",count:"Everyday essentials",symbol:"🌿"},
  {id:"combos",name:"Combo Packs",count:"Curated favourites",symbol:"🎁"},
  {id:"festival",name:"Festival Specials",count:"Seasonal collection",symbol:"🪔"},
  {id:"gifting",name:"Gift Boxes",count:"Share the taste",symbol:"🎀"},
  {id:"bulk",name:"Bulk Orders",count:"For families & business",symbol:"📦"}
];

let cart = JSON.parse(localStorage.getItem("sd_cart") || "{}");
let lastOrder = null;
const money = n => `₹${Number(n).toLocaleString("en-IN")}`;

function saveCart(){localStorage.setItem("sd_cart",JSON.stringify(cart));updateCartUI();}
function cartEntries(){return Object.entries(cart).filter(([,q])=>q>0).map(([id,q])=>({p:products.find(x=>x.id===id),q})).filter(x=>x.p);}
function totals(){
  const subtotal=cartEntries().reduce((s,x)=>s+x.p.price*x.q,0);
  const delivery=subtotal===0?0:(subtotal>=999?0:79);
  const tax=Math.round(subtotal*0.05); // Demo only. Configure actual tax rates in production.
  return {subtotal,delivery,tax,total:subtotal+delivery+tax};
}
function updateCartUI(){
  const count=cartEntries().reduce((s,x)=>s+x.q,0);
  document.getElementById("cartCount").textContent=count;
  renderCart();
}
function renderCategories(){
  document.getElementById("categoryGrid").innerHTML=categories.map(c=>`
    <a class="category-card" href="#shop" onclick="filterProducts('${c.id}')">
      <span class="category-shape"></span><span class="category-icon">${c.symbol}</span>
      <div><h3>${c.name}</h3><span>${c.count}</span></div>
    </a>`).join("");
}
function renderProducts(filter="all",query=""){
  const list=products.filter(p=>(filter==="all"||p.category===filter) && (!query||`${p.name} ${p.categoryName} ${p.desc}`.toLowerCase().includes(query.toLowerCase())));
  const grid=document.getElementById("productGrid");
  if(!list.length){grid.innerHTML='<div class="empty" style="grid-column:1/-1">No products found. Try another search.</div>';return;}
  grid.innerHTML=list.map(p=>`
    <article class="product-card">
      <div class="product-image"><span class="badge">${p.badge}</span><span class="food-symbol">${p.symbol}</span></div>
      <div class="product-info">
        <span class="category">${p.categoryName}</span><h3>${p.name}</h3><p>${p.desc}</p>
        <div class="product-bottom"><span class="price">${money(p.price)} <small>/ ${p.weight}</small></span>
        <button class="add-btn" onclick="addToCart('${p.id}')">Add to cart</button></div>
      </div>
    </article>`).join("");
}
function filterProducts(filter){
  document.querySelectorAll(".filter-btn").forEach(b=>b.classList.toggle("active",b.dataset.filter===filter));
  renderProducts(filter);
}
function addToCart(id){
  cart[id]=(cart[id]||0)+1;saveCart();toast("Added to your cart");openOverlay("cartOverlay");
}
function changeQty(id,delta){
  cart[id]=(cart[id]||0)+delta;if(cart[id]<=0)delete cart[id];saveCart();
}
function renderCart(){
  const box=document.getElementById("cartItems"), summary=document.getElementById("cartSummary");
  const entries=cartEntries();
  if(!entries.length){box.innerHTML='<div class="empty">Your cart is empty.<br>Choose a few traditional favourites to get started.</div>';summary.innerHTML="";document.getElementById("checkoutBtn").disabled=true;return;}
  document.getElementById("checkoutBtn").disabled=false;
  box.innerHTML=entries.map(x=>`
    <div class="cart-item"><div class="cart-thumb">${x.p.symbol}</div>
      <div><h4>${x.p.name}</h4><small>${x.p.weight} · ${money(x.p.price)}</small>
      <div class="qty"><button onclick="changeQty('${x.p.id}',-1)">−</button><b>${x.q}</b><button onclick="changeQty('${x.p.id}',1)">+</button><button class="remove" onclick="removeItem('${x.p.id}')">Remove</button></div></div>
      <strong>${money(x.p.price*x.q)}</strong>
    </div>`).join("");
  const t=totals();
  summary.innerHTML=`<div class="summary-row"><span>Subtotal</span><b>${money(t.subtotal)}</b></div>
  <div class="summary-row"><span>Delivery</span><b>${t.delivery?money(t.delivery):"FREE"}</b></div>
  <div class="summary-row"><span>Estimated GST</span><b>${money(t.tax)}</b></div>
  <div class="summary-row total"><span>Total</span><b>${money(t.total)}</b></div>`;
}
function removeItem(id){delete cart[id];saveCart();}
function openOverlay(id){document.getElementById(id).classList.add("open");document.body.style.overflow="hidden";}
function closeOverlay(id){document.getElementById(id).classList.remove("open");if(!document.querySelector(".overlay.open"))document.body.style.overflow="";}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200);}
function orderNumber(){return "SD"+new Date().getFullYear()+String(Math.floor(Math.random()*999999)).padStart(6,"0");}

function buildInvoice(order){
  const rows=order.items.map(x=>`<tr><td>${x.p.name}</td><td>${x.q}</td><td>${money(x.p.price)}</td><td>${money(x.p.price*x.q)}</td></tr>`).join("");
  const html=`<!doctype html><html><head><meta charset="utf-8"><title>Invoice ${order.number}</title>
  <style>body{font-family:Arial,sans-serif;color:#211814;margin:40px}h1{color:#7d1e26}table{width:100%;border-collapse:collapse;margin-top:30px}th,td{border-bottom:1px solid #ddd;padding:12px;text-align:left}th{background:#f5ecdf}.head{display:flex;justify-content:space-between}.total{text-align:right;margin-top:25px;font-size:18px}.muted{color:#777;font-size:12px}</style></head><body>
  <div class="head"><div><h1>Sree Durga Food Industries</h1><div>No. 135, Village High Road<br>Sholinganallur, Chennai<br>Tamil Nadu 600119, India</div><div>GST/Registration: 33FHSPS6377C1ZR</div></div>
  <div><h2>INVOICE</h2><div>Invoice: ${order.number}</div><div>Date: ${order.date}</div><div>Payment: ${order.payment.toUpperCase()}</div></div></div>
  <hr><h3>Bill to</h3><p>${order.customer.name}<br>${order.customer.address}<br>${order.customer.city}, ${order.customer.state} ${order.customer.pin}<br>${order.customer.mobile}<br>${order.customer.email}</p>
  <table><thead><tr><th>Product</th><th>Qty</th><th>Unit</th><th>Amount</th></tr></thead><tbody>${rows}</tbody></table>
  <div class="total">Subtotal: ${money(order.totals.subtotal)}<br>Delivery: ${order.totals.delivery?money(order.totals.delivery):"FREE"}<br>Estimated GST: ${money(order.totals.tax)}<br><strong>Grand Total: ${money(order.totals.total)}</strong></div>
  <p class="muted">This demo invoice is generated by the website prototype. Final tax calculation and invoice numbering should be configured with the business accountant before production use.</p>
  <script>window.onload=()=>window.print()<\/script></body></html>`;
  const blob=new Blob([html],{type:"text/html"});const url=URL.createObjectURL(blob);const w=window.open(url,"_blank");if(!w)toast("Please allow pop-ups to print the invoice.");
}

document.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("year").textContent=new Date().getFullYear();
  renderCategories();renderProducts();updateCartUI();

  document.getElementById("cartBtn").onclick=()=>openOverlay("cartOverlay");
  document.getElementById("searchBtn").onclick=()=>{openOverlay("searchOverlay");setTimeout(()=>document.getElementById("searchInput").focus(),100);}
  document.getElementById("accountBtn").onclick=()=>toast("Customer accounts will be connected in the production backend.");
  document.getElementById("mobileMenuBtn").onclick=()=>document.getElementById("mobileNav").classList.toggle("open");
  document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>closeOverlay(b.dataset.close));
  document.querySelectorAll(".filter-btn").forEach(b=>b.onclick=()=>filterProducts(b.dataset.filter));

  document.getElementById("searchInput").addEventListener("input",e=>{
    const q=e.target.value.trim();const results=products.filter(p=>`${p.name} ${p.categoryName}`.toLowerCase().includes(q.toLowerCase())).slice(0,8);
    document.getElementById("searchResults").innerHTML=q?results.map(p=>`<button class="search-result" onclick="closeOverlay('searchOverlay');filterProducts('${p.category}');document.getElementById('shop').scrollIntoView()"><span class="mini-symbol">${p.symbol}</span><span><b>${p.name}</b><small>${p.categoryName} · ${money(p.price)}</small></span></button>`).join(""):'';
  });

  document.getElementById("checkoutBtn").onclick=()=>{
    if(!cartEntries().length){toast("Your cart is empty");return;}
    closeOverlay("cartOverlay");const t=totals();document.getElementById("checkoutTotal").textContent=`Order total: ${money(t.total)} · Includes estimated tax`;
    openOverlay("checkoutOverlay");
  };
  document.querySelectorAll('input[name="payment"]').forEach(r=>r.addEventListener("change",()=>{
    document.getElementById("bankPlaceholder").style.display=document.querySelector('input[name="payment"]:checked').value==="bank"?"block":"none";
  }));
  document.getElementById("checkoutForm").addEventListener("submit",e=>{
    e.preventDefault();
    const fd=new FormData(e.target);const t=totals();
    lastOrder={number:orderNumber(),date:new Date().toLocaleDateString("en-IN"),payment:fd.get("payment"),customer:{name:fd.get("name"),mobile:fd.get("mobile"),email:fd.get("email"),address:fd.get("address"),city:fd.get("city"),state:fd.get("state"),pin:fd.get("pin")},items:cartEntries(),totals:t};
    localStorage.setItem("sd_last_order",JSON.stringify(lastOrder));cart={};saveCart();e.target.reset();
    closeOverlay("checkoutOverlay");
    document.getElementById("successText").innerHTML=`Your order <strong>${lastOrder.number}</strong> has been created for <strong>${money(t.total)}</strong>.<br>The selected payment method was <strong>${lastOrder.payment.toUpperCase()}</strong>.`;
    openOverlay("successOverlay");
  });
  document.getElementById("invoiceBtn").onclick=()=>lastOrder&&buildInvoice(lastOrder);
  document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();toast("Thank you. Newsletter integration can be connected in production.");e.target.reset();});
  document.getElementById("contactForm").addEventListener("submit",e=>{e.preventDefault();toast("Enquiry captured in this prototype.");e.target.reset();});
});
