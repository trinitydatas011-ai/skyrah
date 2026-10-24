/* Skyrah Impex — shopping bag (stored in the browser) + header badge.
   Loaded after products-data.js on every page. */
(function(){
  var KEY = 'skyrah_cart_v1';
  function read(){
    try{ var v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v : []; }catch(e){ return []; }
  }
  function write(items){
    try{ localStorage.setItem(KEY, JSON.stringify(items)); }catch(e){}
    badge();
  }
  var Cart = window.Cart = {
    items: read,
    count: function(){ return read().reduce(function(n,i){ return n + i.qty; }, 0); },
    add: function(slug, qty){
      var items = read(), row = items.find(function(i){ return i.slug === slug; });
      qty = Math.max(1, Math.min(99, qty || 1));
      if(row) row.qty = Math.min(99, row.qty + qty); else items.push({ slug: slug, qty: qty });
      write(items);
    },
    setQty: function(slug, qty){
      var items = read().map(function(i){ if(i.slug === slug) i.qty = Math.max(1, Math.min(99, qty)); return i; });
      write(items);
    },
    remove: function(slug){ write(read().filter(function(i){ return i.slug !== slug; })); },
    clear: function(){ write([]); },
    /* resolve against the live catalogue so prices can't be stale */
    lines: function(){
      return read().map(function(i){
        var p = typeof getProductBySlug === 'function' ? getProductBySlug(i.slug) : null;
        return p && p.inStock && p.price ? { p: p, qty: i.qty, total: p.price * i.qty } : null;
      }).filter(Boolean);
    },
    subtotal: function(){ return Cart.lines().reduce(function(s,l){ return s + l.total; }, 0); }
  };

  function badge(){
    var n = Cart.count();
    document.querySelectorAll('a[aria-label="Cart"]').forEach(function(a){
      a.setAttribute('href', 'checkout.html');
      a.style.position = 'relative';
      var b = a.querySelector('.cart-badge');
      if(!b){ b = document.createElement('span'); b.className = 'cart-badge'; a.appendChild(b); }
      b.textContent = n > 99 ? '99+' : n;
      b.hidden = !n;
    });
    document.querySelectorAll('.mobile-drawer-nav a[href="shop.html"] .mdn-label').forEach(function(l){});
  }
  badge();
  window.addEventListener('storage', badge);
})();
