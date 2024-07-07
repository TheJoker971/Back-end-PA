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
exports.SessionMiddleware = void 0;
const service_result_1 = require("../services/service.result");
class SessionMiddleware {
    static isLogged(authService) {
        return function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                const authorization = req.headers['authorization'];
                if (authorization === undefined) {
                    res.status(401).end(); // UNAUTHORIZED
                    return;
                }
                const authParts = authorization.split(' ');
                if (authParts.length !== 2 || authParts[0] !== 'Bearer') {
                    res.status(401).end(); // UNAUTHORIZED
                    return;
                }
                const token = authParts[1];
                const sr = yield authService.getSession(token);
                switch (sr.errorCode) {
                    case service_result_1.ServiceErrorCode.success:
                        req.user = (_a = sr.result) === null || _a === void 0 ? void 0 : _a.user;
                        next();
                        break;
                    default:
                        res.status(401).end(); // UNAUTHORIZED
                        break;
                }
            });
        };
    }
}
exports.SessionMiddleware = SessionMiddleware;
