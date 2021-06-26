"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openConnection = void 0;
const typeorm_1 = require("typeorm");
const path_1 = require("path");
const getConnectionSaftly = () => {
    let conn = null;
    try {
        conn = typeorm_1.getConnection();
    }
    catch (error) { }
    return conn;
};
// Open connection to the db
const openConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    let conn = getConnectionSaftly();
    if (!conn || !conn.isConnected) {
        // Get the current directory(src or build)
        let dir = path_1.resolve(__dirname, "../");
        let port = process.env.SERVER_PORT;
        // let options : ConnectionOptions = await import("./ormconfig.js").then((x) => x)
        let options = {
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
        conn = yield typeorm_1.createConnection(options).catch((e) => {
            console.log(e);
            return null;
        });
    }
    return conn;
});
exports.openConnection = openConnection;
