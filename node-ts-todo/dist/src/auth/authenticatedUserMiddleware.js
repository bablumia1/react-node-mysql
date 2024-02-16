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
exports.authenticatedUserMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_entity_1 = require("./auth.entity");
const __1 = require("../..");
const authenticatedUserMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.cookies['accessToken'];
        const payload = (0, jsonwebtoken_1.verify)(accessToken, 'secret');
        if (!payload) {
            return res.status(401).send({
                message: 'Unauthenticated',
            });
        }
        const user = yield __1.AppDataSource.getRepository(auth_entity_1.User).findOne({
            where: {
                id: payload.id,
            },
        });
        if (!user) {
            return res.status(401).send({
                message: 'Unauthenticated',
            });
        }
        req.user = user;
        next();
    }
    catch (e) {
        console.error(e);
        return res.status(401).send({
            message: 'Unauthenticated',
        });
    }
});
exports.authenticatedUserMiddleware = authenticatedUserMiddleware;
