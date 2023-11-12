import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

const navigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "All Weeks",
    href: "/weeks",
  },
  {
    name: "Instructions",
    href: "/instructions",
  },
  {
    name: "Log",
    href: "/log",
  },
];

export default function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="m-2">
      <NavigationMenu>
        <NavigationMenuList className="mr-1">
          {navigation.map((nav, i) => (
            <NavigationMenuItem key={i}>
              <Link href={nav.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {nav.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
        <ModeToggle />
      </NavigationMenu>
    </div>
  );
}
