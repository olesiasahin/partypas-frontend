
(function(){
  const cfg = window.PARTYPAS_CONTENT;
  const params = new URLSearchParams(location.search);
  let lang = params.get("lang") || localStorage.getItem("partypasLang") || cfg.settings.defaultLanguage;
  if(!cfg.settings.languages.includes(lang)) lang = cfg.settings.defaultLanguage;
  const page = params.get("page") || "home";

  function withLang(url){
    const u = new URL(url, location.href);
    u.searchParams.set("lang", lang);
    return u.search + u.hash;
  }
  function t(){ return cfg.i18n[lang]; }

  function header(){
    const x=t();
    return `<header class="site-header">
      <a class="brand" href="${withLang("?page=home")}"><img src="${cfg.settings.logos.dark}" alt="PartyPas"></a>
      <nav class="nav">
        <a href="${withLang("?page=home")}">${x.nav.home}</a>
        <a href="${withLang("?page=home#classes")}">${x.nav.classes}</a>
        <a href="${withLang(cfg.settings.links.programs)}">${x.nav.programs}</a>
        <a href="${withLang(cfg.settings.links.about)}">${x.nav.about}</a>
        <a href="${withLang("?page=home#how")}">${x.nav.how}</a>
        <a href="${withLang(cfg.settings.links.contact)}">${x.nav.contact}</a>
      </nav>
      <div class="header-actions">
        <select class="lang-select" id="language" aria-label="Language">
          ${cfg.settings.languages.map(l=>`<option value="${l}" ${l===lang?"selected":""}>${l.toUpperCase()}</option>`).join("")}
        </select>
        <a class="cta header-cta" href="${withLang(cfg.settings.links.trial)}">${x.nav.cta} →</a>
      </div>
    </header>`;
  }

  function footer(){
    const x=t(), c=cfg.settings.contact;
    return `<footer class="site-footer">
      <div class="footer-cell"><img class="footer-logo" src="${cfg.settings.logos.dark}" alt="PartyPas"></div>
      <div class="footer-cell"><div class="footer-title">${x.footer.trialTitle}</div><p>${x.footer.trialText}</p><a href="${withLang(cfg.settings.links.trial)}">${x.footer.button} →</a></div>
      <div class="footer-cell footer-contact"><a href="tel:${c.phone.replace(/\s/g,'')}">${c.phone}</a><a href="https://instagram.com">${c.instagram}</a><a href="mailto:${c.email}">${c.email}</a></div>
      <div class="footer-cell"><a class="cta" href="${withLang(cfg.settings.links.trial)}">${x.footer.button} →</a></div>
    </footer>`;
  }

  function discipline(index,key,extra){
    const d=t().disciplines[key], img=cfg.settings.images[key];
    const link=withLang(cfg.settings.links[key]);
    return `<section class="discipline" id="${key}">
      <div class="discipline-copy">
        <div class="num">0${index}</div>
        <h2>${d.name}</h2>
        <p>${d.lines.join("<br>")}</p>
        <a class="text-link" href="${link}" style="margin-top:26px">${d.more} →</a>
      </div>
      <div class="discipline-img"><img src="${img}" alt="${d.name}"></div>
      <div class="editorial-img"><img src="${extra}" alt=""></div>
    </section>`;
  }

  function home(){
    const x=t();
    return `${header()}
      <main class="page">
        <section class="hero">
          <div class="hero-copy">
            <div class="kicker">01</div>
            <h1>${x.hero.title.replace(/\n/g,"<br>")}</h1>
            <div class="hero-sub">${x.hero.subtitle.replace(/\n/g,"<br>")}</div>
            <a class="text-link" href="${withLang(cfg.settings.links.trial)}">${x.hero.cta} →</a>
          </div>
          <div class="hero-image">
            <img src="${cfg.settings.images.hero}" alt="PartyPas">
            <img class="hero-seal" src="${cfg.settings.logos.light}" alt="">
          </div>
        </section>

        <div class="disciplines" id="classes">
          ${discipline(1,"klasik",cfg.settings.images.editorial)}
          ${discipline(2,"salon",cfg.settings.images.editorial)}
          ${discipline(3,"stretching",cfg.settings.images.editorial)}
        </div>

        <section class="how" id="how">
          <div class="how-intro">
            <div class="kicker">${x.how.eyebrow}</div>
            <h2>${x.how.title.replace(/\n/g,"<br>")}</h2>
            <a class="text-link" href="${withLang(cfg.settings.links.whyOnline)}">${x.how.more} →</a>
          </div>
          <div class="steps">
            ${x.how.steps.map((s,i)=>`<div class="step"><div class="n">0${i+1} →</div><p>${s}</p></div>`).join("")}
          </div>
          <div class="how-photo"><img src="${cfg.settings.images.online}" alt="Online"></div>
        </section>

        <section class="teacher">
          <div class="teacher-photo"><img src="${cfg.settings.images.teacher}" alt=""></div>
          <div class="teacher-copy">
            <div class="kicker">${x.teacher.eyebrow}</div>
            <h2>${x.teacher.title.replace(/\n/g,"<br>")}</h2>
            <p>${x.teacher.text}</p>
            <a class="text-link" href="${withLang(cfg.settings.links.about)}">${x.teacher.more} →</a>
          </div>
          <div class="teacher-mark"><img src="${cfg.settings.logos.light}" alt=""></div>
        </section>
      </main>
      ${footer()}`;
  }

  const keyByPage = {"klasik":"klasik","salon":"salon","stretching":"stretching","neden-online":"whyOnline","hakkimda":"about","iletisim":"contact","trial":"trial","programlar":"programs"};

  function inner(){
    const x=t(), key=keyByPage[page] || "about", p=x.pages[key];
    let image = cfg.settings.images.hero;
    if(page==="klasik") image=cfg.settings.images.klasik;
    if(page==="salon") image=cfg.settings.images.salon;
    if(page==="stretching") image=cfg.settings.images.stretching;
    if(page==="hakkimda") image=cfg.settings.images.teacher;
    if(page==="neden-online") image=cfg.settings.images.online;

    let extra="";
    if(page==="programlar"){
      extra = `<section class="content-section">
        <div class="program-list">
          ${x.programs.map(p=>`<article class="program-card"><h3>${p.name}</h3><p>${p.details}</p><div class="price">${p.price}</div><a class="text-link" href="${withLang(cfg.settings.links.trial)}" style="margin-top:26px">${x.nav.cta} →</a></article>`).join("")}
        </div>
      </section>`;
    }
    if(page==="iletisim"){
      const c=cfg.settings.contact;
      extra = `<section class="content-section"><div class="contact-grid">
        <div><h2>Instagram</h2><p>${c.instagram}</p></div>
        <div><h2>WhatsApp</h2><p>${c.phone}</p></div>
        <div><h2>E-mail</h2><p>${c.email}</p></div>
        <div><h2>PartyPas</h2><a class="text-link" href="${c.whatsapp}">WhatsApp →</a></div>
      </div></section>`;
    }
    if(page==="trial"){
      extra = `<section class="content-section"><form class="program-list" onsubmit="event.preventDefault(); alert('Prototype: form submission will be connected later.');">
        <div class="program-card"><label>Name / Ad Soyad</label><br><input required style="width:100%;padding:14px;margin-top:12px;border:1px solid #cbbdad;background:transparent"></div>
        <div class="program-card"><label>E-mail</label><br><input type="email" required style="width:100%;padding:14px;margin-top:12px;border:1px solid #cbbdad;background:transparent"></div>
        <div class="program-card"><label>WhatsApp</label><br><input required style="width:100%;padding:14px;margin-top:12px;border:1px solid #cbbdad;background:transparent"></div>
        <div class="program-card"><button class="cta" type="submit">${x.nav.cta} →</button></div>
      </form></section>`;
    }

    return `${header()}<main class="page">
      <section class="inner-hero">
        <div class="inner-copy">
          <div class="kicker">PARTYPAS</div>
          <h1>${p.title}</h1>
          <p>${p.lead}</p>
          <a class="cta" href="${withLang(cfg.settings.links.trial)}">${x.nav.cta} →</a>
        </div>
        <div class="inner-image"><img src="${image}" alt=""></div>
      </section>
      <section class="content-section"><h2>${p.title}</h2><p>${p.body}</p></section>
      ${extra}
    </main>${footer()}`;
  }

  document.getElementById("app").innerHTML = page==="home" ? home() : inner();
  document.getElementById("language").addEventListener("change", e=>{
    localStorage.setItem("partypasLang",e.target.value);
    const u=new URL(location.href);u.searchParams.set("lang",e.target.value);location.href=u.toString();
  });
})();
