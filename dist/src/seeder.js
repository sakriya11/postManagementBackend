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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./config/db/db"));
const upload_1 = __importDefault(require("./models/upload"));
const post = [
    {
        id: 1,
        img: "uploads\img\apple.jpg",
        title: "Grand Opening!",
        description: "Join us for the grand opening of our new restaurant location!",
        date: "25 septmber",
        role: "teacher"
    },
    {
        id: 2,
        img: "uploads\img\apple.jpg",
        title: "Grand Opening!",
        description: "Join us for the grand opening of our new restaurant location!",
        date: "25 septmber",
        role: "teacher"
    },
];
db_1.default.once("open", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connected to MongoDB");
    try {
        yield upload_1.default.deleteMany({});
        console.log("Existing exercises deleted.");
        const result = yield upload_1.default.insertMany(post);
        console.log("Seeded exercises:", result);
    }
    catch (error) {
        console.error("Error seeding data:", error);
    }
    finally {
        db_1.default.close();
        console.log("Connection closed.");
    }
}));
//# sourceMappingURL=seeder.js.map