module.exports = {
  client: {
    service: {
      name: "saleor",
      url: process.env.API_URI,
      includes: ["./**/*.js", "./**/*.ts"],
      excludes: ["**/__tests__/**/*"],
    },
  },
};
