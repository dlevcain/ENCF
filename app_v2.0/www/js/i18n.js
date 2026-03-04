(function () {
  const spanishTranslations = {
    brand: "Distancia Intercanina",
    tabs: {
      "Reference sample": "Muestra de referencia",
      "General Description": "Descripción general",
      "Description of Distances": "Descripción de distancias",
      "Sex Estimation": "Estimación de sexo",
      "Sex estimation": "Estimación de sexo",
      "Results": "Resultados"
    },
    texts: {
      "Idioma / Language": "Idioma / Language",
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
  };

  const englishTranslations = {
    brand: "Intercanine Distance",
    tabs: {
      "Muestra de referencia": "Reference sample",
      "Descripción general": "General Description",
      "Descripción de distancias": "Description of Distances",
      "Estimación de sexo": "Sex Estimation",
      "Resultados": "Results"
    },
    texts: {
      "Idioma / Language": "Language / Idioma",
      "Zona anatómica": "Anatomical Zone",
      "Language / Idioma": "Language / Idioma",
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
  };

  function getTranslationsByLanguage(lang) {
    if (lang === "es") {
      return spanishTranslations;
    } else if (lang === "en") {
      return englishTranslations;
    }

    return englishTranslations;
  }

  function replaceExactText(selector, map) {
    document.querySelectorAll(selector).forEach((el) => {
      const content = (el.textContent || "").trim();
      if (map[content]) {
        el.textContent = map[content];
      }
    });
  }

  function applyLanguage(lang) {
    const dict = getTranslationsByLanguage(lang);

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
