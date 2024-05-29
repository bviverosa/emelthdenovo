import Link from "next/link";
import Escudo from "./iconos/escudo";

export default function Footer() {
  return (
    <footer>
      <div className="bg-slate-700 h-38 space-y-6 py-5 sm:flex hidden flex-col">
        <span className="flex items-center justify-center space-x-1">
          <Escudo className="h-6 w-6"></Escudo>
          <span className="text-xl">Emelth</span>
        </span>

        <div className="flex flex-row space-x-6 justify-center text-base">
          <Link href="/">Terminos y Condiciones</Link>
          <span>|</span>
          <Link href="/">Nosotros</Link>
          <span>|</span>
          <Link href="/">Ayuda</Link>
          <span>|</span>
          <Link href="/">Contáctanos</Link>
        </div>

        <div className="text-center text-slate-200 text-sm">
          © 2024 Emerald Health Inc. Todos los derechos reservados
        </div>
      </div>

      <div className="bg-slate-700 h-38 space-y-6 py-5 px-6 flex flex-col sm:hidden">
        <span className="flex items-center justify-center space-x-1">
          <Escudo className="h-6 w-6"></Escudo>
          <span className="text-lg">Emelth</span>
        </span>

        <div className="flex flex-col space-y-4 text-sm justify-start px-6">
          <Link href="/">Terminos y Condiciones</Link>

          <Link href="/">Nosotros</Link>

          <Link href="/">Ayuda</Link>

          <Link href="/">Contáctanos</Link>
        </div>
        <div className="text-center text-slate-200 text-xs">
          © 2024 Emerald Health Inc. Todos los derechos reservados
        </div>
      </div>
    </footer>
  );
}
