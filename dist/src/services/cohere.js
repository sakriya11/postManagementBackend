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
exports.generateAiText = void 0;
const cohere_ai_1 = require("cohere-ai");
const config_1 = __importDefault(require("../config"));
const cohere = new cohere_ai_1.CohereClient({
    token: config_1.default.cohereAi.apiKey,
});
const generateAiText = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield cohere.generate({
            model: "command",
            prompt: prompt,
        });
        const response = chat.generations[0].text;
        return response;
    }
    catch (error) {
        console.log(error);
    }
});
exports.generateAiText = generateAiText;
//# sourceMappingURL=cohere.js.map