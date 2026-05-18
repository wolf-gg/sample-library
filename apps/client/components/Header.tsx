import {
  NavigationMenu,
  NavigationMenuLink,
} from "client/libs/shadcn/navigation-menu"

export const Header: React.FC = () => (
  <div className="flex flex-row gap-6 p-6">
    <h1 className="text-2xl font-bold">Sample Library</h1>
    <NavigationMenu>
      <NavigationMenuLink href="/">Borrow</NavigationMenuLink>
      <NavigationMenuLink href="/manage">Manage</NavigationMenuLink>
    </NavigationMenu>
  </div>
)
