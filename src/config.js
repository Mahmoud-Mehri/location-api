const config = {
  http: {
    port: process.env.HTTP_PORT || 4001,
    sign: {
      secretValue: "SECRET_VALUE_FOR_HASHING",
      expireTime: 12 * 60 * 60, // 12 hours
    },
    paging: {
      defaultPageSize: 10,
    },
  },
  postgres: {
    host: process.env.PSQL_HOST || "localhost",
    port: process.env.PSQL_PORT ? parseInt(process.env.PSQL_PORT) : 5432,
    logging: process.env.PSQL_LOGGING === "true",
  },
};

export default config;
