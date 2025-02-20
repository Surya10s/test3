const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');

  const connections = {
    postgres: {
      connection: {
        // Use Supabase's provided connection URL
        connectionString: env('DATABASE_URL', 'postgresql://postgres:s9361109264@db.jlrwtjeulwottwrlxbhd.supabase.co:5432/postgres'),
        ssl: { rejectUnauthorized: env.bool('DATABASE_SSL', true) }, // Enabling SSL for secure connections
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};

