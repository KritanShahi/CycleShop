import "../app/globals.css"; // Tailwind CSS
import type { AppProps } from "next/app";
import ClientLayout from "../app/client-layout"; // optional: use App Router layout

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Wrap Pages Router pages in ClientLayout so fonts, header, footer, etc. match App Router
    <ClientLayout>
      <Component {...pageProps} />
    </ClientLayout>
  );
}
