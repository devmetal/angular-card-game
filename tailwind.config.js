/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        "roboto-condensed": ["Roboto Condensed", "sans-serif"],
      },
      width: {
        card: "320px",
        message: "220px",
      },
      height: {
        card: "480px",
      },
      colors: {
        "card-icon": "#ED1AFF",
        "inc-message-bg": "#4B4B4B",
        "message-bg": "#420A9D",
        "ui-card-bg": "#286079",
      },
      gridTemplateColumns: {
        answers: "repeat(4, 220px)",
      },
    },
  },
  plugins: [],
};
