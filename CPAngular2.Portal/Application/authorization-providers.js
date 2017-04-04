"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authorization_guard_1 = require("./authorization-guard");
var session_service_1 = require("./services/session.service");
exports.authorizationProviders = [authorization_guard_1.AuthorizationGuard, session_service_1.SessionService];
//# sourceMappingURL=authorization-providers.js.map