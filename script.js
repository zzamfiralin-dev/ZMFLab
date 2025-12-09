
const CART_KEY = 'zmflab_cart_v2';
function getCart(){return JSON.parse(localStorage.getItem(CART_KEY)||'[]')}
function saveCart(c){localStorage.setItem(CART_KEY, JSON.stringify(c))}
function addToCart(id,title,price){let c=getCart(); let found=c.find(x=>x.id===id); if(found){found.q++}else{c.push({id,title,price,q:1})} saveCart(c); renderCartCount(); openCart();}
function removeFromCart(id){let c=getCart().filter(x=>x.id!==id); saveCart(c); renderCart(); renderCartCount();}
function updateQty(id,q){let c=getCart(); let it=c.find(x=>x.id===id); if(it){it.q=q; if(it.q<1) c=c.filter(x=>x.id!==id);} saveCart(c); renderCart(); renderCartCount();}
function renderCartCount(){let c=getCart(); let count=c.reduce((s,x)=>s+x.q,0); document.getElementById('cartCount').innerText = count;}
function renderCart(){let c=getCart(); let el=document.getElementById('cartItems'); if(!el) return; if(c.length===0){el.innerHTML='<p>Coș gol</p>'; return;} let html='<div>'; let total=0; c.forEach(item=>{html+=`<div style="margin-bottom:12px"><strong>${item.title}</strong><div>${item.price} RON x <input style="width:60px" type="number" value="${item.q}" onchange="updateQty('${item.id}', parseInt(this.value))" /></div><button onclick="removeFromCart('${item.id}')">Elimină</button></div>`; total+=item.price*item.q}); html+='</div>'; html+=`<p><strong>Total:</strong> ${total.toFixed(2)} RON</p>`; html+=`<a class="btn" href="#" onclick="checkoutWhatsApp()">Checkout WhatsApp</a> <a class="btn" href="#" onclick="checkoutEmail()" style="margin-left:10px">Checkout Email</a>`; el.innerHTML=html;}
function checkoutWhatsApp(){let c=getCart(); if(c.length===0){alert('Coșul este gol'); return;} let msg='Comandă ZMFLab:%0A'; let total=0; c.forEach(it=>{msg+=`${it.title} x${it.q} - ${it.price} RON%0A`; total+=it.price*it.q}); msg+=`Total: ${total.toFixed(2)} RON`; window.open('https://wa.me/40775602767?text='+msg,'_blank');}
function checkoutEmail(){let c=getCart(); if(c.length===0){alert('Coșul este gol'); return;} let body='Comandă ZMFLab:\n'; let total=0; c.forEach(it=>{body+=`${it.title} x${it.q} - ${it.price} RON\n`; total+=it.price*it.q}); body+=`Total: ${total.toFixed(2)} RON`; window.location.href = 'mailto:contact@zmflab.com?subject=Comanda&body='+encodeURIComponent(body);}
function openCart(){document.getElementById('cartSidebar').classList.add('open')}
function closeCart(){document.getElementById('cartSidebar').classList.remove('open')}
function toggleTheme(){let t=document.documentElement.getAttribute('data-theme'); document.documentElement.setAttribute('data-theme', t==='dark'?'':'dark'); localStorage.setItem('zm_theme', document.documentElement.getAttribute('data-theme'));}
function initTheme(){let t=localStorage.getItem('zm_theme')||''; if(t) document.documentElement.setAttribute('data-theme', t);}
window.addEventListener('DOMContentLoaded', ()=>{renderCartCount(); renderCart(); initTheme();});
