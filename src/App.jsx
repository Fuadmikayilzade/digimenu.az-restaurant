// import React, { useMemo, useState } from "react";

// const WHATSAPP_NUMBER = "994514195344";

// const products = [
//   { id: 1, title: "Pepperoni Pizza", desc: "Pepperoni, mozzarella, pomidor sousu.", price: 13.9, cat: "pizza", tag: "Çox satılan" },
//   { id: 2, title: "Chicken BBQ Pizza", desc: "Toyuq, BBQ sousu, göbələk, mozzarella.", price: 14.5, cat: "pizza", tag: "Yeni" },
//   { id: 3, title: "Margherita Pizza", desc: "Mozzarella, pomidor sousu, reyhan.", price: 11.9, cat: "pizza", tag: "Klassik" },

//   { id: 4, title: "Double Beef Burger", desc: "2 qat mal əti, cheddar, xüsusi sous.", price: 12.4, cat: "burger", tag: "🔥 Hot" },
//   { id: 5, title: "Chicken Burger", desc: "Toyuq file, kahı, pomidor, mayo.", price: 10.9, cat: "burger", tag: "Yüngül" },

//   { id: 10, title: "Toyuq Şiş", desc: "Manqal toyuq şiş, göyərti və lavaş ilə.", price: 9.9, cat: "hot", tag: "Manqal" },
//   { id: 11, title: "Lülə Kabab", desc: "Mal əti lülə kabab, soğan, lavaş.", price: 12.5, cat: "hot", tag: "Top" },

//   { id: 20, title: "Qəlyan - Klassik", desc: "Alma / Üzüm / Nanə (standart).", price: 12, cat: "hookah", tag: "Classic" },
//   { id: 21, title: "Qəlyan - Premium", desc: "Blueberry / Love66 / Mango (premium).", price: 18, cat: "hookah", tag: "Premium" },

//   { id: 15, title: "Ayran", desc: "Soyuq ayran (300ml).", price: 1.8, cat: "drink", tag: "Milli" },
//   { id: 16, title: "Çay", desc: "Qara çay, limonla (stakan).", price: 1.2, cat: "drink", tag: "Hot" },
// ];

// const categories = [
//   { key: "all", label: "Hamısı", icon: "fa-solid fa-list" },
//   { key: "pizza", label: "Pizza", icon: "fa-solid fa-pizza-slice" },
//   { key: "burger", label: "Burger", icon: "fa-solid fa-burger" },
//   { key: "hot", label: "İsti yeməklər", icon: "fa-solid fa-fire" },
//   { key: "hookah", label: "Qəlyan", icon: "fa-solid fa-smoke" },
//   { key: "drink", label: "İçki", icon: "fa-solid fa-mug-saucer" },
// ];

// const formatAZN = (n) => `${n.toFixed(2)} AZN`;

// export default function App() {
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [cart, setCart] = useState({});
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [tableNumber, setTableNumber] = useState("");

//   const filteredProducts = useMemo(() => {
//     return products.filter((p) => (selectedCategory === "all" ? true : p.cat === selectedCategory));
//   }, [selectedCategory]);

//   const cartItems = useMemo(() => {
//     return Object.keys(cart)
//       .map(Number)
//       .map((id) => {
//         const product = products.find((p) => p.id === id);
//         return { ...product, qty: cart[id] };
//       });
//   }, [cart]);

//   const cartCount = useMemo(() => {
//     return cartItems.reduce((sum, i) => sum + i.qty, 0);
//   }, [cartItems]);

//   const total = useMemo(() => {
//     return cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
//   }, [cartItems]);

//   const addToCart = (id) => {
//     setCart((prev) => {
//       const next = { ...prev };
//       next[id] = (next[id] || 0) + 1;
//       return next;
//     });
//     setIsDrawerOpen(true);
//   };

//   const removeFromCart = (id) => {
//     setCart((prev) => {
//       const next = { ...prev };
//       if (!next[id]) return next;
//       next[id] -= 1;
//       if (next[id] <= 0) delete next[id];
//       return next;
//     });
//   };

//   const clearCart = () => {
//     setCart({});
//   };

//   const checkout = () => {
//     if (cartItems.length === 0) {
//       alert("Səbət boşdur!");
//       return;
//     }

//     const table = tableNumber.trim();
//     if (!table) {
//       alert("Zəhmət olmasa masa nömrəsini daxil edin!");
//       return;
//     }

//     const now = new Date();
//     const dateStr = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

//     let msg = `Sifariş:\nMasa: ${table}\nTarix/Saat: ${dateStr}\n\n`;

//     cartItems.forEach((i) => {
//       msg += `${i.title} x${i.qty} - ${formatAZN(i.price * i.qty)}\n`;
//     });

//     msg += `\nToplam: ${formatAZN(total)}`;

//     const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
//     window.open(url, "_blank");

//     // Səbəti sıfırla
//     setCart({});
//     setTableNumber("");
//     setIsDrawerOpen(false);
//   };

//   return (
//     <>
//       <div className="container">
//         <header className="topbar">
//           <div className="brand">
//             <div className="logo">DM</div>
//             <div>
//               <h1>DigiMenu Restaurant</h1>
//               <p>WhatsApp Sifariş • QR Menu</p>
//             </div>
//           </div>

//           <div className="chips-container">
//             {categories.map((c) => (
//               <div
//                 key={c.key}
//                 className={`chip ${selectedCategory === c.key ? "active" : ""}`}
//                 onClick={() => setSelectedCategory(c.key)}
//               >
//                 <i className={c.icon}></i>
//                 {c.label}
//               </div>
//             ))}
//           </div>

//           <div className="cartBtn" onClick={() => setIsDrawerOpen(true)}>
//             🛒 Səbət <div className="badge">{cartCount}</div>
//           </div>
//         </header>

//         <div className="menuHeader">
//           <div className="menuHeaderLeft">
//             <h2>📋 Menyu</h2>
//             <small>{filteredProducts.length} məhsul</small>
//           </div>
//           <div className="currencyBadge">Qiymətlər • AZN</div>
//         </div>

//         <section className="grid">
//           {filteredProducts.map((p) => (
//             <div className="item" key={p.id}>
//               <div className="itemTop">
//                 <div>
//                   <div className="itemTitle">{p.title}</div>
//                   <div className="itemDesc">{p.desc}</div>
//                 </div>
//                 <div className="tag">{p.tag}</div>
//               </div>

//               <div className="priceRow">
//                 <div className="price">{formatAZN(p.price)}</div>
//                 <button className="addBtn" onClick={() => addToCart(p.id)}>
//                   ➕ Əlavə et
//                 </button>
//               </div>
//             </div>
//           ))}
//         </section>
//       </div>

//       {/* Overlay */}
//       <div className={`overlay ${isDrawerOpen ? "show" : ""}`} onClick={() => setIsDrawerOpen(false)}></div>

//       {/* Drawer */}
//       <aside className={`drawer ${isDrawerOpen ? "show" : ""}`}>
//         <div className="drawerHead">
//           <h3>🛒 Səbət</h3>
//           <button className="closeBtn" onClick={() => setIsDrawerOpen(false)}>
//             Bağla ✖
//           </button>
//         </div>

//         <input
//           className="input"
//           value={tableNumber}
//           onChange={(e) => setTableNumber(e.target.value)}
//           type="text"
//           placeholder="Masa nömrəsini daxil edin..."
//         />

//         <div className="cartList">
//           {cartItems.length === 0 ? (
//             <div style={{ marginTop: 14, color: "var(--muted)", textAlign: "center" }}>Səbət boşdur</div>
//           ) : (
//             cartItems.map((i) => (
//               <div className="cartItem" key={i.id}>
//                 <div>
//                   <b>{i.title}</b>
//                   <small>
//                     {formatAZN(i.price)} x {i.qty}
//                   </small>
//                 </div>

//                 <div className="qty">
//                   <button onClick={() => removeFromCart(i.id)}>-</button>
//                   <span>{i.qty}</span>
//                   <button onClick={() => addToCart(i.id)}>+</button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="cartFooter">
//           <div className="totalRow">
//             <span>Toplam:</span>
//             <span>{formatAZN(total)}</span>
//           </div>

//           <button className="checkoutBtn" onClick={checkout}>
//             WhatsApp ilə sifariş göndər
//           </button>

//           <button className="dangerBtn" onClick={clearCart}>
//             Səbəti təmizlə
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }











// import React, { useEffect, useState, useMemo } from "react";

// const WHATSAPP_NUMBER = "994514195344";
// const SHEET_JSON_URL =
//   "https://opensheet.elk.sh/1-reT1K4Bbv771_JIoz12wRqhNxYOlaJXpLy7VRtH7Cs/menu";

// const categories = [
//   { key: "all", label: "Hamısı", icon: "fa-solid fa-list" },
//   { key: "pizza", label: "Pizza", icon: "fa-solid fa-pizza-slice" },
//   { key: "burger", label: "Burger", icon: "fa-solid fa-burger" },
//   { key: "hot", label: "İsti yeməklər", icon: "fa-solid fa-fire" },
//   { key: "hookah", label: "Qəlyan", icon: "fa-solid fa-smoke" },
//   { key: "drink", label: "İçki", icon: "fa-solid fa-mug-saucer" },
// ];

// const formatAZN = (n) => `${parseFloat(n).toFixed(2)} AZN`;

// export default function App() {
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [cart, setCart] = useState({});
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [tableNumber, setTableNumber] = useState("");

//   // Fetch Google Sheets data
//   useEffect(() => {
//     fetch(SHEET_JSON_URL)
//       .then((res) => res.json())
//       .then((data) => {
//         // Data may need mapping if your sheet columns have headers like: id, title, desc, price, cat, tag
//         const mapped = data.map((item, index) => ({
//           id: index + 1,
//           title: item.title,
//           desc: item.desc,
//           price: parseFloat(item.price),
//           cat: item.cat,
//           tag: item.tag,
//         }));
//         setProducts(mapped);
//       })
//       .catch((err) => console.error("Failed to fetch sheet:", err));
//   }, []);

//   const filteredProducts = useMemo(() => {
//     return products.filter((p) =>
//       selectedCategory === "all" ? true : p.cat === selectedCategory
//     );
//   }, [products, selectedCategory]);

//   const cartItems = useMemo(() => {
//     return Object.keys(cart)
//       .map(Number)
//       .map((id) => {
//         const product = products.find((p) => p.id === id);
//         return { ...product, qty: cart[id] };
//       })
//       .filter(Boolean);
//   }, [cart, products]);

//   const cartCount = useMemo(() => {
//     return cartItems.reduce((sum, i) => sum + i.qty, 0);
//   }, [cartItems]);

//   const total = useMemo(() => {
//     return cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
//   }, [cartItems]);

//   const addToCart = (id) => {
//     setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
//     setIsDrawerOpen(true);
//   };

//   const removeFromCart = (id) => {
//     setCart((prev) => {
//       const next = { ...prev };
//       if (!next[id]) return next;
//       next[id] -= 1;
//       if (next[id] <= 0) delete next[id];
//       return next;
//     });
//   };

//   const clearCart = () => {
//     setCart({});
//   };

//   const checkout = () => {
//     if (cartItems.length === 0) {
//       alert("Səbət boşdur!");
//       return;
//     }

//     if (!tableNumber.trim()) {
//       alert("Zəhmət olmasa masa nömrəsini daxil edin!");
//       return;
//     }

//     const now = new Date();
//     const dateStr = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

//     let msg = `Sifariş:\nMasa: ${tableNumber}\nTarix/Saat: ${dateStr}\n\n`;
//     cartItems.forEach((i) => {
//       msg += `${i.title} x${i.qty} - ${formatAZN(i.price * i.qty)}\n`;
//     });
//     msg += `\nToplam: ${formatAZN(total)}`;

//     const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
//     window.open(url, "_blank");

//     setCart({});
//     setTableNumber("");
//     setIsDrawerOpen(false);
//   };

//   return (
//     <>
//       <div className="container">
//         <header className="topbar">
//           <div className="brand">
//             <div className="logo">DM</div>
//             <div>
//               <h1>DigiMenu Restaurant</h1>
//               <p>WhatsApp Sifariş • QR Menu</p>
//             </div>
//           </div>

//           <div className="chips-container">
//             {categories.map((c) => (
//               <div
//                 key={c.key}
//                 className={`chip ${selectedCategory === c.key ? "active" : ""}`}
//                 onClick={() => setSelectedCategory(c.key)}
//               >
//                 <i className={c.icon}></i> {c.label}
//               </div>
//             ))}
//           </div>

//           <div className="cartBtn" onClick={() => setIsDrawerOpen(true)}>
//             🛒 Səbət <div className="badge">{cartCount}</div>
//           </div>
//         </header>

//         <div className="menuHeader">
//           <div className="menuHeaderLeft">
//             <h2>📋 Menyu</h2>
//             <small>{filteredProducts.length} məhsul</small>
//           </div>
//           <div className="currencyBadge">Qiymətlər • AZN</div>
//         </div>

//         <section className="grid">
//           {filteredProducts.map((p) => (
//             <div className="item" key={p.id}>
//               <div className="itemTop">
//                 <div>
//                   <div className="itemTitle">{p.title}</div>
//                   <div className="itemDesc">{p.desc}</div>
//                 </div>
//                 <div className="tag">{p.tag}</div>
//               </div>

//               <div className="priceRow">
//                 <div className="price">{formatAZN(p.price)}</div>
//                 <button className="addBtn" onClick={() => addToCart(p.id)}>
//                   ➕ Əlavə et
//                 </button>
//               </div>
//             </div>
//           ))}
//         </section>
//       </div>

//       <div className={`overlay ${isDrawerOpen ? "show" : ""}`} onClick={() => setIsDrawerOpen(false)}></div>

//       <aside className={`drawer ${isDrawerOpen ? "show" : ""}`}>
//         <div className="drawerHead">
//           <h3>🛒 Səbət</h3>
//           <button className="closeBtn" onClick={() => setIsDrawerOpen(false)}>
//             Bağla ✖
//           </button>
//         </div>

//         <input
//           className="input"
//           value={tableNumber}
//           onChange={(e) => setTableNumber(e.target.value)}
//           type="text"
//           placeholder="Masa nömrəsini daxil edin..."
//         />

//         <div className="cartList">
//           {cartItems.length === 0 ? (
//             <div style={{ marginTop: 14, color: "var(--muted)", textAlign: "center" }}>
//               Səbət boşdur
//             </div>
//           ) : (
//             cartItems.map((i) => (
//               <div className="cartItem" key={i.id}>
//                 <div>
//                   <b>{i.title}</b>
//                   <small>
//                     {formatAZN(i.price)} x {i.qty}
//                   </small>
//                 </div>

//                 <div className="qty">
//                   <button onClick={() => removeFromCart(i.id)}>-</button>
//                   <span>{i.qty}</span>
//                   <button onClick={() => addToCart(i.id)}>+</button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="cartFooter">
//           <div className="totalRow">
//             <span>Toplam:</span>
//             <span>{formatAZN(total)}</span>
//           </div>

//           <button className="checkoutBtn" onClick={checkout}>
//             WhatsApp ilə sifariş göndər
//           </button>

//           <button className="dangerBtn" onClick={clearCart}>
//             Səbəti təmizlə
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }












// import React, { useEffect, useState, useMemo } from "react";

// const WHATSAPP_NUMBER = "994514195344";
// const SHEET_JSON_URL =
//   "https://opensheet.elk.sh/1-reT1K4Bbv771_JIoz12wRqhNxYOlaJXpLy7VRtH7Cs/menu";

// /* 🌍 Tərcümələr */
// const t = {
//   az: {
//     brandDesc: "WhatsApp Sifariş • QR Menu",
//     menu: "Menyu",
//     cart: "Səbət",
//     add: "Əlavə et",
//     total: "Toplam",
//     empty: "Səbət boşdur",
//     table: "Masa nömrəsini daxil edin...",
//     checkout: "WhatsApp ilə sifariş göndər",
//     clear: "Səbəti təmizlə",
//     close: "Bağla",
//     prices: "Qiymətlər • AZN",
//     product: "məhsul",
//   },
//   en: {
//     brandDesc: "WhatsApp Order • QR Menu",
//     menu: "Menu",
//     cart: "Cart",
//     add: "Add",
//     total: "Total",
//     empty: "Cart is empty",
//     table: "Enter table number...",
//     checkout: "Send order via WhatsApp",
//     clear: "Clear cart",
//     close: "Close",
//     prices: "Prices • AZN",
//     product: "products",
//   },
//   ru: {
//     brandDesc: "Заказ WhatsApp • QR Меню",
//     menu: "Меню",
//     cart: "Корзина",
//     add: "Добавить",
//     total: "Итого",
//     empty: "Корзина пуста",
//     table: "Введите номер стола...",
//     checkout: "Отправить заказ через WhatsApp",
//     clear: "Очистить корзину",
//     close: "Закрыть",
//     prices: "Цены • AZN",
//     product: "товаров",
//   },
// };

// /* 📂 Kateqoriyalar dili ilə */
// const categories = [
//   { key: "all", icon: "fa-solid fa-list", label: { az: "Hamısı", en: "All", ru: "Все" } },
//   { key: "pizza", icon: "fa-solid fa-pizza-slice", label: { az: "Pizza", en: "Pizza", ru: "Пицца" } },
//   { key: "burger", icon: "fa-solid fa-burger", label: { az: "Burger", en: "Burger", ru: "Бургер" } },
//   { key: "hot", icon: "fa-solid fa-fire", label: { az: "İsti", en: "Hot", ru: "Горячее" } },
//   { key: "hookah", icon: "fa-solid fa-smoke", label: { az: "Qəlyan", en: "Hookah", ru: "Кальян" } },
//   { key: "drink", icon: "fa-solid fa-mug-saucer", label: { az: "İçki", en: "Drink", ru: "Напитки" } },
// ];

// const formatAZN = (n) => `${parseFloat(n).toFixed(2)} AZN`;

// export default function App() {
//   const [lang, setLang] = useState("az");
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [cart, setCart] = useState({});
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [tableNumber, setTableNumber] = useState("");

//   /* 📡 Google Sheets-dən data */
//   useEffect(() => {
//     fetch(SHEET_JSON_URL)
//       .then((res) => res.json())
//       .then((data) => {
//         const mapped = data.map((item, index) => ({
//           id: index + 1,
//           title: item[`title_${lang}`] || item.title_az,
//           desc: item[`desc_${lang}`] || item.desc_az,
//           price: parseFloat(item.price),
//           cat: item.cat,
//           tag: item.tag,
//         }));
//         setProducts(mapped);
//       })
//       .catch((err) => console.error("Sheet error:", err));
//   }, [lang]);

//   /* 🔎 Filter edilmiş məhsullar */
//   const filteredProducts = useMemo(
//     () =>
//       products.filter((p) =>
//         selectedCategory === "all" ? true : p.cat === selectedCategory
//       ),
//     [products, selectedCategory]
//   );

//   /* 🛒 Səbət elementləri */
//   const cartItems = useMemo(
//     () =>
//       Object.keys(cart)
//         .map(Number)
//         .map((id) => {
//           const product = products.find((p) => p.id === id);
//           return product ? { ...product, qty: cart[id] } : null;
//         })
//         .filter(Boolean),
//     [cart, products]
//   );

//   const cartCount = useMemo(
//     () => cartItems.reduce((s, i) => s + i.qty, 0),
//     [cartItems]
//   );

//   const total = useMemo(
//     () => cartItems.reduce((s, i) => s + i.price * i.qty, 0),
//     [cartItems]
//   );

//   const addToCart = (id) => {
//     setCart((p) => ({ ...p, [id]: (p[id] || 0) + 1 }));
//     setIsDrawerOpen(true);
//   };

//   const removeFromCart = (id) => {
//     setCart((p) => {
//       const n = { ...p };
//       n[id]--;
//       if (n[id] <= 0) delete n[id];
//       return n;
//     });
//   };

//   const clearCart = () => setCart({});

//   const checkout = () => {
//     if (!cartItems.length) {
//       alert(t[lang].empty);
//       return;
//     }
//     if (!tableNumber.trim()) {
//       alert(t[lang].table);
//       return;
//     }

//     let msg = `${t[lang].cart}\nMasa: ${tableNumber}\n\n`;
//     cartItems.forEach(
//       (i) =>
//         (msg += `${i.title} x${i.qty} - ${formatAZN(i.price * i.qty)}\n`)
//     );
//     msg += `\n${t[lang].total}: ${formatAZN(total)}`;

//     window.open(
//       `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
//       "_blank"
//     );

//     clearCart();
//     setTableNumber("");
//     setIsDrawerOpen(false);
//   };

//   return (
//     <>
//       <div className="container">
//         <header className="topbar">
//           <div className="brand">
//             <div className="logo">DM</div>
//             <div>
//               <h1>DigiMenu</h1>
//               <p>{t[lang].brandDesc}</p>
//             </div>
//           </div>

//           {/* 🌍 Dil seçimi */}
//           <div className="langSwitch">
//             <button onClick={() => setLang("az")}>AZ</button>
//             <button onClick={() => setLang("en")}>EN</button>
//             <button onClick={() => setLang("ru")}>RU</button>
//           </div>

//           {/* 📂 Kateqoriyalar */}
//           <div className="chips-container">
//             {categories.map((c) => (
//               <div
//                 key={c.key}
//                 className={`chip ${selectedCategory === c.key ? "active" : ""}`}
//                 onClick={() => setSelectedCategory(c.key)}
//               >
//                 <i className={c.icon}></i> {c.label[lang]}
//               </div>
//             ))}
//           </div>

//           {/* 🛒 Səbət */}
//           <div className="cartBtn" onClick={() => setIsDrawerOpen(true)}>
//             🛒 {t[lang].cart} <div className="badge">{cartCount}</div>
//           </div>
//         </header>

//         <div className="menuHeader">
//           <div className="menuHeaderLeft">
//             <h2>📋 {t[lang].menu}</h2>
//             <small>
//               {filteredProducts.length} {t[lang].product}
//             </small>
//           </div>
//           <div className="currencyBadge">{t[lang].prices}</div>
//         </div>

//         <section className="grid">
//           {filteredProducts.map((p) => (
//             <div className="item" key={p.id}>
//               <div className="itemTop">
//                 <div>
//                   <div className="itemTitle">{p.title}</div>
//                   <div className="itemDesc">{p.desc}</div>
//                 </div>
//                 <div className="tag">{p.tag}</div>
//               </div>
//               <div className="priceRow">
//                 <div className="price">{formatAZN(p.price)}</div>
//                 <button className="addBtn" onClick={() => addToCart(p.id)}>
//                   ➕ {t[lang].add}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </section>
//       </div>

//       {/* 🛒 Drawer */}
//       <div className={`overlay ${isDrawerOpen ? "show" : ""}`} onClick={() => setIsDrawerOpen(false)}></div>

//       <aside className={`drawer ${isDrawerOpen ? "show" : ""}`}>
//         <div className="drawerHead">
//           <h3>🛒 {t[lang].cart}</h3>
//           <button className="closeBtn" onClick={() => setIsDrawerOpen(false)}>
//             {t[lang].close} ✖
//           </button>
//         </div>

//         <input
//           className="input"
//           value={tableNumber}
//           onChange={(e) => setTableNumber(e.target.value)}
//           type="text"
//           placeholder={t[lang].table}
//         />

//         <div className="cartList">
//           {cartItems.length === 0 ? (
//             <div style={{ marginTop: 14, color: "var(--muted)", textAlign: "center" }}>
//               {t[lang].empty}
//             </div>
//           ) : (
//             cartItems.map((i) => (
//               <div className="cartItem" key={i.id}>
//                 <div>
//                   <b>{i.title}</b>
//                   <small>
//                     {formatAZN(i.price)} x {i.qty}
//                   </small>
//                 </div>
//                 <div className="qty">
//                   <button onClick={() => removeFromCart(i.id)}>-</button>
//                   <span>{i.qty}</span>
//                   <button onClick={() => addToCart(i.id)}>+</button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="cartFooter">
//           <div className="totalRow">
//             <span>{t[lang].total}:</span>
//             <span>{formatAZN(total)}</span>
//           </div>
//           <button className="checkoutBtn" onClick={checkout}>
//             {t[lang].checkout}
//           </button>
//           <button className="dangerBtn" onClick={clearCart}>
//             {t[lang].clear}
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }













// import React, { useEffect, useState, useMemo } from "react";

// const WHATSAPP_NUMBER = "994514195344";
// const SHEET_JSON_URL =
//   "https://opensheet.elk.sh/1-reT1K4Bbv771_JIoz12wRqhNxYOlaJXpLy7VRtH7Cs/menu";

// /* 🌍 Tərcümələr */
// const t = {
//   az: {
//     brandDesc: "WhatsApp Sifariş • QR Menu",
//     all: "Hamısı",
//     pizza: "Pizza",
//     burger: "Burger",
//     hot: "İsti yeməklər",
//     hookah: "Qəlyan",
//     drink: "İçki",
//     menu: "Menyu",
//     cart: "Səbət",
//     add: "Əlavə et",
//     total: "Toplam",
//     empty: "Səbət boşdur",
//     table: "Masa nömrəsini daxil edin...",
//     tableAlert: "Zəhmət olmasa masa nömrəsini daxil edin!",
//     checkout: "WhatsApp ilə sifariş göndər",
//     clear: "Səbəti təmizlə",
//     close: "Bağla",
//     prices: "Qiymətlər • AZN",
//     product: "məhsul",
//   },
//   en: {
//     brandDesc: "WhatsApp Order • QR Menu",
//     all: "All",
//     pizza: "Pizza",
//     burger: "Burger",
//     hot: "Hot meals",
//     hookah: "Hookah",
//     drink: "Drink",
//     menu: "Menu",
//     cart: "Cart",
//     add: "Add",
//     total: "Total",
//     empty: "Cart is empty",
//     table: "Enter table number...",
//     tableAlert: "Please enter table number!",
//     checkout: "Send order via WhatsApp",
//     clear: "Clear cart",
//     close: "Close",
//     prices: "Prices • AZN",
//     product: "products",
//   },
//   ru: {
//     brandDesc: "Заказ WhatsApp • QR Меню",
//     all: "Все",
//     pizza: "Пицца",
//     burger: "Бургер",
//     hot: "Горячие блюда",
//     hookah: "Кальян",
//     drink: "Напитки",
//     menu: "Меню",
//     cart: "Корзина",
//     add: "Добавить",
//     total: "Итого",
//     empty: "Корзина пуста",
//     table: "Введите номер стола...",
//     tableAlert: "Пожалуйста, введите номер стола!",
//     checkout: "Отправить заказ через WhatsApp",
//     clear: "Очистить корзину",
//     close: "Закрыть",
//     prices: "Цены • AZN",
//     product: "товаров",
//   },
// };

// /* 📂 Kateqoriyalar */
// const categories = ["all", "pizza", "burger", "hot", "hookah", "drink"];

// const formatAZN = (n) => `${parseFloat(n).toFixed(2)} AZN`;

// export default function App() {
//   const [lang, setLang] = useState("az");
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [cart, setCart] = useState({});
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [tableNumber, setTableNumber] = useState("");
//   const [timeLimitReached, setTimeLimitReached] = useState(false);

//   /* 📡 Google Sheets-dən data (active = yes yoxlanır) */
//   useEffect(() => {
//     fetch(SHEET_JSON_URL)
//       .then((res) => res.json())
//       .then((data) => {
//         const mapped = data
//           .filter(item => item.active === "yes") // yalnız aktiv məhsullar qalır
//           .map((item, index) => ({
//             id: index + 1,
//             title: item[`title_${lang}`] || item.title,
//             desc: item[`desc_${lang}`] || item.desc,
//             price: parseFloat(item.price),
//             cat: item.cat,
//             tag: item.tag,
//           }));
//         setProducts(mapped);
//       })
//       .catch((err) => console.error("Sheet error:", err));
//   }, [lang]);

//   /* ⏱ Səbət üçün 30 dəq limit */
//   useEffect(() => {
//     if (!tableNumber) return;
//     setTimeLimitReached(false);
//     const timer = setTimeout(() => setTimeLimitReached(true), 30 * 60 * 1000); // 30 dəq
//     return () => clearTimeout(timer);
//   }, [tableNumber]);

//   const filteredProducts = useMemo(
//     () =>
//       products.filter((p) =>
//         selectedCategory === "all" ? true : p.cat === selectedCategory
//       ),
//     [products, selectedCategory]
//   );

//   const cartItems = useMemo(
//     () =>
//       Object.keys(cart)
//         .map(Number)
//         .map((id) => {
//           const product = products.find((p) => p.id === id);
//           return product ? { ...product, qty: cart[id] } : null;
//         })
//         .filter(Boolean),
//     [cart, products]
//   );

//   const cartCount = useMemo(
//     () => cartItems.reduce((s, i) => s + i.qty, 0),
//     [cartItems]
//   );

//   const total = useMemo(
//     () => cartItems.reduce((s, i) => s + i.price * i.qty, 0),
//     [cartItems]
//   );

//   const addToCart = (id) => {
//     if (timeLimitReached) return;
//     setCart((p) => ({ ...p, [id]: (p[id] || 0) + 1 }));
//     setIsDrawerOpen(true);
//   };

//   const removeFromCart = (id) => {
//     if (timeLimitReached) return;
//     setCart((p) => {
//       const n = { ...p };
//       n[id]--;
//       if (n[id] <= 0) delete n[id];
//       return n;
//     });
//   };

//   const clearCart = () => {
//     if (timeLimitReached) return;
//     setCart({});
//   };

//   const checkout = () => {
//     if (timeLimitReached || !cartItems.length) return;

//     if (!tableNumber.trim()) {
//       alert(t[lang].tableAlert);
//       return;
//     }

//     let msg = `${t[lang].cart}\nMasa: ${tableNumber}\n\n`;
//     cartItems.forEach(
//       (i) =>
//         (msg += `${i.title} x${i.qty} - ${formatAZN(i.price * i.qty)}\n`)
//     );
//     msg += `\n${t[lang].total}: ${formatAZN(total)}`;

//     window.open(
//       `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
//       "_blank"
//     );

//     clearCart();
//     setTableNumber("");
//     setIsDrawerOpen(false);
//   };

//   return (
//     <>
//       <div className="container">
//         <header className="topbar">
//           <div className="brand">
//             <div className="logo">DM</div>
//             <div>
//               <h1>DigiMenu</h1>
//               <p>{t[lang].brandDesc}</p>
//             </div>
//           </div>

//           {/* 🌍 Dil seçimi */}
//           <div className="langSwitch">
//             <button onClick={() => setLang("az")}>AZ</button>
//             <button onClick={() => setLang("en")}>EN</button>
//             <button onClick={() => setLang("ru")}>RU</button>
//           </div>

//           {/* 🏷 Kateqoriyalar */}
//           <div className="chips-container">
//             {categories.map((c) => (
//               <div
//                 key={c}
//                 className={`chip ${selectedCategory === c ? "active" : ""}`}
//                 onClick={() => setSelectedCategory(c)}
//               >
//                 {c === "all" ? t[lang].all : t[lang][c]}
//               </div>
//             ))}
//           </div>

//           <div className="cartBtn" onClick={() => setIsDrawerOpen(true)}>
//             🛒 {t[lang].cart} <div className="badge">{cartCount}</div>
//           </div>
//         </header>

//         <div className="menuHeader">
//           <h2>📋 {t[lang].menu}</h2>
//           <small>
//             {filteredProducts.length} {t[lang].product}
//           </small>
//           <div className="currencyBadge">{t[lang].prices}</div>
//         </div>

//         <section className="grid">
//           {filteredProducts.map((p) => (
//             <div className="item" key={p.id}>
//               <div className="itemTop">
//                 <div>
//                   <div className="itemTitle">{p.title}</div>
//                   <div className="itemDesc">{p.desc}</div>
//                 </div>
//                 <div className="tag">{p.tag}</div>
//               </div>

//               <div className="priceRow">
//                 <div className="price">{formatAZN(p.price)}</div>
//                 <button
//                   className="addBtn"
//                   disabled={timeLimitReached}
//                   onClick={() => addToCart(p.id)}
//                 >
//                   ➕ {t[lang].add}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </section>
//       </div>

//       <div
//         className={`overlay ${isDrawerOpen ? "show" : ""}`}
//         onClick={() => setIsDrawerOpen(false)}
//       ></div>

//       <aside className={`drawer ${isDrawerOpen ? "show" : ""}`}>
//         <div className="drawerHead">
//           <h3>🛒 {t[lang].cart}</h3>
//           <button className="closeBtn" onClick={() => setIsDrawerOpen(false)}>
//             {t[lang].close} ✖
//           </button>
//         </div>

//         <input
//           className="input"
//           value={tableNumber}
//           onChange={(e) => setTableNumber(e.target.value)}
//           type="text"
//           placeholder={t[lang].table}
//         />

//         <div className="cartList">
//           {cartItems.length === 0 ? (
//             <div
//               style={{ marginTop: 14, color: "var(--muted)", textAlign: "center" }}
//             >
//               {t[lang].empty}
//             </div>
//           ) : (
//             cartItems.map((i) => (
//               <div className="cartItem" key={i.id}>
//                 <div>
//                   <b>{i.title}</b>
//                   <small>
//                     {formatAZN(i.price)} x {i.qty}
//                   </small>
//                 </div>

//                 <div className="qty">
//                   <button disabled={timeLimitReached} onClick={() => removeFromCart(i.id)}>
//                     -
//                   </button>
//                   <span>{i.qty}</span>
//                   <button disabled={timeLimitReached} onClick={() => addToCart(i.id)}>
//                     +
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="cartFooter">
//           <div className="totalRow">
//             <span>{t[lang].total}:</span>
//             <span>{formatAZN(total)}</span>
//           </div>

//           <button
//             className="checkoutBtn"
//             disabled={timeLimitReached || !cartItems.length}
//             onClick={checkout}
//           >
//             {t[lang].checkout}
//           </button>

//           <button className="dangerBtn" disabled={timeLimitReached} onClick={clearCart}>
//             {t[lang].clear}
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }


















// import React, { useEffect, useState, useMemo } from "react";
// import { createSession, checkSession, setTableId } from "./session";

// const WHATSAPP_NUMBER = "994514195344";
// const SHEET_JSON_URL =
//   "https://opensheet.elk.sh/1-reT1K4Bbv771_JIoz12wRqhNxYOlaJXpLy7VRtH7Cs/menu";

// /* 🌍 Tərcümələr */
// const t = {
//   az: {
//     brandDesc: "WhatsApp Sifariş • QR Menu",
//     all: "Hamısı",
//     pizza: "Pizza",
//     burger: "Burger",
//     hot: "İsti yeməklər",
//     hookah: "Qəlyan",
//     drink: "İçki",
//     menu: "Menyu",
//     cart: "Səbət",
//     add: "Əlavə et",
//     total: "Toplam",
//     empty: "Səbət boşdur",
//     table: "Masa nömrəsini daxil edin...",
//     tableAlert: "Zəhmət olmasa masa nömrəsini daxil edin!",
//     checkout: "WhatsApp ilə sifariş göndər",
//     clear: "Səbəti təmizlə",
//     close: "Bağla",
//     prices: "Qiymətlər • AZN",
//     product: "məhsul",
//   },
//   en: {
//     brandDesc: "WhatsApp Order • QR Menu",
//     all: "All",
//     pizza: "Pizza",
//     burger: "Burger",
//     hot: "Hot meals",
//     hookah: "Hookah",
//     drink: "Drink",
//     menu: "Menu",
//     cart: "Cart",
//     add: "Add",
//     total: "Total",
//     empty: "Cart is empty",
//     table: "Enter table number...",
//     tableAlert: "Please enter table number!",
//     checkout: "Send order via WhatsApp",
//     clear: "Clear cart",
//     close: "Close",
//     prices: "Prices • AZN",
//     product: "products",
//   },
//   ru: {
//     brandDesc: "Заказ WhatsApp • QR Меню",
//     all: "Все",
//     pizza: "Пицца",
//     burger: "Бургер",
//     hot: "Горячие блюда",
//     hookah: "Кальян",
//     drink: "Напитки",
//     menu: "Меню",
//     cart: "Корзина",
//     add: "Добавить",
//     total: "Итого",
//     empty: "Корзина пуста",
//     table: "Введите номер стола...",
//     tableAlert: "Пожалуйста, введите номер стола!",
//     checkout: "Отправить заказ через WhatsApp",
//     clear: "Очистить корзину",
//     close: "Закрыть",
//     prices: "Цены • AZN",
//     product: "товаров",
//   },
// };

// const categories = ["all", "pizza", "burger", "hot", "hookah", "drink"];
// const formatAZN = (n) => `${parseFloat(n).toFixed(2)} AZN`;

// export default function App() {
//   const [lang, setLang] = useState("az");
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [cart, setCart] = useState({});
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [tableNumber, setTableNumber] = useState("");
//   const [timeLimitReached, setTimeLimitReached] = useState(false);
//   const [blocked, setBlocked] = useState(false);
//   const [sessionReady, setSessionReady] = useState(false); // Session hazır olub olmadığını izləyir

//   /* 🔒 Session başlatmaq */
//   useEffect(() => {
//     const init = async () => {
//       try {
//         const sessionId = sessionStorage.getItem("sessionId");
//         const tableId = sessionStorage.getItem("tableId");
//         if (sessionId && tableId) {
//           const valid = await checkSession();
//           if (!valid) setBlocked(true);
//           else setSessionReady(true);
//         }
//       } catch (err) {
//         console.error("Session yoxlanmadı:", err);
//       }
//     };
//     init();
//   }, []);

//   /* 📡 Google Sheets-dən data (active = yes) */
//   useEffect(() => {
//     fetch(SHEET_JSON_URL)
//       .then((res) => res.json())
//       .then((data) => {
//         const mapped = data
//           .filter((item) => item.active === "yes")
//           .map((item, index) => ({
//             id: index + 1,
//             title: item[`title_${lang}`] || item.title,
//             desc: item[`desc_${lang}`] || item.desc,
//             price: parseFloat(item.price),
//             cat: item.cat,
//             tag: item.tag,
//           }));
//         setProducts(mapped);
//       })
//       .catch((err) => console.error("Sheet error:", err));
//   }, [lang]);

//   /* ⏱ 30 dəq limit */
//   useEffect(() => {
//     if (!tableNumber) return;
//     setTimeLimitReached(false);
//     const timer = setTimeout(() => setTimeLimitReached(true), 30 * 60 * 1000);
//     return () => clearTimeout(timer);
//   }, [tableNumber]);

//   const filteredProducts = useMemo(
//     () =>
//       products.filter((p) =>
//         selectedCategory === "all" ? true : p.cat === selectedCategory
//       ),
//     [products, selectedCategory]
//   );

//   const cartItems = useMemo(
//     () =>
//       Object.keys(cart)
//         .map(Number)
//         .map((id) => {
//           const product = products.find((p) => p.id === id);
//           return product ? { ...product, qty: cart[id] } : null;
//         })
//         .filter(Boolean),
//     [cart, products]
//   );

//   const cartCount = useMemo(
//     () => cartItems.reduce((s, i) => s + i.qty, 0),
//     [cartItems]
//   );

//   const total = useMemo(
//     () => cartItems.reduce((s, i) => s + i.price * i.qty, 0),
//     [cartItems]
//   );

//   const handleAddToCart = async (id) => {
//     const valid = await checkSession();
//     if (!valid) {
//       alert("Session bitib. Zəhmət olmasa QR kodu yenidən skan edin.");
//       setBlocked(true);
//       return;
//     }
//     setCart((p) => ({ ...p, [id]: (p[id] || 0) + 1 }));
//     setIsDrawerOpen(true);
//   };

//   const handleRemoveFromCart = (id) => {
//     setCart((p) => {
//       const n = { ...p };
//       n[id]--;
//       if (n[id] <= 0) delete n[id];
//       return n;
//     });
//   };

//   const handleClearCart = () => setCart({});

//   const handleStartSession = async () => {
//     if (!tableNumber.trim()) {
//       alert(t[lang].tableAlert);
//       return;
//     }

//     await createSession(tableNumber);
//     setSessionReady(true);
//   };

//   const handleCheckout = async () => {
//     if (!tableNumber.trim()) {
//       alert(t[lang].tableAlert);
//       return;
//     }

//     await setTableId(tableNumber);

//     const valid = await checkSession();
//     if (!valid) {
//       alert("Session bitib. Zəhmət olmasa QR kodu yenidən skan edin.");
//       setBlocked(true);
//       return;
//     }

//     let now = new Date();
//     let msg = `Masa: ${tableNumber}\nVaxt: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}\n\n`;
//     cartItems.forEach(
//       (i) => (msg += `${i.title} x${i.qty} - ${formatAZN(i.price * i.qty)}\n`)
//     );
//     msg += `\nToplam: ${formatAZN(total)}`;

//     window.open(
//       `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
//       "_blank"
//     );

//     setCart({});
//     setIsDrawerOpen(false);
//     setTableNumber("");
//     setSessionReady(false);
//   };

//   if (blocked) {
//     return (
//       <div style={{ padding: 40, textAlign: "center" }}>
//         ❌ Session bitib <br />
//         Zəhmət olmasa QR kodu yenidən skan edin
//       </div>
//     );
//   }

//   if (!sessionReady) {
//     // Session hələ başlamayıbsa masa nömrəsini soruş
//     return (
//       <div style={{ padding: 40, textAlign: "center" }}>
//         <h2>📌 Zəhmət olmasa masa nömrəsini daxil edin</h2>
//         <input
//           style={{ fontSize: 18, padding: 8, marginTop: 12 }}
//           value={tableNumber}
//           onChange={(e) => setTableNumber(e.target.value)}
//           placeholder={t[lang].table}
//           type="text"
//         />
//         <br />
//         <button
//           style={{ marginTop: 12, padding: "8px 16px", fontSize: 16 }}
//           onClick={handleStartSession}
//         >
//           Başla
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="container">
//         <header className="topbar">
//           <div className="brand">
//             <div className="logo">DM</div>
//             <div>
//               <h1>DigiMenu</h1>
//               <p>{t[lang].brandDesc}</p>
//             </div>
//           </div>

//           {/* Dil seçimi */}
//           <div className="langSwitch">
//             <button onClick={() => setLang("az")}>AZ</button>
//             <button onClick={() => setLang("en")}>EN</button>
//             <button onClick={() => setLang("ru")}>RU</button>
//           </div>

//           {/* Kateqoriyalar */}
//           <div className="chips-container">
//             {categories.map((c) => (
//               <div
//                 key={c}
//                 className={`chip ${selectedCategory === c ? "active" : ""}`}
//                 onClick={() => setSelectedCategory(c)}
//               >
//                 {c === "all" ? t[lang].all : t[lang][c]}
//               </div>
//             ))}
//           </div>

//           <div className="cartBtn" onClick={() => setIsDrawerOpen(true)}>
//             🛒 {t[lang].cart} <div className="badge">{cartCount}</div>
//           </div>
//         </header>

//         <div className="menuHeader">
//           <h2>📋 {t[lang].menu}</h2>
//           <small>
//             {filteredProducts.length} {t[lang].product}
//           </small>
//           <div className="currencyBadge">{t[lang].prices}</div>
//         </div>

//         <section className="grid">
//           {filteredProducts.map((p) => (
//             <div className="item" key={p.id}>
//               <div className="itemTop">
//                 <div>
//                   <div className="itemTitle">{p.title}</div>
//                   <div className="itemDesc">{p.desc}</div>
//                 </div>
//                 <div className="tag">{p.tag}</div>
//               </div>

//               <div className="priceRow">
//                 <div className="price">{formatAZN(p.price)}</div>
//                 <button
//                   className="addBtn"
//                   disabled={timeLimitReached}
//                   onClick={() => handleAddToCart(p.id)}
//                 >
//                   ➕ {t[lang].add}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </section>
//       </div>

//       <div
//         className={`overlay ${isDrawerOpen ? "show" : ""}`}
//         onClick={() => setIsDrawerOpen(false)}
//       ></div>

//       <aside className={`drawer ${isDrawerOpen ? "show" : ""}`}>
//         <div className="drawerHead">
//           <h3>🛒 {t[lang].cart}</h3>
//           <button className="closeBtn" onClick={() => setIsDrawerOpen(false)}>
//             {t[lang].close} ✖
//           </button>
//         </div>

//         <input
//           className="input"
//           value={tableNumber}
//           onChange={(e) => setTableNumber(e.target.value)}
//           type="text"
//           placeholder={t[lang].table}
//         />

//         <div className="cartList">
//           {cartItems.length === 0 ? (
//             <div
//               style={{ marginTop: 14, color: "var(--muted)", textAlign: "center" }}
//             >
//               {t[lang].empty}
//             </div>
//           ) : (
//             cartItems.map((i) => (
//               <div className="cartItem" key={i.id}>
//                 <div>
//                   <b>{i.title}</b>
//                   <small>
//                     {formatAZN(i.price)} x {i.qty}
//                   </small>
//                 </div>

//                 <div className="qty">
//                   <button
//                     disabled={timeLimitReached}
//                     onClick={() => handleRemoveFromCart(i.id)}
//                   >
//                     -
//                   </button>
//                   <span>{i.qty}</span>
//                   <button
//                     disabled={timeLimitReached}
//                     onClick={() => handleAddToCart(i.id)}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="cartFooter">
//           <div className="totalRow">
//             <span>{t[lang].total}:</span>
//             <span>{formatAZN(total)}</span>
//           </div>

//           <button className="checkoutBtn" onClick={handleCheckout}>
//             {t[lang].checkout}
//           </button>

//           <button className="dangerBtn" onClick={handleClearCart}>
//             {t[lang].clear}
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }












// import React, { useEffect, useState, useMemo } from "react";
// import { createSession, checkSession, setTableId } from "./session";

// const WHATSAPP_NUMBER = "994514195344";
// const SHEET_JSON_URL =
//   "https://opensheet.elk.sh/1-reT1K4Bbv771_JIoz12wRqhNxYOlaJXpLy7VRtH7Cs/menu";

// /* 🌍 Tərcümələr */
// const t = {
//   az: {
//     brandDesc: "WhatsApp Sifariş • QR Menu",
//     all: "Hamısı",
//     pizza: "Pizza",
//     burger: "Burger",
//     hot: "İsti yeməklər",
//     hookah: "Qəlyan",
//     drink: "İçki",
//     menu: "Menyu",
//     cart: "Səbət",
//     add: "Əlavə et",
//     total: "Toplam",
//     empty: "Səbət boşdur",
//     table: "Masa nömrəsini daxil edin...",
//     tableAlert: "Zəhmət olmasa masa nömrəsini daxil edin!",
//     checkout: "WhatsApp ilə sifariş göndər",
//     clear: "Səbəti təmizlə",
//     close: "Bağla",
//     prices: "Qiymətlər • AZN",
//     product: "məhsul",
//   },
//   en: {
//     brandDesc: "WhatsApp Order • QR Menu",
//     all: "All",
//     pizza: "Pizza",
//     burger: "Burger",
//     hot: "Hot meals",
//     hookah: "Hookah",
//     drink: "Drink",
//     menu: "Menu",
//     cart: "Cart",
//     add: "Add",
//     total: "Total",
//     empty: "Cart is empty",
//     table: "Enter table number...",
//     tableAlert: "Please enter table number!",
//     checkout: "Send order via WhatsApp",
//     clear: "Clear cart",
//     close: "Close",
//     prices: "Prices • AZN",
//     product: "products",
//   },
//   ru: {
//     brandDesc: "Заказ WhatsApp • QR Меню",
//     all: "Все",
//     pizza: "Пицца",
//     burger: "Бургер",
//     hot: "Горячие блюда",
//     hookah: "Кальян",
//     drink: "Напитки",
//     menu: "Меню",
//     cart: "Корзина",
//     add: "Добавить",
//     total: "Итого",
//     empty: "Корзина пуста",
//     table: "Введите номер стола...",
//     tableAlert: "Пожалуйста, введите номер стола!",
//     checkout: "Отправить заказ через WhatsApp",
//     clear: "Очистить корзину",
//     close: "Закрыть",
//     prices: "Цены • AZN",
//     product: "товаров",
//   },
// };

// const categories = ["all", "pizza", "burger", "hot", "hookah", "drink"];
// const formatAZN = (n) => `${parseFloat(n).toFixed(2)} AZN`;

// export default function App() {
//   const [lang, setLang] = useState("az");
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [cart, setCart] = useState({});
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [tableNumber, setTableNumber] = useState("");
//   const [timeLimitReached, setTimeLimitReached] = useState(false);
//   const [blocked, setBlocked] = useState(false);
//   const [sessionReady, setSessionReady] = useState(false); // Session hazır olub olmadığını izləyir

//   /* 🔒 Session başlatmaq */
//   useEffect(() => {
//     const init = async () => {
//       try {
//         const sessionId = sessionStorage.getItem("sessionId");
//         const tableId = sessionStorage.getItem("tableId");
//         if (sessionId && tableId) {
//           const valid = await checkSession();
//           if (!valid) setBlocked(true);
//           else setSessionReady(true);
//         }
//       } catch (err) {
//         console.error("Session yoxlanmadı:", err);
//       }
//     };
//     init();
//   }, []);

//   /* 📡 Google Sheets-dən data (active = yes) */
//   useEffect(() => {
//     fetch(SHEET_JSON_URL)
//       .then((res) => res.json())
//       .then((data) => {
//         const mapped = data
//           .filter((item) => item.active === "yes")
//           .map((item, index) => ({
//             id: index + 1,
//             title: item[`title_${lang}`] || item.title,
//             desc: item[`desc_${lang}`] || item.desc,
//             price: parseFloat(item.price),
//             cat: item.cat,
//             tag: item.tag,
//           }));
//         setProducts(mapped);
//       })
//       .catch((err) => console.error("Sheet error:", err));
//   }, [lang]);

//   /* ⏱ 30 dəq limit */
//   useEffect(() => {
//     if (!tableNumber) return;
//     setTimeLimitReached(false);
//     const timer = setTimeout(() => setTimeLimitReached(true), 30 * 60 * 1000);
//     return () => clearTimeout(timer);
//   }, [tableNumber]);

//   const filteredProducts = useMemo(
//     () =>
//       products.filter((p) =>
//         selectedCategory === "all" ? true : p.cat === selectedCategory
//       ),
//     [products, selectedCategory]
//   );

//   const cartItems = useMemo(
//     () =>
//       Object.keys(cart)
//         .map(Number)
//         .map((id) => {
//           const product = products.find((p) => p.id === id);
//           return product ? { ...product, qty: cart[id] } : null;
//         })
//         .filter(Boolean),
//     [cart, products]
//   );

//   const cartCount = useMemo(
//     () => cartItems.reduce((s, i) => s + i.qty, 0),
//     [cartItems]
//   );

//   const total = useMemo(
//     () => cartItems.reduce((s, i) => s + i.price * i.qty, 0),
//     [cartItems]
//   );

//   const handleAddToCart = async (id) => {
//     const valid = await checkSession();
//     if (!valid) {
//       alert("Session bitib. Zəhmət olmasa QR kodu yenidən skan edin.");
//       setBlocked(true);
//       return;
//     }
//     setCart((p) => ({ ...p, [id]: (p[id] || 0) + 1 }));
//     setIsDrawerOpen(true);
//   };

//   const handleRemoveFromCart = (id) => {
//     setCart((p) => {
//       const n = { ...p };
//       n[id]--;
//       if (n[id] <= 0) delete n[id];
//       return n;
//     });
//   };

//   const handleClearCart = () => setCart({});

//   const handleStartSession = async () => {
//     if (!tableNumber.trim()) {
//       alert(t[lang].tableAlert);
//       return;
//     }

//     await createSession(tableNumber);
//     setSessionReady(true);
//   };

//   const handleCheckout = async () => {
//     if (!tableNumber.trim()) {
//       alert(t[lang].tableAlert);
//       return;
//     }

//     await setTableId(tableNumber);

//     const valid = await checkSession();
//     if (!valid) {
//       alert("Session bitib. Zəhmət olmasa QR kodu yenidən skan edin.");
//       setBlocked(true);
//       return;
//     }

//     let now = new Date();
//     let msg = `Masa: ${tableNumber}\nVaxt: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}\n\n`;
//     cartItems.forEach(
//       (i) => (msg += `${i.title} x${i.qty} - ${formatAZN(i.price * i.qty)}\n`)
//     );
//     msg += `\nToplam: ${formatAZN(total)}`;

//     window.open(
//       `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
//       "_blank"
//     );

//     setCart({});
//     setIsDrawerOpen(false);
//     setTableNumber("");
//     setSessionReady(false);
//   };

//   if (blocked) {
//     return (
//       <div style={{ padding: 40, textAlign: "center" }}>
//         ❌ Session bitib <br />
//         Zəhmət olmasa QR kodu yenidən skan edin
//       </div>
//     );
//   }

//   if (!sessionReady) {
//     // Session hələ başlamayıbsa masa nömrəsini soruş
//     return (
//       <div style={{ padding: 40, textAlign: "center" }}>
//         <h2>📌 Zəhmət olmasa masa nömrəsini daxil edin</h2>
//         <input
//           style={{ fontSize: 18, padding: 8, marginTop: 12 }}
//           value={tableNumber}
//           onChange={(e) => setTableNumber(e.target.value)}
//           placeholder={t[lang].table}
//           type="text"
//         />
//         <br />
//         <button
//           style={{ marginTop: 12, padding: "8px 16px", fontSize: 16 }}
//           onClick={handleStartSession}
//         >
//           Başla
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="container">
//         <header className="topbar">
//           <div className="brand">
//             <div className="logo">DM</div>
//             <div>
//               <h1>DigiMenu</h1>
//               <p>{t[lang].brandDesc}</p>
//             </div>
//           </div>

//           {/* Dil seçimi */}
//           <div className="langSwitch">
//             <button onClick={() => setLang("az")}>AZ</button>
//             <button onClick={() => setLang("en")}>EN</button>
//             <button onClick={() => setLang("ru")}>RU</button>
//           </div>

//           {/* Kateqoriyalar */}
//           <div className="chips-container">
//             {categories.map((c) => (
//               <div
//                 key={c}
//                 className={`chip ${selectedCategory === c ? "active" : ""}`}
//                 onClick={() => setSelectedCategory(c)}
//               >
//                 {c === "all" ? t[lang].all : t[lang][c]}
//               </div>
//             ))}
//           </div>

//           <div className="cartBtn" onClick={() => setIsDrawerOpen(true)}>
//             🛒 {t[lang].cart} <div className="badge">{cartCount}</div>
//           </div>
//         </header>

//         <div className="menuHeader">
//           <h2>📋 {t[lang].menu}</h2>
//           <small>
//             {filteredProducts.length} {t[lang].product}
//           </small>
//           <div className="currencyBadge">{t[lang].prices}</div>
//         </div>

//         <section className="grid">
//           {filteredProducts.map((p) => (
//             <div className="item" key={p.id}>
//               <div className="itemTop">
//                 <div>
//                   <div className="itemTitle">{p.title}</div>
//                   <div className="itemDesc">{p.desc}</div>
//                 </div>
//                 <div className="tag">{p.tag}</div>
//               </div>

//               <div className="priceRow">
//                 <div className="price">{formatAZN(p.price)}</div>
//                 <button
//                   className="addBtn"
//                   disabled={timeLimitReached}
//                   onClick={() => handleAddToCart(p.id)}
//                 >
//                   ➕ {t[lang].add}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </section>
//       </div>

//       <div
//         className={`overlay ${isDrawerOpen ? "show" : ""}`}
//         onClick={() => setIsDrawerOpen(false)}
//       ></div>

//       <aside className={`drawer ${isDrawerOpen ? "show" : ""}`}>
//         <div className="drawerHead">
//           <h3>🛒 {t[lang].cart}</h3>
//           <button className="closeBtn" onClick={() => setIsDrawerOpen(false)}>
//             {t[lang].close} ✖
//           </button>
//         </div>

//         <input
//           className="input"
//           value={tableNumber}
//           onChange={(e) => setTableNumber(e.target.value)}
//           type="text"
//           placeholder={t[lang].table}
//         />

//         <div className="cartList">
//           {cartItems.length === 0 ? (
//             <div
//               style={{ marginTop: 14, color: "var(--muted)", textAlign: "center" }}
//             >
//               {t[lang].empty}
//             </div>
//           ) : (
//             cartItems.map((i) => (
//               <div className="cartItem" key={i.id}>
//                 <div>
//                   <b>{i.title}</b>
//                   <small>
//                     {formatAZN(i.price)} x {i.qty}
//                   </small>
//                 </div>

//                 <div className="qty">
//                   <button
//                     disabled={timeLimitReached}
//                     onClick={() => handleRemoveFromCart(i.id)}
//                   >
//                     -
//                   </button>
//                   <span>{i.qty}</span>
//                   <button
//                     disabled={timeLimitReached}
//                     onClick={() => handleAddToCart(i.id)}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="cartFooter">
//           <div className="totalRow">
//             <span>{t[lang].total}:</span>
//             <span>{formatAZN(total)}</span>
//           </div>

//           <button className="checkoutBtn" onClick={handleCheckout}>
//             {t[lang].checkout}
//           </button>

//           <button className="dangerBtn" onClick={handleClearCart}>
//             {t[lang].clear}
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }


























import React, { useEffect, useState, useMemo } from "react";
import { createSession, checkSession, setTableId } from "./session";

const WHATSAPP_NUMBER = "994514195344";
const SHEET_JSON_URL =
  "https://opensheet.elk.sh/1-reT1K4Bbv771_JIoz12wRqhNxYOlaJXpLy7VRtH7Cs/menu";

/* 🌍 Tərcümələr */
const t = {
  az: {
    brandDesc: "WhatsApp Sifariş • QR Menu",
    all: "Hamısı",
    pizza: "Pizza",
    burger: "Burger",
    hot: "İsti yeməklər",
    hookah: "Qəlyan",
    drink: "İçki",
    menu: "Menyu",
    cart: "Səbət",
    add: "Əlavə et",
    total: "Toplam",
    empty: "Səbət boşdur",
    table: "Masa nömrəsini daxil edin...",
    tableAlert: "Zəhmət olmasa masa nömrəsini daxil edin!",
    checkout: "WhatsApp ilə sifariş göndər",
    clear: "Səbəti təmizlə",
    close: "Bağla",
    prices: "Qiymətlər • AZN",
    product: "məhsul",
    note: "Qeyd (istəyə bağlı)",
    rate: "Xidməti qiymətləndirin",
    thanks: "Sifariş göndərildi. Zəhmət olmasa xidməti qiymətləndirin",
  },
  en: {
    brandDesc: "WhatsApp Order • QR Menu",
    all: "All",
    pizza: "Pizza",
    burger: "Burger",
    hot: "Hot meals",
    hookah: "Hookah",
    drink: "Drink",
    menu: "Menu",
    cart: "Cart",
    add: "Add",
    total: "Total",
    empty: "Cart is empty",
    table: "Enter table number...",
    tableAlert: "Please enter table number!",
    checkout: "Send order via WhatsApp",
    clear: "Clear cart",
    close: "Close",
    prices: "Prices • AZN",
    product: "products",
    note: "Note (optional)",
    rate: "Rate the service",
    thanks: "Order sent. Please rate the service",
  },
  ru: {
    brandDesc: "Заказ WhatsApp • QR Меню",
    all: "Все",
    pizza: "Пицца",
    burger: "Бургер",
    hot: "Горячие блюда",
    hookah: "Кальян",
    drink: "Напитки",
    menu: "Меню",
    cart: "Корзина",
    add: "Добавить",
    total: "Итого",
    empty: "Корзина пуста",
    table: "Введите номер стола...",
    tableAlert: "Пожалуйста, введите номер стола!",
    checkout: "Отправить заказ через WhatsApp",
    clear: "Очистить корзину",
    close: "Закрыть",
    prices: "Цены • AZN",
    product: "товаров",
    note: "Комментарий",
    rate: "Оцените сервис",
    thanks: "Заказ отправлен. Оцените сервис",
  },
};

const categories = ["all", "pizza", "burger", "hot", "hookah", "drink"];
const formatAZN = (n) => `${parseFloat(n).toFixed(2)} AZN`;

export default function App() {
  const [lang, setLang] = useState("az");
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState({});
  const [notes, setNotes] = useState({});
  const [rating, setRating] = useState(0);
  const [orderSent, setOrderSent] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState("");
  const [timeLimitReached, setTimeLimitReached] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const sessionId = sessionStorage.getItem("sessionId");
        const tableId = sessionStorage.getItem("tableId");
        if (sessionId && tableId) {
          const valid = await checkSession();
          if (!valid) setBlocked(true);
          else setSessionReady(true);
        }
      } catch (err) {
        console.error("Session yoxlanmadı:", err);
      }
    };
    init();
  }, []);

  useEffect(() => {
    fetch(SHEET_JSON_URL)
      .then((res) => res.json())
      .then((data) => {
        const mapped = data
          .filter((item) => item.active === "yes")
          .map((item, index) => ({
            id: index + 1,
            title: item[`title_${lang}`] || item.title,
            desc: item[`desc_${lang}`] || item.desc,
            price: parseFloat(item.price),
            cat: item.cat,
            tag: item.tag,
          }));
        setProducts(mapped);
      })
      .catch((err) => console.error("Sheet error:", err));
  }, [lang]);

  useEffect(() => {
    if (!tableNumber) return;
    setTimeLimitReached(false);
    const timer = setTimeout(() => setTimeLimitReached(true), 30 * 60 * 1000);
    return () => clearTimeout(timer);
  }, [tableNumber]);

  const filteredProducts = useMemo(
    () =>
      products.filter((p) =>
        selectedCategory === "all" ? true : p.cat === selectedCategory
      ),
    [products, selectedCategory]
  );

  const cartItems = useMemo(
    () =>
      Object.keys(cart)
        .map(Number)
        .map((id) => {
          const product = products.find((p) => p.id === id);
          return product ? { ...product, qty: cart[id] } : null;
        })
        .filter(Boolean),
    [cart, products]
  );

  const cartCount = useMemo(
    () => cartItems.reduce((s, i) => s + i.qty, 0),
    [cartItems]
  );

  const total = useMemo(
    () => cartItems.reduce((s, i) => s + i.price * i.qty, 0),
    [cartItems]
  );

  const handleAddToCart = async (id) => {
    const valid = await checkSession();
    if (!valid) {
      alert("Session bitib. Zəhmət olmasa QR kodu yenidən skan edin.");
      setBlocked(true);
      return;
    }
    setCart((p) => ({ ...p, [id]: (p[id] || 0) + 1 }));
    setIsDrawerOpen(true);
  };

  const handleRemoveFromCart = (id) => {
    setCart((p) => {
      const n = { ...p };
      n[id]--;
      if (n[id] <= 0) delete n[id];
      return n;
    });
  };

  const handleClearCart = () => setCart({});

  const handleStartSession = async () => {
    if (!tableNumber.trim()) {
      alert(t[lang].tableAlert);
      return;
    }

    await createSession(tableNumber);
    setSessionReady(true);
  };

  const generateWhatsAppLink = () => {
    let now = new Date();
    let msg = `Masa: ${tableNumber}\nVaxt: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}\n\n`;
    cartItems.forEach((i) => {
      msg += `${i.title} x${i.qty} - ${formatAZN(i.price * i.qty)}\n`;
      if (notes[i.id]) msg += `📝 ${notes[i.id]}\n`;
    });
    msg += `\nToplam: ${formatAZN(total)}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  if (blocked) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        ❌ Session bitib <br />
        Zəhmət olmasa QR kodu yenidən skan edin
      </div>
    );
  }

  if (!sessionReady) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>📌 Zəhmət olmasa masa nömrəsini daxil edin</h2>
        <input
          style={{ fontSize: 18, padding: 8, marginTop: 12 }}
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          placeholder={t[lang].table}
          type="text"
        />
        <br />
        <button
          style={{ marginTop: 12, padding: "8px 16px", fontSize: 16 }}
          onClick={handleStartSession}
        >
          Başla
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <header className="topbar">
          <div className="brand">
            <div className="logo">DM</div>
            <div>
              <h1>DigiMenu</h1>
              <p>{t[lang].brandDesc}</p>
            </div>
          </div>

          <div className="langSwitch">
            <button onClick={() => setLang("az")}>AZ</button>
            <button onClick={() => setLang("en")}>EN</button>
            <button onClick={() => setLang("ru")}>RU</button>
          </div>

          <div className="chips-container">
            {categories.map((c) => (
              <div
                key={c}
                className={`chip ${selectedCategory === c ? "active" : ""}`}
                onClick={() => setSelectedCategory(c)}
              >
                {c === "all" ? t[lang].all : t[lang][c]}
              </div>
            ))}
          </div>

          <div className="cartBtn" onClick={() => setIsDrawerOpen(true)}>
            🛒 {t[lang].cart} <div className="badge">{cartCount}</div>
          </div>
        </header>

        <div className="menuHeader">
          <h2>📋 {t[lang].menu}</h2>
          <small>
            {filteredProducts.length} {t[lang].product}
          </small>
          <div className="currencyBadge">{t[lang].prices}</div>
        </div>

        <section className="grid">
          {filteredProducts.map((p) => (
            <div className="item" key={p.id}>
              <div className="itemTop">
                <div>
                  <div className="itemTitle">{p.title}</div>
                  <div className="itemDesc">{p.desc}</div>
                </div>
                <div className="tag">{p.tag}</div>
              </div>

              <div className="priceRow">
                <div className="price">{formatAZN(p.price)}</div>
                <button
                  className="addBtn"
                  disabled={timeLimitReached}
                  onClick={() => handleAddToCart(p.id)}
                >
                  ➕ {t[lang].add}
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>

      <div
        className={`overlay ${isDrawerOpen ? "show" : ""}`}
        onClick={() => setIsDrawerOpen(false)}
      ></div>

      <aside className={`drawer ${isDrawerOpen ? "show" : ""}`}>
        <div className="drawerHead">
          <h3>🛒 {t[lang].cart}</h3>
          <button className="closeBtn" onClick={() => setIsDrawerOpen(false)}>
            {t[lang].close} ✖
          </button>
        </div>

        <input
          className="input"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          type="text"
          placeholder={t[lang].table}
        />

        <div className="cartList">
          {cartItems.length === 0 ? (
            <div
              style={{ marginTop: 14, color: "var(--muted)", textAlign: "center" }}
            >
              {t[lang].empty}
            </div>
          ) : (
            cartItems.map((i) => (
              <div className="cartItem" key={i.id}>
                <div>
                  <b>{i.title}</b>
                  <small>
                    {formatAZN(i.price)} x {i.qty}
                  </small>
                </div>

                <textarea
                  className="input"
                  placeholder={t[lang].note}
                  value={notes[i.id] || ""}
                  onChange={(e) =>
                    setNotes((p) => ({ ...p, [i.id]: e.target.value }))
                  }
                />

                <div className="qty">
                  <button
                    disabled={timeLimitReached}
                    onClick={() => handleRemoveFromCart(i.id)}
                  >
                    -
                  </button>
                  <span>{i.qty}</span>
                  <button
                    disabled={timeLimitReached}
                    onClick={() => handleAddToCart(i.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cartFooter">
          <div className="totalRow">
            <span>{t[lang].total}:</span>
            <span>{formatAZN(total)}</span>
          </div>

          <a
            className="checkoutBtn"
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              setCart({});
              setNotes({});
              setIsDrawerOpen(false);
              setOrderSent(true);
            }}
          >
            {t[lang].checkout}
          </a>

          <button className="dangerBtn" onClick={handleClearCart}>
            {t[lang].clear}
          </button>
        </div>
      </aside>

      {orderSent && (
        <div className="overlay show">
          <div className="drawer show">
            <h3 style={{ textAlign: "center" }}>{t[lang].thanks}</h3>
            <div style={{ textAlign: "center", marginTop: 12 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  style={{ fontSize: 26, cursor: "pointer" }}
                  onClick={() => {
                    setRating(n);
                    setOrderSent(false);
                  }}
                >
                  {n <= rating ? "⭐" : "☆"}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
