(function () {
  const translations = {
    es: {
      brand: "Distancia Intercanina",
      tabs: {
        "Reference sample": "Muestra de referencia",
        "General Description": "Descripción general",
        "Description of Distances": "Descripción de distancias",
        "Sex Estimation": "Estimación de sexo",
        "Results": "Resultados"
      },
      texts: {
        "Anatomical Zone": "Zona anatómica",
        "Abstract": "Resumen",
        "Diagram": "Diagrama",
        "Sex": "Sexo",
        "Age - Sex": "Edad - Sexo",
        "Maxillary area - Sex": "Área maxilar - Sexo",
        "Mandibular area - Sex": "Área mandibular - Sexo",
        "Intercanine Distance": "Distancia intercanina",
        "Mesiodistal Right": "Mesiodistal derecha",
        "Mesiodistal Left": "Mesiodistal izquierda"
      }
    },
    en: {
      brand: "Intercanine Distance",
      tabs: {
        "Muestra de referencia": "Reference sample",
        "Descripción general": "General Description",
        "Descripción de distancias": "Description of Distances",
        "Estimación de sexo": "Sex Estimation",
        "Resultados": "Results"
      },
      texts: {
        "Zona anatómica": "Anatomical Zone",
        "Resumen": "Abstract",
        "Diagrama": "Diagram",
        "Sexo": "Sex",
        "Edad - Sexo": "Age - Sex",
        "Área maxilar - Sexo": "Maxillary area - Sex",
        "Área mandibular - Sexo": "Mandibular area - Sex",
        "Distancia intercanina": "Intercanine Distance",
        "Mesiodistal derecha": "Mesiodistal Right",
        "Mesiodistal izquierda": "Mesiodistal Left"
      }
    }
  };

  function replaceExactText(selector, map) {
    document.querySelectorAll(selector).forEach((el) => {
      const content = (el.textContent || "").trim();
      if (map[content]) {
        el.textContent = map[content];
      }
    });
  }

  function applyLanguage(lang) {
    const dict = translations[lang];
    if (!dict) return;

    const brand = document.querySelector(".navbar-brand");
    if (brand) {
      brand.textContent = dict.brand;
    }

    replaceExactText(".navbar-nav > li > a", dict.tabs);
    replaceExactText("label, button, h5, h4, h3, .control-label", dict.texts);

    const zoneSelect = document.getElementById("zona");
    if (zoneSelect) {
      const options = Array.from(zoneSelect.options);
      options.forEach((opt) => {
        if (opt.value === "Maxillary") {
          opt.textContent = lang === "es" ? "Maxilar" : "Maxillary";
        }
        if (opt.value === "Mandibular") {
          opt.textContent = lang === "es" ? "Mandibular" : "Mandibular";
        }
      });
    }
  }

  document.addEventListener("shiny:connected", function () {
    const langSelect = document.getElementById("ui_lang");
    if (!langSelect) return;

    applyLanguage(langSelect.value || "en");

    langSelect.addEventListener("change", function (event) {
      applyLanguage(event.target.value);
    });
  });
})();
