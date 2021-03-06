

export const burritoTheme = 

{
  "name": "my theme",
  "rounding": 4,
  "spacing": 24,
  "defaultMode": "light",
  "global": {
    "colors": {
      "brand": {
        "dark": "#B0841C",
        "light": "#D5A021"
      },
      "background": {
        "dark": "#111111",
        "light": "#B2E6FA"
      },
      "background-back": {
        "dark": "#111111",
        "light": "#B2E6FA"
      },
      "background-front": {
        "dark": "#222222",
        "light": "#B2E6FA"
      },
      "background-contrast": {
        "dark": "#FFFFFF11",
        "light": "#11111111"
      },
      "text": {
        "dark": "#EEEEEE",
        "light": "#37393A"
      },
      "text-strong": {
        "dark": "#FFFFFF",
        "light": "#28292A"
      },
      "text-weak": {
        "dark": "#CCCCCC",
        "light": "#45484A"
      },
      "text-xweak": {
        "dark": "#999999",
        "light": "#595d5F"
      },
      "border": {
        "dark": "#444444",
        "light": "#067BC2"
      },
      "control": "brand",
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": "brand",
      "selected-text": "text",
      "status-critical": "#FF4040",
      "status-warning": "#FFAA15",
      "status-ok": "#E9C572",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "graph-0": "brand",
      "graph-1": "status-warning",
    },
    "font": {
      "family": "Montserrat",
      "face": "\n/* latin */\n@font-face {\n  font-family: 'Sue Ellen Francisco';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Sue Ellen Francisco '), local('SueEllenFrancisco'), url(https://fonts.gstatic.com/s/sueellenfrancisco/v11/wXK3E20CsoJ9j1DDkjHcQ5ZL8xRaxru9no1P23in5H8.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n\n/* cyrillic-ext */\n@font-face {\n  font-family: 'Balsamiq Sans';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Balsamiq Sans Regular'), local('BalsamiqSans-Regular'), url(https://fonts.gstatic.com/s/balsamiqsans/v2/P5sEzZiAbNrN8SB3lQQX7PncwdMXIKVODzr8XA.woff2) format('woff2');\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n/* cyrillic */\n@font-face {\n  font-family: 'Balsamiq Sans';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Balsamiq Sans Regular'), local('BalsamiqSans-Regular'), url(https://fonts.gstatic.com/s/balsamiqsans/v2/P5sEzZiAbNrN8SB3lQQX7PncwdoXIKVODzr8XA.woff2) format('woff2');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'Balsamiq Sans';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Balsamiq Sans Regular'), local('BalsamiqSans-Regular'), url(https://fonts.gstatic.com/s/balsamiqsans/v2/P5sEzZiAbNrN8SB3lQQX7PncwdAXIKVODzr8XA.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Balsamiq Sans';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Balsamiq Sans Regular'), local('BalsamiqSans-Regular'), url(https://fonts.gstatic.com/s/balsamiqsans/v2/P5sEzZiAbNrN8SB3lQQX7Pncwd4XIKVODzo.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n"
    },
    "active": {
      "background": "active-background",
      "color": "active-text"
    },
    "hover": {
      "background": "active-background",
      "color": "active-text"
    },
    "selected": {
      "background": "selected-background",
      "color": "selected-text"
    },
    "focus": {
      "border": {
        "color": "#FFFFFC"
      }
    },
    "breakpoints": {
      "small": {
        "value": 768,
        "borderSize": {
          "xsmall": "1px",
          "small": "2px",
          "medium": "4px",
          "large": "6px",
          "xlarge": "12px"
        },
        "edgeSize": {
          "none": "0px",
          "hair": "1px",
          "xxsmall": "2px",
          "xsmall": "3px",
          "small": "6px",
          "medium": "12px",
          "large": "24px",
          "xlarge": "48px"
        },
        "size": {
          "xxsmall": "24px",
          "xsmall": "48px",
          "small": "96px",
          "medium": "192px",
          "large": "384px",
          "xlarge": "768px",
          "full": "100%"
        }
      },
      "medium": {"value": 1536},
      "large": {}
    }

  },

  "radioButton": {
    "hover": {
      "border": {
        "color": "text-weak"
      }
    }
  },
  "checkBox": {
    "hover": {
      "border": {
        "color": "text-weak"
      }
    }
  },

  "chart": {},
  "diagram": {
    "line": {}
  },
  "meter": {},
  "formField": {
    "border": {
      "color": "active-background",
      "error": {
        "color": {
          "dark": "white",
          "light": "status-critical"
        }
      },
      "position": "inner",
      "side": "bottom",
      "style": "solid"
    },
    "content": {
      "pad": "medium",
      "margin": "large"
    },
    "disabled": {
      "background": {
        "color": "status-disabled",
        "opacity": "medium"
      }
    },
    "error": {
      "color": "status-critical",
      "margin": {
        "vertical": "xsmall",
        "horizontal": "small"
      }
    },
    "help": {
      "color": "dark-3",
      "margin": {
        "start": "small"
      }
    },
    "info": {
      "color": "text-xweak",
      "margin": {
        "vertical": "xsmall",
        "horizontal": "small"
      }
    },
    "label": {
      "margin": {
        "vertical": "xsmall",
        "horizontal": "xsmall"
      }
    },
    "margin": {
      "bottom": "xsmall"
    }
  },
  "heading": {
    "font": {
      "family": "\"Balsamiq Sans\""
    }
  },
  "layer": {
    "background": {
      "dark": "#111111",
      "light": "#B2E6FA"
    }
  }
}