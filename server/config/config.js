module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "cheapcheep_dev",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
    sendgrid: process.env.SENDGRID_API_KEY || ""
  },
  production: {
    username: process.env.DB_USER || "",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "",
    host: process.env.DB_HOST || "",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    sendgrid: process.env.SENDGRID_API_KEY || ""
  }
}