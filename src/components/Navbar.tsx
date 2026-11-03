import { useEffect, useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import SocialMedia from "./SocialMedia";

const navigationLinks = [
  { label: "Inicio", href: "#home" },
  { label: "Mixes", href: "#mixing" },
  { label: "Servicios", href: "#services" },
  { label: "Equipos", href: "#equipment" },
  { label: "Biografía", href: "#bio" },
  { label: "Contacto", href: "#contact" },
] as const;

const mobileMenuId = "mobile-navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("Inicio");

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const selectRoute = (label: string) => {
    setCurrentRoute(label);
    setMenuOpen(false);
  };

  const linkClassName = (label: string, mobile = false) => {
    const active = currentRoute === label;
    const base = mobile
      ? "flex min-h-11 items-center rounded-sm px-3 text-sm font-bold transition-colors"
      : "rounded-sm px-2 py-2 text-xs font-bold uppercase tracking-wide transition-colors";

    return `${base} ${
      active
        ? "bg-yellow-400/10 text-yellow-300"
        : "text-zinc-400 hover:text-white"
    }`;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800/80 bg-[#0b0b0d]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          onClick={() => selectRoute("Inicio")}
          className="min-h-11 whitespace-nowrap py-3 text-sm font-black tracking-[0.14em] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
          aria-label="DJ Pablito Dyr, ir al inicio"
        >
          PABLITO <span className="text-yellow-400">DYR</span>
        </a>

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={
                    currentRoute === link.label ? "page" : undefined
                  }
                  onClick={() => selectRoute(link.label)}
                  className={linkClassName(link.label)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <SocialMedia namesRequired={false} />
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls={mobileMenuId}
          onClick={() => setMenuOpen((open) => !open)}
          className="grid size-11 place-items-center rounded-sm text-2xl text-white transition-colors hover:bg-white/5 hover:text-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 lg:hidden"
        >
          {menuOpen ? (
            <IoMdClose aria-hidden="true" />
          ) : (
            <IoMdMenu aria-hidden="true" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div
          id={mobileMenuId}
          className="border-t border-zinc-800 bg-[#0b0b0d] px-4 pb-5 pt-3 shadow-2xl lg:hidden"
        >
          <nav aria-label="Navegación móvil">
            <ul className="grid gap-1">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={
                      currentRoute === link.label ? "page" : undefined
                    }
                    onClick={() => selectRoute(link.label)}
                    className={linkClassName(link.label, true)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-4 border-t border-zinc-800 pt-3">
            <SocialMedia namesRequired />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
