import React, { useMemo, useState } from "react";

const WHATSAPP_NUMBER = "994514195344";

const products = [
  { id: 1, title: "Pepperoni Pizza", desc: "Pepperoni, mozzarella, pomidor sousu.", price: 13.9, cat: "pizza", tag: "Çox satılan" },
  { id: 2, title: "Chicken BBQ Pizza", desc: "Toyuq, BBQ sousu, göbələk, mozzarella.", price: 14.5, cat: "pizza", tag: "Yeni" },
  { id: 3, title: "Margherita Pizza", desc: "Mozzarella, pomidor sousu, reyhan.", price: 11.9, cat: "pizza", tag: "Klassik" },

  { id: 4, title: "Double Beef Burger", desc: "2 qat mal əti, cheddar, xüsusi sous.", price: 12.4, cat: "burger", tag: "🔥 Hot" },
  { id: 5, title: "Chicken Burger", desc: "Toyuq file, kahı, pomidor, mayo.", price: 10.9, cat: "burger", tag: "Yüngül" },

  { id: 10, title: "Toyuq Şiş", desc: "Manqal toyuq şiş, göyərti və lavaş ilə.", price: 9.9, cat: "hot", tag: "Manqal" },
  { id: 11, title: "Lülə Kabab", desc: "Mal əti lülə kabab, soğan, lavaş.", price: 12.5, cat: "hot", tag: "Top" },

  { id: 20, title: "Qəlyan - Klassik", desc: "Alma / Üzüm / Nanə (standart).", price: 12, cat: "hookah", tag: "Classic" },
  { id: 21, title: "Qəlyan - Premium", desc: "Blueberry / Love66 / Mango (premium).", price: 18, cat: "hookah", tag: "Premium" },

  { id: 15, title: "Ayran", desc: "Soyuq ayran (300ml).", price: 1.8, cat: "drink", tag: "Milli" },
  { id: 16, title: "Çay", desc: "Qara çay, limonla (stakan).", price: 1.2, cat: "drink", tag: "Hot" },
];

const categories = [
  { key: "all", label: "Hamısı", icon: "fa-solid fa-list" },
  { key: "pizza", label: "Pizza", icon: "fa-solid fa-pizza-slice" },
  { key: "burger", label: "Burger", icon: "fa-solid fa-burger" },
  { key: "hot", label: "İsti yeməklər", icon: "fa-solid fa-fire" },
  { key: "hookah", label: "Qəlyan", icon: "fa-solid fa-smoke" },
  { key: "drink", label: "İçki", icon: "fa-solid fa-mug-saucer" },
];

const formatAZN = (n) => `${n.toFixed(2)} AZN`;

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => (selectedCategory === "all" ? true : p.cat === selectedCategory));
  }, [selectedCategory]);

  const cartItems = useMemo(() => {
    return Object.keys(cart)
      .map(Number)
      .map((id) => {
        const product = products.find((p) => p.id === id);
        return { ...product, qty: cart[id] };
      });
  }, [cart]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, i) => sum + i.qty, 0);
  }, [cartItems]);

  const total = useMemo(() => {
    return cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  }, [cartItems]);

  const addToCart = (id) => {
    setCart((prev) => {
      const next = { ...prev };
      next[id] = (next[id] || 0) + 1;
      return next;
    });
    setIsDrawerOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const next = { ...prev };
      if (!next[id]) return next;
      next[id] -= 1;
      if (next[id] <= 0) delete next[id];
      return next;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const checkout = () => {
    if (cartItems.length === 0) {
      alert("Səbət boşdur!");
      return;
    }

    const table = tableNumber.trim();
    if (!table) {
      alert("Zəhmət olmasa masa nömrəsini daxil edin!");
      return;
    }

    const now = new Date();
    const dateStr = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

    let msg = `Sifariş:\nMasa: ${table}\nTarix/Saat: ${dateStr}\n\n`;

    cartItems.forEach((i) => {
      msg += `${i.title} x${i.qty} - ${formatAZN(i.price * i.qty)}\n`;
    });

    msg += `\nToplam: ${formatAZN(total)}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");

    // Səbəti sıfırla
    setCart({});
    setTableNumber("");
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className="container">
        <header className="topbar">
          <div className="brand">
            <div className="logo">DM</div>
            <div>
              <h1>DigiMenu Restaurant</h1>
              <p>WhatsApp Sifariş • QR Menu</p>
            </div>
          </div>

          <div className="chips-container">
            {categories.map((c) => (
              <div
                key={c.key}
                className={`chip ${selectedCategory === c.key ? "active" : ""}`}
                onClick={() => setSelectedCategory(c.key)}
              >
                <i className={c.icon}></i>
                {c.label}
              </div>
            ))}
          </div>

          <div className="cartBtn" onClick={() => setIsDrawerOpen(true)}>
            🛒 Səbət <div className="badge">{cartCount}</div>
          </div>
        </header>

        <div className="menuHeader">
          <div className="menuHeaderLeft">
            <h2>📋 Menyu</h2>
            <small>{filteredProducts.length} məhsul</small>
          </div>
          <div className="currencyBadge">Qiymətlər • AZN</div>
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
                <button className="addBtn" onClick={() => addToCart(p.id)}>
                  ➕ Əlavə et
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Overlay */}
      <div className={`overlay ${isDrawerOpen ? "show" : ""}`} onClick={() => setIsDrawerOpen(false)}></div>

      {/* Drawer */}
      <aside className={`drawer ${isDrawerOpen ? "show" : ""}`}>
        <div className="drawerHead">
          <h3>🛒 Səbət</h3>
          <button className="closeBtn" onClick={() => setIsDrawerOpen(false)}>
            Bağla ✖
          </button>
        </div>

        <input
          className="input"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          type="text"
          placeholder="Masa nömrəsini daxil edin..."
        />

        <div className="cartList">
          {cartItems.length === 0 ? (
            <div style={{ marginTop: 14, color: "var(--muted)", textAlign: "center" }}>Səbət boşdur</div>
          ) : (
            cartItems.map((i) => (
              <div className="cartItem" key={i.id}>
                <div>
                  <b>{i.title}</b>
                  <small>
                    {formatAZN(i.price)} x {i.qty}
                  </small>
                </div>

                <div className="qty">
                  <button onClick={() => removeFromCart(i.id)}>-</button>
                  <span>{i.qty}</span>
                  <button onClick={() => addToCart(i.id)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cartFooter">
          <div className="totalRow">
            <span>Toplam:</span>
            <span>{formatAZN(total)}</span>
          </div>

          <button className="checkoutBtn" onClick={checkout}>
            WhatsApp ilə sifariş göndər
          </button>

          <button className="dangerBtn" onClick={clearCart}>
            Səbəti təmizlə
          </button>
        </div>
      </aside>
    </>
  );
}
