# ============================================================
# main_ui.R
# Main UI layout and application composition
# ============================================================

# --- Module imports -----------------------------------------
source("tabs/reference_sample.R")
source("tabs/general_description.R")
source("tabs/description_of_distances.R")
source("tabs/sex_estimation.R")
source("tabs/results.R")


# --- UI helpers / components --------------------------------

pageButtonUi <- function(id, label = "Resultado") {
  ns <- NS(id)
  actionButton(ns("page_change"), label = label)
}

# --- Main UI -------------------------------------------------
pageButtonServer <- function(id, parentSession){
  moduleServer(id, function(input, output, session){
    observeEvent(input$page_change,{
      updateTabsetPanel(session=parentSession,
                        inputId="pages",
                        selected="Resultados")
    })
  })
}


ui <- fluidPage(

  tags$head(
    tags$style(HTML("
      .logo-fixed-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 88px;
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1040;
        box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.15);
      }

      .logo-fixed-bar img {
        max-height: 80%;
        width: auto;
      }

      body {
        padding-bottom: 108px;
      }

      .lang-switcher {
        position: fixed;
        top: 10px;
        right: 20px;
        z-index: 2000;
        background: rgba(255, 255, 255, 0.95);
        border-radius: 6px;
        padding: 6px 10px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      }

      .lang-switcher .control-label {
        margin-bottom: 2px;
        font-size: 12px;
      }

      .lang-switcher .form-group {
        margin-bottom: 0;
      }
    ")),
    tags$script(src = "js/i18n.js")
  ),

  # Global JS infrastructure
  shinyjs::useShinyjs(),

  div(
    class = "lang-switcher",
    selectInput(
      inputId = "ui_lang",
      label = "Idioma / Language",
      choices = c("ES" = "es", "EN" = "en"),
      selected = "en",
      width = "120px"
    )
  ),

  # Main navigation structure
  navbarPage(
    id = "main_nav",
    title = "Intercanine Distance",
    theme = shinytheme("flatly"),

    header = tags$div(
      class = "logo-fixed-bar",
      tags$img(src = "images/Logo.png", alt = "Intercanine Distance")
    ),

    # Paneles principales
    reference_sample_ui("rfrncsmpl"),
    general_description_ui("gnrldscrptn"),
    description_of_distances_ui("dscrptnfdstncs"),
    sex_estimation_ui("sxstmtn"),
    results_ui("rslts")
  )
)
