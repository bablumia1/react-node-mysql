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
exports.authController = void 0;
const express_validator_1 = require("express-validator");
const auth_entity_1 = require("./auth.entity");
const __1 = require("../..");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const class_transformer_1 = require("class-transformer");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = (0, express_validator_1.validationResult)(req);
            if (!error.isEmpty()) {
                return res.status(400).json({ error: error.array() });
            }
            const { name, email, password } = req.body;
            // Check if the user already exists
            const user = yield __1.AppDataSource.manager
                .createQueryBuilder(auth_entity_1.User, 'user')
                .where('user.email = :email', { email })
                .getOne();
            if (user) {
                return res.status(400).json({ error: 'This email address is already used' });
            }
            const newUser = new auth_entity_1.User();
            newUser.name = name;
            newUser.email = email;
            newUser.password = yield bcryptjs_1.default.hash(password, 10);
            let createduser;
            try {
                createduser = yield __1.AppDataSource.getRepository(auth_entity_1.User).save(newUser);
                createduser = (0, class_transformer_1.instanceToPlain)(createduser);
                return res.json(createduser).status(201);
            }
            catch (_error) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = (0, express_validator_1.validationResult)(req);
            if (!error.isEmpty()) {
                return res.status(400).json({ error: error.array() });
            }
            const { email, password } = req.body;
            try {
                const user = yield __1.AppDataSource.getRepository(auth_entity_1.User).findOne({
                    where: {
                        email,
                    },
                });
                if (!user) {
                    return res.status(400).json({ error: 'Invalid Credentials' });
                }
                if (!(yield bcryptjs_1.default.compare(password, user.password))) {
                    return res.status(400).json({ error: 'Invalid Credentials' });
                }
                //   generate access and refresh tokens
                const accessToken = (0, jsonwebtoken_1.sign)({ id: user.id }, 'secret', {
                    expiresIn: '2d',
                });
                const refreshToken = (0, jsonwebtoken_1.sign)({ id: user.id }, 'secret', {
                    expiresIn: '2d',
                });
                res.cookie('accessToken', accessToken, {
                    expires: new Date(Date.now() + 604800000), // 2 days
                    httpOnly: true,
                });
                res.cookie('refreshToken', refreshToken, {
                    expires: new Date(Date.now() + 604800000), // 2 days
                    httpOnly: true,
                });
                return res.json({
                    message: 'Login successful',
                });
            }
            catch (_error) {
                return res.json({ error: 'Internal Server Error' });
            }
        });
    }
    profile(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield __1.AppDataSource.getRepository(auth_entity_1.User).findOne({
                    where: {
                        id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
                    },
                });
                return res.json(user);
            }
            catch (_error) {
                return res.json({ error: 'Internal Server Error' });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            return res.json({ message: 'Logout successful' });
        });
    }
}
exports.authController = new AuthController();
