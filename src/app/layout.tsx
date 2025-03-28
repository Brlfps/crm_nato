import NextAuSessionProvider from "./componentes/providers/session_provaiders";
import { Providers } from "./providers";


export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-br">
      <body>
        <NextAuSessionProvider>
          <Providers>{children}</Providers>
        </NextAuSessionProvider>
      </body>
    </html>
  );
}
