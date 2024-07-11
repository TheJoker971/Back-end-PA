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
exports.AuthController = void 0;
const express_1 = __importDefault(require("express"));
const service_result_1 = require("../services/service.result");
const middlewares_1 = require("../middlewares/");
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    subscribe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sr = yield this.authService.subscribe(req.body.firstname, req.body.name, req.body.login, req.body.signature);
            switch (sr.errorCode) {
                case service_result_1.ServiceErrorCode.success:
                    res.status(201).json(sr.result);
                    break;
                case service_result_1.ServiceErrorCode.conflict:
                    res.status(409).end();
                    break;
                default:
                    res.status(500).end();
                    break;
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sr = yield this.authService.log(req.body.login, req.body.signature);
            switch (sr.errorCode) {
                case service_result_1.ServiceErrorCode.success:
                    res.status(201).json(sr.result);
                    break;
                case service_result_1.ServiceErrorCode.notFound:
                    res.status(404).end();
                    break;
                default:
                    res.status(500).end();
                    break;
            }
        });
    }
    me(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const u = req.user;
            res.json(u);
        });
    }
    buildRoutes() {
        const router = express_1.default.Router();
        router.post('/subscribe', express_1.default.json(), this.subscribe.bind(this));
        router.post('/login', express_1.default.json(), this.login.bind(this));
        router.get('/me', middlewares_1.SessionMiddleware.isLogged(this.authService), this.me.bind(this));
        return router;
    }
}
exports.AuthController = AuthController;
