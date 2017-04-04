import { AuthorizationGuard } from "./authorization-guard";
import { SessionService } from "./services/session.service";

export const authorizationProviders = [AuthorizationGuard, SessionService];