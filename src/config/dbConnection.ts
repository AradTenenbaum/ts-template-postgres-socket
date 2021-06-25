import { createConnection, getConnection, ConnectionOptions, Connection } from "typeorm";
import { resolve } from "path";
import Example from "../model/Example/example.entity";

const getConnectionSaftly = (): Connection | null => {
    let conn = null;
    try {
      conn = getConnection();
    } catch (error) {}
    return conn;
  };

// Open connection to the db
export const openConnection = async () => {
    let conn = getConnectionSaftly();
  
    if (!conn || !conn.isConnected) {
      // Get the current directory(src or build)
      let dir = resolve(__dirname, "../");

      let port: any = process.env.SERVER_PORT;

      // let options : ConnectionOptions = await import("./ormconfig.js").then((x) => x)
      let options: ConnectionOptions = {
        type: "postgres",
        host: process.env.SERVER_HOST,
        port: port,
        database: process.env.SERVER_DATABASE,
        username: process.env.SERVER_USER,
        password: process.env.SERVER_PASSWORD,
        schema: process.env.SERVER_SCHEMA,
        // synchronize: true - update db structure
        synchronize: false,
        dropSchema: false,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
        logging: true,
        entities: [`${dir}/model/**/*.entity.{ts,js}`],
        cli: {
          entitiesDir: "src/models",
        },
      };
      conn = await createConnection(options).catch((e) => {
          console.log(e);
          return null;
      });
    }
  
    return conn;
  };