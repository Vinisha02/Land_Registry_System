
import { LandRegProvider } from "@/context/LandReg"
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <LandRegProvider>
      <Component {...pageProps} />
    </LandRegProvider>
  );
}