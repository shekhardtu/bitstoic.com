const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de"],
    localePath: path.resolve("./public/locales"),
    serializeConfig: false,
  },
  use: [
    {
      init: (i18next) => {
        i18next.services.formatter.add("minutes", (value) =>
          value > 0 ? `${value}m` : ""
        );
        i18next.services.formatter.add("seconds", (value) =>
          value > 0 ? `${value}s` : ""
        );
      },
      type: "3rdParty",
    },
  ],
};
