(()=>{
  'use strict';
  const brands={
    toyota:{name:'Toyota',logo:'assets/brands/toyota.svg',origin:'Genuine Parts',year:'1937',model:'Camry / RAV4 / Corolla',models:['Camry','RAV4','Corolla'],country:'Япония · надёжность<br>в каждой детали',colors:['#d9282f','#68080f','#ff6d70'],mult:1},
    bmw:{name:'BMW',logo:'assets/brands/bmw.svg',origin:'Freude am Fahren',year:'1916',model:'3 Series / 5 Series / X5',models:['3 Series','5 Series','X5'],country:'Германия · точность<br>и динамика',colors:['#3475b9','#092c5c','#74c6ff'],mult:1.24},
    mercedes:{name:'Mercedes-Benz',logo:'assets/brands/mercedesbenz.png',origin:'The Best or Nothing',year:'1926',model:'C-Class / E-Class / GLC',models:['C-Class','E-Class','GLC'],country:'Германия · инженерная<br>культура',colors:['#979b9d','#2c3235','#e7ecee'],mult:1.3},
    audi:{name:'Audi',logo:'assets/brands/audi.svg',origin:'Vorsprung',year:'1909',model:'A4 / A6 / Q5',models:['A4','A6','Q5'],country:'Германия · прогресс<br>через технологии',colors:['#db2238','#650910','#ff7b88'],mult:1.2},
    lexus:{name:'Lexus',logo:'assets/brands/lexus.png',origin:'Experience Amazing',year:'1989',model:'ES / RX / NX',models:['ES','RX','NX'],country:'Япония · внимание<br>к каждой линии',colors:['#b8a077','#493a22','#f0dfbb'],mult:1.15},
    kia:{name:'Kia',logo:'assets/brands/kia.svg',origin:'Movement Inspires',year:'1944',model:'Sportage / K5 / Sorento',models:['Sportage','K5','Sorento'],country:'Корея · движение,<br>которое вдохновляет',colors:['#353837','#0b0d0c','#9ca39f'],mult:.94},
    hyundai:{name:'Hyundai',logo:'assets/brands/hyundai.svg',origin:'Progress for Humanity',year:'1967',model:'Tucson / Sonata / Elantra',models:['Tucson','Sonata','Elantra'],country:'Корея · технологии<br>для человека',colors:['#29609b','#0b2544','#6bb8f2'],mult:.96}
  };
  const categories={all:'Все товары',brakes:'Тормозная система',engine:'Двигатель и навесное',suspension:'Подвеска и рулевое',filters:'Фильтры и расходники',lighting:'Кузов и оптика',oils:'Масла и жидкости'};
  const products=[
    {id:1,title:'Тормозные колодки передние',cat:'brakes',sku:'BRK-33480',price:24500,old:29900,art:'disc-art',rating:'4.9',reviews:24},
    {id:2,title:'Двигатель в сборе 2.0',cat:'engine',sku:'ENG-20-2828',price:420000,old:465000,art:'engine-art',rating:'4.8',reviews:11},
    {id:3,title:'Амортизатор передний',cat:'suspension',sku:'SHK-54651',price:36500,old:42000,art:'shock-art',rating:'4.9',reviews:31},
    {id:4,title:'Фильтр масляный Premium',cat:'filters',sku:'FLT-YZZE1',price:4200,old:5100,art:'filter-art',rating:'4.9',reviews:56},
    {id:5,title:'Фара передняя LED',cat:'lighting',sku:'LED-484069',price:185000,old:209000,art:'lamp-art',rating:'4.7',reviews:9},
    {id:6,title:'Масло моторное 5W-30, 4 л',cat:'oils',sku:'OIL-5W30-4',price:18900,old:22000,art:'oil-art',rating:'4.9',reviews:44},
    {id:7,title:'Диск тормозной вентилируемый',cat:'brakes',sku:'DSC-4211812',price:38700,old:45000,art:'disc-art',rating:'4.8',reviews:18},
    {id:8,title:'Свечи зажигания, комплект',cat:'engine',sku:'IGN-4-PRO',price:13900,old:16500,art:'engine-art',rating:'4.6',reviews:22},
    {id:9,title:'Опора амортизатора',cat:'suspension',sku:'SUP-79763',price:12900,old:15900,art:'shock-art',rating:'4.7',reviews:15},
    {id:10,title:'Фильтр воздушный двигателя',cat:'filters',sku:'AIR-H8100',price:6900,old:8100,art:'filter-art',rating:'4.8',reviews:37},
    {id:11,title:'Лампа и корпус фары',cat:'lighting',sku:'LMP-42F30',price:64000,old:78000,art:'lamp-art',rating:'4.6',reviews:8},
    {id:12,title:'Масло трансмиссионное ATF',cat:'oils',sku:'ATF-WS-4',price:21400,old:24600,art:'oil-art',rating:'4.9',reviews:29},
    {id:13,title:'Помпа системы охлаждения',cat:'engine',sku:'PMP-16100',price:32500,old:38000,art:'engine-art',rating:'4.7',reviews:13},
    {id:14,title:'Рулевая тяга передняя',cat:'suspension',sku:'STR-45503',price:17800,old:20500,art:'shock-art',rating:'4.8',reviews:20}
  ];
  const $=s=>document.querySelector(s);
  const escapeHtml=value=>String(value??'').replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const money=n=>new Intl.NumberFormat('ru-RU').format(n)+' ₸';
  const safeRestore=(key,fallback)=>{try{return JSON.parse(localStorage.getItem('autosaiman04_'+key))??fallback}catch{return fallback}};
  const persist=(key,value)=>{try{localStorage.setItem('autosaiman04_'+key,JSON.stringify(value))}catch{}};
  const root=document.documentElement,stage=$('#stage'),badgeWrap=$('#badgeWrap'),homePage=$('#homePage'),routeView=$('#routeView'),routeContent=$('#routeContent'),homeGrid=$('#productGrid');
  const ui={symbol:$('#brandSymbol'),name:$('#brandName'),origin:$('#brandOrigin'),year:$('#brandYear'),country:$('#brandCountry'),index:$('#brandIndex')};
  const state={brand:'toyota',model:'Camry',year:'2021',homeFilter:'all',catalogFilter:'all',price:'all',stock:true,sort:'popular',search:'',filtersOpen:false,qty:1,cart:safeRestore('cart',{}),wishlist:safeRestore('wishlist',[])};
  let raf=0;
  const itemKey=(brand,id)=>brand+':'+id;
  const splitKey=key=>{const [brand,id]=String(key).split(':');return {brand,id:Number(id)}};
  const priceFor=(product,brand)=>Math.round(product.price*brands[brand].mult/100)*100;
  const oldFor=(product,brand)=>Math.round(product.old*brands[brand].mult/100)*100;
  const getProduct=(brand,id)=>{const product=products.find(p=>p.id===Number(id));return product?{...product,brand,price:priceFor(product,brand),old:oldFor(product,brand)}:null};
  const isWish=key=>state.wishlist.includes(key);
  function productCard(product,brandKey,compact=false){
    const brand=brands[brandKey],key=itemKey(brandKey,product.id),price=priceFor(product,brandKey),old=oldFor(product,brandKey),discount=Math.round((1-price/old)*100);
    const selectedModel=brandKey===state.brand?state.model:brand.models[0];
    return `<article class='product-card'><div class='product-visual' data-product='${key}' role='button' tabindex='0' aria-label='Открыть ${product.title}'><span class='sale'>−${discount}%</span><button class='wish ${isWish(key)?'on':''}' data-wish='${key}' aria-label='${isWish(key)?'Удалить из избранного':'Добавить в избранное'}'>${isWish(key)?'♥':'♡'}</button><div class='part-art'><div class='${product.art}'></div></div><img class='product-brand-mark' src='${brand.logo}' alt=''></div><div class='product-info'><div class='product-meta'><span>${brand.name} · ${product.sku}</span><span class='stock'>● В наличии</span></div><h3><button class='product-title-btn' data-product='${key}'>${product.title}</button></h3><div class='fit'>★ ${product.rating} · ${product.reviews} отзывов</div><div class='fit-badge'>✓ Подойдёт для ${selectedModel} ${state.year}</div><div class='delivery-note'>Доставка по Алматы — завтра</div><div class='price-row'><div class='price'><strong>${money(price)}</strong><del>${money(old)}</del></div><button class='buy' data-buy='${key}'>В корзину +</button></div></div></article>`;
  }
  function updateCounters(){
    const cartTotal=Object.values(state.cart).reduce((sum,item)=>sum+item.qty,0);
    $('#cartCount').textContent=cartTotal;$('#favoriteCount').textContent=state.wishlist.length;
    document.querySelectorAll('[data-cart-count]').forEach(node=>node.textContent=cartTotal);
    document.querySelectorAll('[data-favorite-count]').forEach(node=>node.textContent=state.wishlist.length);
  }
  function syncGarage(){
    document.querySelectorAll('[data-vehicle-brand]').forEach(select=>{select.innerHTML=Object.entries(brands).map(([key,brand])=>`<option value='${key}' ${key===state.brand?'selected':''}>${brand.name}</option>`).join('')});
    document.querySelectorAll('[data-vehicle-model]').forEach(select=>{select.innerHTML=brands[state.brand].models.map(model=>`<option ${model===state.model?'selected':''}>${model}</option>`).join('')});
    document.querySelectorAll('[data-vehicle-year]').forEach(select=>select.value=state.year);
  }
  function renderHomeProducts(){
    const items=products.filter(p=>state.homeFilter==='all'||p.cat===state.homeFilter).slice(0,6),brand=brands[state.brand];
    $('#catalogBrand').textContent=brand.name+'.';$('#catalogLogo').src=brand.logo;$('#catalogCaption').textContent='Каталог '+brand.name;
    homeGrid.innerHTML=items.map(p=>productCard(p,state.brand)).join('');
  }
  function setBrand(key,openCatalog=false){
    if(!brands[key])return;state.brand=key;state.model=brands[key].models[0];state.homeFilter='all';const brand=brands[key];
    root.style.setProperty('--brand',brand.colors[0]);root.style.setProperty('--brand-dark',brand.colors[1]);root.style.setProperty('--brand-light',brand.colors[2]);
    badgeWrap.style.transform='rotateX(7deg) rotateY(0deg) scale(.82)';
    setTimeout(()=>{ui.symbol.src=brand.logo;ui.name.textContent=brand.name;ui.origin.textContent=brand.origin;ui.year.textContent=brand.year;ui.country.innerHTML=brand.country;badgeWrap.setAttribute('aria-label','Открыть каталог '+brand.name);badgeWrap.style.transform='rotateX(7deg) rotateY(0deg) scale(1)'},150);
    document.querySelectorAll('.brand-pick').forEach((button,i)=>{const on=button.dataset.brand===key;button.classList.toggle('active',on);if(on)ui.index.textContent=String(i+1).padStart(2,'0')+' / 07'});syncGarage();
    document.querySelectorAll('.filter-btn').forEach(button=>button.classList.toggle('active',button.dataset.filter==='all'));renderHomeProducts();
    if(openCatalog)location.hash='catalog/'+key;
  }
  function toast(message,action=false){document.querySelector('.toast')?.remove();const node=document.createElement('div');node.className='toast';const label=document.createElement('span');label.textContent=message;node.append(label);if(action){const link=document.createElement('a');link.href='#cart';link.textContent='В корзину →';node.append(link)}document.body.append(node);setTimeout(()=>node.remove(),3500)}
  function addCart(key,quantity=1){
    const {brand,id}=splitKey(key),product=getProduct(brand,id);if(!product)return;
    state.cart[key]??={brand,id,qty:0};state.cart[key].qty+=quantity;persist('cart',state.cart);updateCounters();toast(product.title+' · добавлено',true);
    if(location.hash==='#cart')renderRoute();
  }
  function toggleWish(key){
    state.wishlist=isWish(key)?state.wishlist.filter(x=>x!==key):[...state.wishlist,key];persist('wishlist',state.wishlist);updateCounters();renderHomeProducts();
    if(location.hash.startsWith('#favorites')||location.hash.startsWith('#catalog')||location.hash.startsWith('#product'))renderRoute();
  }
  function pageHero(kicker,title,description,count=''){return `<div class='breadcrumb'><a href='#home'>Главная</a> / ${kicker}</div><div class='page-hero'><div><div class='section-kicker'>${kicker}</div><h1>${title}</h1></div>${description?`<p>${description}</p>`:''}${count?`<div class='page-count'><b>${count}</b> позиций</div>`:''}</div>`}
  function filteredProducts(){
    let items=products.filter(p=>state.catalogFilter==='all'||p.cat===state.catalogFilter);
    if(state.search){const tokens=state.search.toLowerCase().split(/\s+/).filter(Boolean);items=items.filter(p=>{const haystack=(p.title+' '+p.sku+' '+categories[p.cat]).toLowerCase();return tokens.every(token=>haystack.includes(token))})}
    if(state.price==='low')items=items.filter(p=>priceFor(p,state.brand)<25000);
    if(state.price==='mid')items=items.filter(p=>{const x=priceFor(p,state.brand);return x>=25000&&x<=100000});
    if(state.price==='high')items=items.filter(p=>priceFor(p,state.brand)>100000);
    if(state.sort==='cheap')items.sort((a,b)=>priceFor(a,state.brand)-priceFor(b,state.brand));
    if(state.sort==='expensive')items.sort((a,b)=>priceFor(b,state.brand)-priceFor(a,state.brand));
    if(state.sort==='discount')items.sort((a,b)=>(b.old-b.price)/b.old-(a.old-a.price)/a.old);
    return items;
  }
  function renderCatalog(){
    const brand=brands[state.brand],items=filteredProducts();
    if(!brand.models.includes(state.model))state.model=brand.models[0];syncGarage();
    const brandFilters=Object.entries(brands).map(([key,b])=>`<button class='filter-option ${key===state.brand?'active':''}' data-catalog-brand='${key}'>${b.name}<span>14</span></button>`).join('');
    const catFilters=Object.entries(categories).map(([key,label])=>`<button class='filter-option ${key===state.catalogFilter?'active':''}' data-route-filter='${key}'>${label}<span>${key==='all'?products.length:products.filter(p=>p.cat===key).length}</span></button>`).join('');
    const activeCount=(state.catalogFilter!=='all'?1:0)+(state.price!=='all'?1:0)+(state.search?1:0);
    const chips=[state.catalogFilter!=='all'?`<button class='active-filter' data-clear-filter='category'>${categories[state.catalogFilter]} ×</button>`:'',state.price!=='all'?`<button class='active-filter' data-clear-filter='price'>${state.price==='low'?'До 25 000 ₸':state.price==='mid'?'25 000–100 000 ₸':'От 100 000 ₸'} ×</button>`:'',state.search?`<button class='active-filter' data-clear-filter='search'>«${escapeHtml(state.search)}» ×</button>`:''].filter(Boolean).join('');
    const cards=items.length?`<div class='route-grid'>${items.map(p=>productCard(p,state.brand,true)).join('')}</div>`:`<div class='empty-state'><div class='empty-icon'>⌕</div><h2>Ничего не найдено</h2><p>Измените запрос или сбросьте фильтры.</p><button class='primary-btn' data-reset-filters>Сбросить фильтры</button></div>`;
    routeContent.innerHTML=pageHero('Каталог запчастей',`Запчасти для <em>${brand.name}.</em>`,'Товары отобраны по автомобилю — совместимость ещё раз проверим по VIN.',items.length)+`<section class='vehicle-context'><div class='vehicle-context-logo'><img src='${brand.logo}' alt=''></div><div><small>Ваш автомобиль</small><strong>${brand.name} ${state.model} · ${state.year}</strong><span>Показываем детали, совместимые с выбранной моделью</span></div><button data-change-car>Изменить автомобиль</button></section><div class='catalog-layout'><aside class='filters-panel ${state.filtersOpen?'open':''}'><h2>Фильтры</h2><div class='filter-block'><b>Марка автомобиля</b>${brandFilters}</div><div class='filter-block'><b>Категория</b>${catFilters}</div><div class='filter-block'><b>Цена</b><button class='filter-option ${state.price==='all'?'active':''}' data-price='all'>Любая цена</button><button class='filter-option ${state.price==='low'?'active':''}' data-price='low'>До 25 000 ₸</button><button class='filter-option ${state.price==='mid'?'active':''}' data-price='mid'>25 000–100 000 ₸</button><button class='filter-option ${state.price==='high'?'active':''}' data-price='high'>От 100 000 ₸</button></div><div class='filter-block'><label class='filter-check'><input type='checkbox' data-stock ${state.stock?'checked':''}> Только в наличии</label></div></aside><div class='catalog-main'><div class='shop-toolbar'><button class='mobile-filter-toggle' data-filter-toggle>Фильтры <b>${activeCount}</b></button><form class='catalog-search' data-catalog-search><input name='q' aria-label='Поиск в каталоге' value='${escapeHtml(state.search)}' placeholder='Название детали или артикул'><button>Найти</button></form><select id='catalogSort' aria-label='Сортировка'><option value='popular' ${state.sort==='popular'?'selected':''}>По популярности</option><option value='cheap' ${state.sort==='cheap'?'selected':''}>Сначала дешевле</option><option value='expensive' ${state.sort==='expensive'?'selected':''}>Сначала дороже</option><option value='discount' ${state.sort==='discount'?'selected':''}>По скидке</option></select></div>${chips?`<div class='active-filters'>${chips}<button class='clear-filters' data-reset-filters>Очистить всё</button></div>`:''}${cards}</div></div>`;
  }
  function renderDetail(brandKey,id){
    const item=getProduct(brandKey,id);if(!item){location.hash='catalog';return}if(state.brand!==brandKey){state.brand=brandKey;state.model=brands[brandKey].models[0];syncGarage()}const brand=brands[brandKey],key=itemKey(brandKey,id),discount=Math.round((1-item.price/item.old)*100);state.qty=1;
    const related=products.filter(product=>product.id!==item.id&&(product.cat===item.cat||product.id<4)).slice(0,3);
    routeContent.innerHTML=pageHero('Карточка товара','Точная деталь.','Проверьте совместимость, характеристики и добавьте товар в корзину.')+`<div class='detail-layout'><div class='detail-visual'><span class='sale'>−${discount}%</span><div class='part-art'><div class='${item.art}'></div></div></div><article class='detail-copy'><div class='detail-brand'><img src='${brand.logo}' alt=''><span>${brand.name} · ${item.sku}</span><span class='stock'>● В наличии</span></div><h1>${item.title}</h1><div class='fit-badge'>✓ Совместимо с ${brand.name} ${state.model} ${state.year}</div><p>Перед оформлением специалист бесплатно перепроверит деталь по VIN автомобиля.</p><div class='detail-price'>${money(item.price)} <del>${money(item.old)}</del></div><div class='detail-actions'><div class='qty'><button data-qty='minus' aria-label='Уменьшить количество'>−</button><span id='detailQty'>1</span><button data-qty='plus' aria-label='Увеличить количество'>+</button></div><button class='primary-btn' data-detail-buy='${key}'>Добавить в корзину</button><button class='secondary-btn' data-wish='${key}' aria-label='Добавить в избранное'>${isWish(key)?'♥':'♡'}</button></div><div class='detail-benefits'><div class='detail-benefit'><b>Доставка завтра</b>По Алматы и области</div><div class='detail-benefit'><b>12 месяцев</b>Гарантия магазина</div><div class='detail-benefit'><b>Проверка VIN</b>До подтверждения</div></div><div class='spec-list'><div class='spec-row'><span>Артикул</span><b>${item.sku}</b></div><div class='spec-row'><span>Категория</span><b>${categories[item.cat]}</b></div><div class='spec-row'><span>Совместимость</span><b>${brand.model}</b></div><div class='spec-row'><span>Рейтинг</span><b>★ ${item.rating} · ${item.reviews} отзывов</b></div><div class='spec-row'><span>Гарантия</span><b>12 месяцев</b></div></div></article></div><section class='related'><div class='related-head'><h2>С этим товаром смотрят</h2><a href='#catalog/${brandKey}'>Весь каталог →</a></div><div class='route-grid'>${related.map(product=>productCard(product,brandKey,true)).join('')}</div></section>`;
  }
  function cartItems(){return Object.entries(state.cart).map(([key,value])=>{const item=getProduct(value.brand,value.id);return item?{...item,key,qty:value.qty}:null}).filter(Boolean)}
  function renderCart(){
    const items=cartItems(),total=items.reduce((sum,item)=>sum+item.price*item.qty,0);
    if(!items.length){routeContent.innerHTML=pageHero('Корзина','Корзина пока <em>пуста.</em>','Добавьте товары из каталога — они появятся здесь.')+`<div class='empty-state'><div class='empty-icon'>◴</div><h2>Выберите нужные запчасти</h2><p>Начните с марки автомобиля или откройте полный каталог.</p><a class='primary-btn' href='#catalog/${state.brand}'>Перейти в каталог</a></div>`;return}
    const rows=items.map(item=>`<article class='cart-row'><div class='cart-thumb'><div class='part-art'><div class='${item.art}'></div></div></div><div><h3>${item.title}</h3><p>${brands[item.brand].name} · ${item.sku}</p><div class='cart-controls'><button data-cart-minus='${item.key}'>−</button><b>${item.qty}</b><button data-cart-plus='${item.key}'>+</button><button class='cart-remove' data-cart-remove='${item.key}'>Удалить</button></div></div><strong>${money(item.price*item.qty)}</strong></article>`).join('');
    routeContent.innerHTML=pageHero('Корзина','Ваш <em>заказ.</em>','Проверьте количество и перейдите к оформлению.',items.reduce((s,x)=>s+x.qty,0))+`<div class='cart-layout'><div class='cart-list'>${rows}</div><aside class='order-summary'><h2>Итого</h2><div class='summary-row'><span>Товары</span><b>${money(total)}</b></div><div class='summary-row'><span>Доставка</span><b>Рассчитывается</b></div><div class='summary-row total'><span>К оплате</span><span>${money(total)}</span></div><a class='primary-btn' href='#checkout'>Оформить заказ →</a><p>Демонстрационный прототип: платежи не проводятся.</p></aside></div>`;
  }
  function renderFavorites(){
    const items=state.wishlist.map(splitKey).map(x=>getProduct(x.brand,x.id)).filter(Boolean);
    routeContent.innerHTML=pageHero('Избранное','Сохранённые <em>детали.</em>',items.length?'Вернитесь к выбранным товарам в любой момент.':'Добавляйте товары сердечком — они сохранятся здесь.',items.length)+(items.length?`<div class='route-grid'>${items.map(item=>productCard(item,item.brand,true)).join('')}</div>`:`<div class='empty-state'><div class='empty-icon'>♡</div><h2>Список избранного пуст</h2><p>Нажмите на сердечко в карточке товара.</p><a class='primary-btn' href='#catalog'>Открыть каталог</a></div>`);
  }
  function renderCheckout(){
    const items=cartItems(),total=items.reduce((sum,item)=>sum+item.price*item.qty,0);if(!items.length){location.hash='cart';return}
    routeContent.innerHTML=pageHero('Оформление','Оформление <em>заказа.</em>','Заполните данные получателя. Никакая информация не будет отправлена.')+`<div class='checkout-layout'><form class='checkout-form' data-checkout-form><h2>Контактные данные</h2><div class='form-grid'><label class='field'><span>Имя</span><input required name='name' placeholder='Как к вам обращаться?'></label><label class='field'><span>Телефон</span><input required name='phone' placeholder='+7 700 000 00 00'></label><label class='field'><span>Город</span><select name='city'><option>Алматы</option><option>Астана</option><option>Шымкент</option><option>Другой город</option></select></label><label class='field'><span>Получение</span><select name='delivery'><option>Курьерская доставка</option><option>Пункт выдачи</option><option>Самовывоз</option></select></label><label class='field full'><span>Адрес</span><input required name='address' placeholder='Улица, дом, квартира'></label><label class='field full'><span>Комментарий</span><textarea name='comment' placeholder='Дополнительная информация'></textarea></label></div><button class='primary-btn' style='margin-top:20px'>Подтвердить демо-заказ</button></form><aside class='order-summary'><h2>Ваш заказ</h2><div class='summary-row'><span>${items.reduce((s,x)=>s+x.qty,0)} товаров</span><b>${money(total)}</b></div><div class='summary-row'><span>Доставка</span><b>После подтверждения</b></div><div class='summary-row total'><span>Итого</span><span>${money(total)}</span></div><p>Оплата в прототипе отключена.</p></aside></div>`;
  }
  function renderInfo(type){
    const data={delivery:{k:'Доставка и оплата',t:'Получить заказ — <em>удобно.</em>',d:'Выберите подходящий способ доставки и оплаты.',cards:[['▱','Доставка по Казахстану','Курьером или в пункт выдачи. Срок и стоимость рассчитываются по городу.'],['₸','Оплата','Картой онлайн, переводом или при получении после подтверждения заказа.'],['↩','Возврат и обмен','Понятные условия возврата, если товар не подошёл или был повреждён.']]},about:{k:'О компании',t:'Детали для <em>уверенного движения.</em>',d:'AUTOSAIMAN помогает быстро найти совместимые детали.',cards:[['◇','Проверенные бренды','Оригинальные запчасти и качественные аналоги от надёжных поставщиков.'],['⌕','Точный подбор','По марке, модели, артикулу и VIN — без случайных совпадений.'],['◎','Поддержка','Специалист помогает от выбора до получения заказа.']]},contacts:{k:'Контакты',t:'Мы всегда <em>на связи.</em>',d:'Выберите удобный способ получить помощь с подбором.',cards:[['☎','Телефон','+7 700 000 00 00 · демонстрационный номер'],['⌂','Магазин','Алматы · адрес будет указан в рабочей версии'],['✉','Заявка на подбор','Оставьте VIN или артикул — покажем сценарий обращения.']]}}[type];
    routeContent.innerHTML=pageHero(data.k,data.t,data.d)+`<div class='info-grid'>${data.cards.map(card=>`<article class='info-card'><i>${card[0]}</i><h2>${card[1]}</h2><p>${card[2]}</p><button class='secondary-btn' data-consult>Уточнить детали →</button></article>`).join('')}</div>`;
  }
  function renderRoute(){
    const parts=(location.hash.slice(1)||'home').split('/'),route=parts[0];
    document.querySelectorAll('[data-dock-route]').forEach(item=>item.classList.toggle('active',item.dataset.dockRoute===route||(route==='product'&&item.dataset.dockRoute==='catalog')));
    if(route==='home'||!route){homePage.hidden=false;routeView.hidden=true;document.title='AUTOSAIMAN.KZ — 3D каталог автозапчастей';window.scrollTo({top:0,behavior:'instant'});return}
    homePage.hidden=true;routeView.hidden=false;
    if(route==='catalog'){if(brands[parts[1]])state.brand=parts[1];renderCatalog();document.title='Каталог · AUTOSAIMAN.KZ'}
    else if(route==='product')renderDetail(parts[1]||state.brand,parts[2]||1);
    else if(route==='cart')renderCart();
    else if(route==='favorites')renderFavorites();
    else if(route==='checkout')renderCheckout();
    else if(['delivery','about','contacts'].includes(route))renderInfo(route);
    else{location.hash='home';return}
    window.scrollTo({top:0,behavior:'instant'});
  }
  function vehicleModal(){
    const node=document.createElement('div');node.className='modal-backdrop';const brandOptions=Object.entries(brands).map(([key,brand])=>`<option value='${key}' ${key===state.brand?'selected':''}>${brand.name}</option>`).join('');
    node.innerHTML=`<section class='modal' role='dialog' aria-modal='true' aria-labelledby='vehicleTitle'><div class='modal-top'><small>МОЙ АВТОМОБИЛЬ</small><button class='close' aria-label='Закрыть'>×</button></div><h2 id='vehicleTitle'>Подобрать совместимые детали</h2><p>Выберите автомобиль — каталог сохранит контекст и покажет подходящие позиции.</p><form data-vehicle-modal><div class='vehicle-modal-grid'><label class='field'><span>Марка</span><select name='brand'>${brandOptions}</select></label><label class='field'><span>Модель</span><select name='model'>${brands[state.brand].models.map(model=>`<option ${model===state.model?'selected':''}>${model}</option>`).join('')}</select></label><label class='field'><span>Год выпуска</span><select name='year'>${[2024,2023,2022,2021,2020,2019,2018].map(year=>`<option ${String(year)===state.year?'selected':''}>${year}</option>`).join('')}</select></label></div><button class='primary-btn'>Показать совместимые детали →</button></form></section>`;document.body.append(node);
    const close=()=>{node.remove();document.removeEventListener('keydown',esc)},esc=event=>{if(event.key==='Escape')close()},brandSelect=node.querySelector('[name=brand]'),modelSelect=node.querySelector('[name=model]');node.querySelector('.close').onclick=close;node.addEventListener('click',event=>{if(event.target===node)close()});document.addEventListener('keydown',esc);brandSelect.focus();
    brandSelect.onchange=()=>{modelSelect.innerHTML=brands[brandSelect.value].models.map(model=>`<option>${model}</option>`).join('')};node.querySelector('form').onsubmit=event=>{event.preventDefault();const data=new FormData(event.currentTarget);state.brand=data.get('brand');state.model=data.get('model');state.year=data.get('year');state.catalogFilter='all';state.search='';close();syncGarage();location.hash='catalog/'+state.brand;renderRoute()};
  }
  function renderSearchSuggestions(query){
    const panel=$('#homeSearchResults');if(!panel)return;const clean=query.trim();const tokens=clean.toLowerCase().split(/\s+/).filter(Boolean);if(!tokens.length){panel.hidden=true;return}if(/^[a-z0-9]{12,}$/i.test(clean.replace(/\s/g,''))){panel.innerHTML=`<button class='search-result-item' data-vin-search='${escapeHtml(clean)}'><span class='search-result-icon'>VIN</span><span><b>Проверить автомобиль по VIN</b><small>${escapeHtml(clean)} · бесплатная проверка совместимости</small></span><strong>→</strong></button>`;panel.hidden=false;return}
    const matches=products.filter(product=>{const text=(product.title+' '+product.sku+' '+categories[product.cat]).toLowerCase();return tokens.every(token=>text.includes(token))}).slice(0,4);panel.innerHTML=matches.map(product=>`<button class='search-result-item' data-search-product='${itemKey(state.brand,product.id)}'><span class='search-result-icon'>${product.id<10?'0':''}${product.id}</span><span><b>${product.title}</b><small>${brands[state.brand].name} · ${product.sku}</small></span><strong>${money(priceFor(product,state.brand))}</strong></button>`).join('')||`<div class='search-empty'>Ничего точного не нашли — нажмите «Найти», чтобы открыть весь каталог.</div>`;panel.hidden=false;
  }
  function modal(mode='search',initial=''){
    const node=document.createElement('div');node.className='modal-backdrop';node.innerHTML=`<section class='modal' role='dialog' aria-modal='true' aria-labelledby='dialogTitle'><div class='modal-top'><small>AUTOSAIMAN · ДЕМО</small><button class='close' aria-label='Закрыть'>×</button></div><h2 id='dialogTitle'>${mode==='consult'?'Подбор по VIN':'Поиск по каталогу'}</h2><p>${mode==='consult'?'Укажите автомобиль или VIN — специалист предложит совместимые детали.':'Ищите по названию, категории или артикулу.'}</p><form data-modal-form><div class='modal-field'><input name='q' value='${escapeHtml(initial)}' autofocus required placeholder='${mode==='consult'?'Например, Toyota Camry 2020':'Например, тормозные колодки'}'><button aria-label='Найти'>→</button></div></form><p>Это интерактивный прототип: данные никуда не отправляются.</p></section>`;document.body.append(node);
    const close=()=>{node.remove();document.removeEventListener('keydown',esc)},esc=e=>{if(e.key==='Escape')close()};node.querySelector('.close').onclick=close;node.addEventListener('click',e=>{if(e.target===node)close()});document.addEventListener('keydown',esc);node.querySelector('input').focus();
    node.querySelector('form').onsubmit=e=>{e.preventDefault();const query=new FormData(e.currentTarget).get('q').trim();close();if(mode==='consult')toast('Демо-заявка подготовлена — отправка отключена');else{state.search=query;location.hash='catalog/'+state.brand}};
  }
  document.querySelectorAll('.brand-pick').forEach(button=>button.addEventListener('click',()=>setBrand(button.dataset.brand,true)));
  badgeWrap.addEventListener('click',()=>{location.hash='catalog/'+state.brand});badgeWrap.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();badgeWrap.click()}});
  stage.addEventListener('pointermove',e=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const rect=stage.getBoundingClientRect(),x=(e.clientX-rect.left)/rect.width-.5,y=(e.clientY-rect.top)/rect.height-.5;cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{badgeWrap.style.transform=`rotateX(${7-y*20}deg) rotateY(${x*28}deg) translateY(${y*8}px)`})});
  stage.addEventListener('pointerleave',()=>{badgeWrap.style.transform='rotateX(7deg) rotateY(0deg)'});
  document.addEventListener('click',e=>{
    const buy=e.target.closest('[data-buy]'),wish=e.target.closest('[data-wish]'),product=e.target.closest('[data-product]');
    if(buy){addCart(buy.dataset.buy);return}if(wish){toggleWish(wish.dataset.wish);return}if(product){const {brand,id}=splitKey(product.dataset.product);location.hash='product/'+brand+'/'+id;return}
    const searchProduct=e.target.closest('[data-search-product]');if(searchProduct){const {brand,id}=splitKey(searchProduct.dataset.searchProduct);$('#homeSearchResults').hidden=true;location.hash='product/'+brand+'/'+id;return}
    const vinSearch=e.target.closest('[data-vin-search]');if(vinSearch){$('#homeSearchResults').hidden=true;modal('consult',vinSearch.dataset.vinSearch);return}
    const suggestion=e.target.closest('[data-search-suggest]');if(suggestion){const input=$('[data-search-form] input');input.value=suggestion.dataset.searchSuggest;input.focus();renderSearchSuggestions(input.value);return}
    const brand=e.target.closest('[data-catalog-brand]');if(brand){state.brand=brand.dataset.catalogBrand;state.model=brands[state.brand].models[0];state.catalogFilter='all';state.search='';location.hash='catalog/'+state.brand;renderRoute();syncGarage();return}
    const filter=e.target.closest('[data-route-filter]');if(filter){state.catalogFilter=filter.dataset.routeFilter;renderCatalog();return}
    const price=e.target.closest('[data-price]');if(price){state.price=price.dataset.price;renderCatalog();return}
    if(e.target.closest('[data-reset-filters]')){state.catalogFilter='all';state.price='all';state.search='';renderCatalog();return}
    const clearFilter=e.target.closest('[data-clear-filter]');if(clearFilter){if(clearFilter.dataset.clearFilter==='category')state.catalogFilter='all';if(clearFilter.dataset.clearFilter==='price')state.price='all';if(clearFilter.dataset.clearFilter==='search')state.search='';renderCatalog();return}
    if(e.target.closest('[data-filter-toggle]')){state.filtersOpen=!state.filtersOpen;renderCatalog();return}
    if(e.target.closest('[data-change-car]')){vehicleModal();return}
    const plus=e.target.closest('[data-cart-plus]'),minus=e.target.closest('[data-cart-minus]'),remove=e.target.closest('[data-cart-remove]');
    if(plus){state.cart[plus.dataset.cartPlus].qty++;persist('cart',state.cart);updateCounters();renderCart();return}
    if(minus){const key=minus.dataset.cartMinus;state.cart[key].qty--;if(state.cart[key].qty<=0)delete state.cart[key];persist('cart',state.cart);updateCounters();renderCart();return}
    if(remove){delete state.cart[remove.dataset.cartRemove];persist('cart',state.cart);updateCounters();renderCart();return}
    const qty=e.target.closest('[data-qty]');if(qty){state.qty=Math.max(1,state.qty+(qty.dataset.qty==='plus'?1:-1));$('#detailQty').textContent=state.qty;return}
    const detailBuy=e.target.closest('[data-detail-buy]');if(detailBuy){addCart(detailBuy.dataset.detailBuy,state.qty);return}
    if(e.target.closest('[data-open-search]')){modal('search');return}
    if(e.target.closest('[data-consult]')){modal('consult');return}
    if(e.target.closest('[data-cart]')){location.hash='cart';return}
    if(e.target.closest('[data-favorites]')){location.hash='favorites';return}
  });
  document.addEventListener('change',e=>{if(e.target.id==='catalogSort'){state.sort=e.target.value;renderCatalog()}if(e.target.matches('[data-stock]')){state.stock=e.target.checked;renderCatalog()}if(e.target.matches('[data-vehicle-brand]')){state.brand=e.target.value;state.model=brands[state.brand].models[0];syncGarage()}if(e.target.matches('[data-vehicle-model]'))state.model=e.target.value;if(e.target.matches('[data-vehicle-year]'))state.year=e.target.value});
  document.addEventListener('input',e=>{if(e.target.matches('[data-search-form] input'))renderSearchSuggestions(e.target.value)});
  document.addEventListener('click',e=>{if(!e.target.closest('.search-area')){const panel=$('#homeSearchResults');if(panel)panel.hidden=true}});
  document.addEventListener('keydown',e=>{const product=e.target.closest?.('[data-product]'),interactive=e.target.closest?.('button,a,input,select,textarea');if(product&&!interactive&&(e.key==='Enter'||e.key===' ')){e.preventDefault();product.click()}if(e.key==='/'&&!interactive){e.preventDefault();if(!homePage.hidden)$('[data-search-form] input').focus();else modal('search')}if(e.key==='Escape'){const panel=$('#homeSearchResults');if(panel)panel.hidden=true}});
  document.addEventListener('submit',e=>{
    if(e.target.matches('[data-search-form]')){e.preventDefault();const query=new FormData(e.target).get('q').trim();$('#homeSearchResults').hidden=true;if(/^[a-z0-9]{12,}$/i.test(query.replace(/\s/g,''))){modal('consult',query);return}state.search=query;location.hash='catalog/'+state.brand}
    if(e.target.matches('[data-catalog-search]')){e.preventDefault();state.search=new FormData(e.target).get('q').trim();renderCatalog()}
    if(e.target.matches('[data-vehicle-form]')){e.preventDefault();const data=new FormData(e.target);state.brand=data.get('brand');state.model=data.get('model');state.year=data.get('year');state.catalogFilter='all';state.search='';location.hash='catalog/'+state.brand}
    if(e.target.matches('[data-checkout-form]')){e.preventDefault();state.cart={};persist('cart',state.cart);updateCounters();routeContent.innerHTML=pageHero('Заказ оформлен','Спасибо за <em>заказ.</em>','Это демонстрация: данные не отправлялись и оплата не проводилась.')+`<div class='empty-state'><div class='empty-icon'>✓</div><h2>Демо-заказ принят</h2><p>В рабочем магазине здесь появится номер заказа и статус оплаты.</p><a class='primary-btn' href='#home'>Вернуться на главную</a></div>`}
  });
  document.querySelectorAll('.filter-btn').forEach(button=>button.addEventListener('click',()=>{state.homeFilter=button.dataset.filter;document.querySelectorAll('.filter-btn').forEach(x=>x.classList.toggle('active',x===button));renderHomeProducts()}));
  window.addEventListener('hashchange',renderRoute);
  setBrand(state.brand);syncGarage();updateCounters();renderRoute();
})();
