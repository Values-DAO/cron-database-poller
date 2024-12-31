export const config = {
  telegramApi:
    process.env.ENV === "prod"
      ? "http://localhost:3006"
      : process.env.ENV === "staging"
      ? "http://localhost:3005"
      : "http://localhost:3005",
  backendApi:
    process.env.ENV === "prod"
      ? "https://api.valuesdao.io"
      : process.env.ENV === "staging"
      ? "https://staging-api.valuesdao.io"
      : "http://localhost:3000",
  mongoDBUri:
    process.env.ENV === "prod"
      ? process.env.PROD_MONGODB_URI
      : process.env.ENV === "staging"
      ? process.env.STAGING_MONGODB_URI
      : process.env.STAGING_MONGODB_URI,
};