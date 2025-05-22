"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const db_1 = __importDefault(require("./config/db/db"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
app.use((0, cors_1.default)({
    origin: config_1.default.app.allowedOrigin,
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use('/api', routes_1.default);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', 'uploads')));
//db connection
db_1.default.on("error", console.error.bind(console, "MongoDB connection error:"));
db_1.default.on("close", function () {
    console.log("DB connection is closed");
});
db_1.default.once("open", function () {
    console.log("Connected to MongoDB database!!");
});
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";
httpServer.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://${host}:${port}`);
});
//# sourceMappingURL=server.js.map