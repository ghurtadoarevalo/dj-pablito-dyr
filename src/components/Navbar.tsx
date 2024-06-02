import { useState, type Dispatch, type SetStateAction } from "react";
import { SiDiscogs } from "react-icons/si";
import { IoMdMenu } from "react-icons/io";
import SocialMedia from "./SocialMedia";

const pressRouteMenu = (
  setCurrentRoute: Dispatch<SetStateAction<string>>,
  routeName: string,
  setBurguerMenu: Dispatch<SetStateAction<boolean>>,
) => {
  setCurrentRoute(routeName);
  setTimeout(() => {
    setBurguerMenu(false);
  }, 1000);
};

const linkRouteClassName = (routeName: string, currentRoute: string) => {
  return currentRoute === routeName
    ? "text-gray-300 pl-4"
    : "text-gray-500 pl-4";
};

const navigationButtons = [
  { name: "Home", href: "#home" },
  { name: "Mixing", href: "#mixing" },
  { name: "Servicios", href: "#services" },
  { name: "Equipos", href: "#equipment" },
  { name: "Bio", href: "#bio" },
  { name: "Contacto", href: "#contact"},
];

const Navbar = () => {
  const [burguerMenu, setBurguerMenu] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("Home");

  return (
    <header className="fixed top-0 left-0 right-0 bg-zinc-900 py-3 z-10">
      <div className="flex flex-row place-content-evenly mx-1 lg:mx-20 lg:text-lg items-center font-customFont">
        <div className="flex">
          <SiDiscogs className="text-4xl lg:text-6xl text-white" />
          <div className="ml-3 lg:ml-5 border border-yellow-500"></div>
        </div>

        <nav className="ml-3 lg:ml-5">
            <SocialMedia namesRequired={false}  />
        </nav>

        <nav className="hidden lg:block">
          <ul className="flex items-center px-1 lg:ml-0 lg:gap-5">
            {navigationButtons.map((navigationButton) => (
              <li>
                <a
                  className={
                    linkRouteClassName(navigationButton.name, currentRoute) +
                    " flex gap-2 px-1 lg:p-2 rounded-lg hover:bg-white/5"
                  }
                  href={navigationButton.href}
                  key={navigationButton.name}
                  onClick={() => setCurrentRoute(navigationButton.name)}
                >
                  {navigationButton.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav>
          <button className="mt-1">
            {burguerMenu ? (
              <IoMdMenu
                className="text-3xl lg:hidden text-yellow-500"
                onClick={() => setBurguerMenu(!burguerMenu)}
              />
            ) : (
              <IoMdMenu
                className="text-3xl lg:hidden"
                onClick={() => setBurguerMenu(!burguerMenu)}
              />
            )}
          </button>
        </nav>
        {burguerMenu && (
          <ul className="fixed flex flex-col top-16 right-0 items-center place-content-center gap-5 bg-zinc-900 rounded-es-3xl w-1/3 h-1/2 flex-wrap">
            {navigationButtons.map((navigationButton) => (
              <li>
                <a
                  className="flex gap-2 px-1 lg:p-2 rounded-lg hover:bg-white/5"
                  href={navigationButton.href}
                  key={navigationButton.name}
                  onClick={() =>
                    pressRouteMenu(
                      setCurrentRoute,
                      navigationButton.name,
                      setBurguerMenu,
                    )
                  }
                >
                  {navigationButton.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Navbar;
