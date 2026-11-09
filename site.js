(() => {
  "use strict";

  const scriptUrl = document.currentScript && document.currentScript.src;
  if (!scriptUrl) {
    console.error("The Sufi Dawah: could not determine the website root.");
    return;
  }

  const siteRoot = new URL(".", scriptUrl);
  const homeUrl = new URL("index.html", siteRoot).href;
  const navigationItems = [
    ["Home", "index.html"],
    ["Aqidah", "The%20Sufi%20Dawah%20-%20To%20Website/Aqidah%20401dcc98af2280a1803ee4ded7a031a0.html"],
    ["Tasawwuf", "The%20Sufi%20Dawah%20-%20To%20Website/Foundations%20of%20Tasawwuf%20400dcc98af2280a78976c2775a865931.html"],
    ["Diseases & Remedies", "The%20Sufi%20Dawah%20-%20To%20Website/Diseases%20%26%20Remedies%20406dcc98af2280fbaa82ee00fcb23620.html"],
    ["Islamic Fawā’id", "The%20Sufi%20Dawah%20-%20To%20Website/Islamic%20Fawa%E2%80%99id%20(Benefits)%20406dcc98af22805b87aafba5bfd5c6bb.html"],
    ["Clarifying Doubts", "The%20Sufi%20Dawah%20-%20To%20Website/Clarifying%20Doubts%20%26%20Refutations%20406dcc98af2280e2a1fff8cf8c2474d8.html"],
    ["Library", "The%20Sufi%20Dawah%20-%20To%20Website/Library%20%26%20Resources%20406dcc98af228034b7d3fe77462233e9.html"],
    ["Socials", "The%20Sufi%20Dawah%20-%20To%20Website/Socials%20406dcc98af228091b16be599e4c45f3d.html"]
  ];
  const socialItems = [
    { name: "Discord", url: "https://discord.gg/mFeTDgk8q7", paths: ["M7.5 7.5c1.5-1.1 3.1-1.6 4.5-1.6s3 .5 4.5 1.6c1.1 1.7 1.8 3.6 2 5.6-1.2 1.3-2.6 2-4.1 2.4l-.9-1.3m-3 0-.9 1.3c-1.5-.4-2.9-1.1-4.1-2.4.2-2 1-3.9 2-5.6Z", "M9 10.5h.01M15 10.5h.01M8 17l-1 1.5m9-1.5 1 1.5"] },
    { name: "TikTok", url: "https://www.tiktok.com/@thesufidawah", paths: ["M14 4v10.5a3.5 3.5 0 1 1-3-3.46", "M14 4c.5 2.8 2.2 4.5 5 4.8"] },
    { name: "YouTube", url: "https://www.youtube.com/@TheSufiDawah", paths: ["M21 8.2a2.5 2.5 0 0 0-1.8-1.8C17.6 6 12 6 12 6s-5.6 0-7.2.4A2.5 2.5 0 0 0 3 8.2 25 25 0 0 0 2.6 12a25 25 0 0 0 .4 3.8 2.5 2.5 0 0 0 1.8 1.8C6.4 18 12 18 12 18s5.6 0 7.2-.4a2.5 2.5 0 0 0 1.8-1.8 25 25 0 0 0 .4-3.8 25 25 0 0 0-.4-3.8Z", "m10 9 5 3-5 3z"] },
    { name: "Instagram", url: "https://www.instagram.com/thesufidawah/", paths: ["M7 3.5h10A3.5 3.5 0 0 1 20.5 7v10a3.5 3.5 0 0 1-3.5 3.5H7A3.5 3.5 0 0 1 3.5 17V7A3.5 3.5 0 0 1 7 3.5Z", "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z", "M17.5 6.5h.01"] },
    { name: "Telegram", url: "https://t.me/thesufidawah", paths: ["m21 4-3.2 16-6.1-4.7-3.2 3.1.5-5.2L19 6.1 7.1 13.4 3 12z", "m9 13.2 8.8-6.1"] },
    { name: "X", url: "https://x.com/thesufidawah", paths: ["m4 4 16 16M20 4 4 20", "M5 4h4l10 16h-4z"] },
    { name: "Linktree", url: "https://linktr.ee/thesufidawah", paths: ["M12 3v18M6 7l6 5 6-5M4 13l8 5 8-5"] }
  ];

  function makeSiteHeader() {
    const header = document.createElement("header");
    header.className = "site-header";
    header.dataset.siteHeader = "";
    header.innerHTML = `
      <a class="brand" href="${homeUrl}" aria-label="The Sufi Dawah home">
        <img class="brand-logo" src="${new URL("logo.png", siteRoot).href}" alt="">
        <span class="brand-name">The Sufi Dawah</span>
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation">
        <span class="menu-toggle-label">Menu</span><span class="menu-icon" aria-hidden="true"></span>
      </button>
      <nav class="site-nav" id="primary-navigation" aria-label="Main navigation"></nav>`;
    const nav = header.querySelector(".site-nav");
    const links = document.createElement("div");
    links.className = "nav-links";

    navigationItems.forEach(([label, destination]) => {
      const link = document.createElement("a");
      link.href = destination.startsWith("#")
        ? `${homeUrl}${destination}`
        : new URL(destination, siteRoot).href;
      link.textContent = label;
      links.append(link);
    });
    nav.append(links, makeSocialLinks("nav-socials"));

    const textButton = document.createElement("button");
    textButton.className = "text-size-toggle";
    textButton.id = "readability-toggle";
    textButton.type = "button";
    textButton.setAttribute("aria-pressed", "false");
    textButton.textContent = "Larger text";
    nav.append(textButton);
    return header;
  }

  function makeSocialLinks(className = "footer-socials") {
    const links = document.createElement("div");
    links.className = className;
    links.setAttribute("role", "group");
    links.setAttribute("aria-label", "Social media");

    socialItems.forEach(({ name, url, paths }) => {
      const link = document.createElement("a");
      link.className = "social-link";
      link.href = url;
      link.setAttribute("aria-label", name);
      link.title = name;

      const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      icon.setAttribute("viewBox", "0 0 24 24");
      icon.setAttribute("aria-hidden", "true");
      icon.setAttribute("focusable", "false");
      paths.forEach(pathData => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        icon.append(path);
      });
      link.append(icon);
      links.append(link);
    });

    return links;
  }

  function setupFavicon() {
    if (document.querySelector('link[rel="icon"]')) return;
    const icon = document.createElement("link");
    icon.rel = "icon";
    icon.type = "image/png";
    icon.href = new URL("logo.png", siteRoot).href;
    document.head.append(icon);
  }

  function setupSiteFooter() {
    let footer = document.querySelector(".site-footer");
    if (!footer) {
      footer = document.createElement("footer");
      footer.className = "site-footer";
      document.body.append(footer);
    }

    if (!footer.querySelector(".brand-logo")) {
      const brand = document.createElement("a");
      brand.className = "brand footer-brand";
      brand.href = homeUrl;
      brand.innerHTML = `<img class="brand-logo" src="${new URL("logo.png", siteRoot).href}" alt=""><span class="brand-name">The Sufi Dawah</span>`;
      footer.prepend(brand);
    }
    if (!footer.querySelector(".footer-socials")) footer.append(makeSocialLinks());
  }

  function prepareArticlePage() {
    const article = document.querySelector("article.page");
    if (!article) return;

    const main = document.createElement("main");
    main.id = "main-content";
    main.tabIndex = -1;
    article.before(main);
    main.append(article);

    const breadcrumb = document.createElement("p");
    breadcrumb.className = "breadcrumb";
    const home = document.createElement("a");
    home.href = homeUrl;
    home.textContent = "Home";
    breadcrumb.append(home, document.createTextNode("  /  "));
    breadcrumb.append(document.createTextNode(article.querySelector(".page-title")?.textContent.trim() || "Article"));
    article.prepend(breadcrumb);
  }

  function addSkipLink() {
    if (document.querySelector(".skip-link")) return;
    const skip = document.createElement("a");
    skip.className = "skip-link";
    skip.href = "#main-content";
    skip.textContent = "Skip to content";
    document.body.prepend(skip);
  }

  function setupNavigation() {
    const button = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");
    if (!button || !nav) return;

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    });

    nav.addEventListener("click", event => {
      if (event.target instanceof Element && event.target.closest("a") && button.getAttribute("aria-expanded") === "true") {
        button.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
        button.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        button.focus();
      }
    });
  }

  function setupReadabilityToggle() {
    const button = document.querySelector("#readability-toggle");
    if (!button) return;
    button.addEventListener("click", () => {
      const enabled = document.body.classList.toggle("larger-text");
      button.setAttribute("aria-pressed", String(enabled));
      button.textContent = enabled ? "Standard text" : "Larger text";
    });
  }

  function openLinksInNewTabs() {
    document.querySelectorAll("a[href]:not([href^='#'])").forEach(link => {
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) {
        link.target = "_blank";
        link.relList.add("noopener");
      } else {
        link.removeAttribute("target");
        link.relList.remove("noopener");
      }
    });
  }

  function setupCollectionSearch() {
    const input = document.querySelector("#collection-search");
    const cards = [...document.querySelectorAll(".collection-card")];
    const status = document.querySelector("#search-status");
    const emptyState = document.querySelector("#empty-state");
    if (!input || !cards.length || !status || !emptyState) return;

    input.addEventListener("input", () => {
      const query = input.value.trim().toLocaleLowerCase();
      let visible = 0;
      cards.forEach(card => {
        const searchableText = `${card.textContent} ${card.dataset.search || ""}`.toLocaleLowerCase();
        const matches = !query || searchableText.includes(query);
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      status.textContent = query
        ? `${visible} ${visible === 1 ? "section" : "sections"} found.`
        : `${cards.length} sections in the collection.`;
      emptyState.hidden = visible !== 0;
    });
  }

  function setupImageLightbox() {
    const images = [...document.querySelectorAll("article.page .page-body img")];
    if (!images.length) return;

    const lightbox = document.createElement("dialog");
    lightbox.className = "image-lightbox";
    lightbox.setAttribute("aria-label", "Image viewer");
    lightbox.innerHTML = `
      <button class="lightbox-close" type="button" aria-label="Close image viewer">×</button>
      <img class="lightbox-image" alt="">
      <p class="lightbox-caption"></p>`;
    document.body.append(lightbox);

    const closeButton = lightbox.querySelector(".lightbox-close");
    const lightboxImage = lightbox.querySelector(".lightbox-image");
    const caption = lightbox.querySelector(".lightbox-caption");
    let lastTrigger = null;

    const openImage = image => {
      const figure = image.closest("figure");
      const description = figure?.querySelector("figcaption")?.textContent.trim() || image.alt;
      lastTrigger = image.closest("a") || image;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt || description || "Enlarged article image";
      caption.textContent = description;
      lightbox.showModal();
      closeButton.focus();
    };

    images.forEach(image => {
      const description = image.closest("figure")?.querySelector("figcaption")?.textContent.trim() || image.alt;
      const link = image.closest("a");
      const control = link || image;
      if (link) {
        link.removeAttribute("href");
        link.removeAttribute("target");
        link.removeAttribute("rel");
      }
      control.tabIndex = 0;
      control.setAttribute("role", "button");
      control.setAttribute("aria-label", description ? `Enlarge image: ${description}` : "Enlarge image");
      if (control !== image) image.tabIndex = -1;
      control.addEventListener("click", event => {
        event.preventDefault();
        openImage(image);
      });
      control.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openImage(image);
        }
      });
    });

    closeButton.addEventListener("click", () => lightbox.close());
    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener("close", () => {
      lightboxImage.removeAttribute("src");
      caption.textContent = "";
      lastTrigger?.focus();
    });
  }

  setupFavicon();
  if (!document.body.classList.contains("home-page") && !document.querySelector("[data-site-header]")) {
    prepareArticlePage();
    document.body.prepend(makeSiteHeader());
  }
  addSkipLink();
  setupSiteFooter();
  openLinksInNewTabs();
  setupNavigation();
  setupReadabilityToggle();
  setupCollectionSearch();
  setupImageLightbox();
})();
