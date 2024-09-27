import type { ConfigRoutes } from "@/types/route";

export const APP_ROUTES: ConfigRoutes = {
  blockRoutes: ["/home"],
  publicRoutes: ["/login", "/reset-password", "/termos/uso"],
  privateRoutes: [
    "/",
    "/solicitacoes",
    "/solicitacoes/:id",
    "/aprovacao",
    "/aprovacao/:id",
    "/perfil",
    "/perfil/:id",
    "/register"
  ]
};
