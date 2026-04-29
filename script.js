// Legatus Grill - Link da bio
// Dados carregados de data/menu.json para funcionar como uma API local simples.

const DATA_URL = "data/menu.json";

const elements = {
  brandLogo: document.querySelector("#brandLogo"),
  brandName: document.querySelector("#brandName"),
  brandTagline: document.querySelector("#brandTagline"),
  menuLink: document.querySelector("#menuLink"),
  whatsappLink: document.querySelector("#whatsappLink"),
  menuItems: document.querySelector("#menuItems"),
  footerText: document.querySelector("#footerText")
};

async function loadMenuData() {
  try {
    const response = await fetch(DATA_URL);

    if (!response.ok) {
      throw new Error("Não foi possível carregar o menu.json");
    }

    const data = await response.json();
    renderBrand(data.brand);
    renderCardapio(data.cardapio);
    renderWhatsapp(data.whatsapp);
    renderMenu(data.menu);
  } catch (error) {
    console.error(error);

    if (elements.menuItems) {
      elements.menuItems.innerHTML = `
        <article class="menu-item">
          <div>
            <h3>Cardápio indisponível</h3>
            <p>Tente novamente em alguns instantes.</p>
          </div>
        </article>
      `;
    }
  }
}

function renderBrand(brand) {
  if (!brand) return;

  elements.brandName.textContent = brand.name;
  elements.brandTagline.textContent = brand.tagline;
  elements.footerText.textContent = `${brand.name} · ${brand.footer}`;

  if (brand.logo) {
    elements.brandLogo.src = brand.logo;
    elements.brandLogo.alt = `Logo ${brand.name}`;
  }
}

function renderCardapio(cardapio) {
  if (!cardapio?.url) return;
  elements.menuLink.href = cardapio.url;
}

function renderWhatsapp(whatsapp) {
  if (!whatsapp?.url) return;
  elements.whatsappLink.href = whatsapp.url;
}

function renderMenu(menu = []) {
  if (!elements.menuItems) return;

  elements.menuItems.innerHTML = menu.map((item) => `
    <article class="menu-item">
      <div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
      <span class="price">${item.price}</span>
    </article>
  `).join("");
}

loadMenuData();
