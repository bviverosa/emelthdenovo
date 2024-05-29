"use client";

import Link from "next/link";
import Escudo from "../iconos/escudo";

import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="bg-white shadow text-slate-600">
      <div className="flex h-14 justify-between items-center px-10">
        <a href="/">
          <Escudo className="h-6 w-6"></Escudo>
        </a>
        {/* Lo siguiente muestra el icono de mdesplegar menu debido al lg:hidden ya que nos esta mencionandop que apartir de 1024px se esconde */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className=" items-center hidden lg:flex justify-between ">
          <div className="justify-between items-center">
            <Link
              className="text-slate-600 mx-6  hover:text-sky-500 transition-colors"
              href="/"
            >
              Inicio
            </Link>
            <Link
              className="text-slate-600 mx-6  hover:text-sky-500 transition-colors"
              href="/nosotros"
            >
              Nosotros
            </Link>
            <Link
              className="text-slate-600 mx-6  hover:text-sky-500 transition-colors"
              href="/maps"
            >
              Mapa
            </Link>
            <Link
              className="text-slate-600 mx-6  hover:text-sky-500 transition-colors"
              href="/contacto"
            >
              Contacto
            </Link>
            <Link
              className="text-slate-600 mx-6  hover:text-sky-500 transition-colors"
              href="/ayuda"
            >
              Ayuda
            </Link>

            <a
              className="text-slate-600 ml-6  hover:text-sky-500 transition-colors"
              href="/signIn"
            >
              Sign in
            </a>
            
          </div>
        </div>
      </div>

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Escudo></Escudo>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Inicio
                </a>
                <a
                  href="/nosotros"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Nosotros
                </a>
                <a
                  href="/maps"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Mapa
                </a>
                <a
                  href="/contacto"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Contacto
                </a>
                <a
                  href="/ayuda"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Ayuda
                </a>
              </div>
              <div className="py-6 space-x-1">
                <a
                  href="/singIn"
                  className="-ml-3  rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Sign in
                </a>
                
                
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
