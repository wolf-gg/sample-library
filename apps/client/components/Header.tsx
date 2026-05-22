import {
  NavigationMenu,
  NavigationMenuLink,
} from "client/libs/shadcn/navigation-menu"
import { UserMenu } from "client/modules"

export const Header: React.FC = () => (
  <div className="flex flex-row justify-between p-6">
    <div className="flex flex-row gap-6">
      <h1 className="text-2xl font-bold">Sample Library</h1>
      <NavigationMenu>
        <NavigationMenuLink href="/">Borrow</NavigationMenuLink>
        <NavigationMenuLink href="/manage">Manage</NavigationMenuLink>
        <NavigationMenuLink href="/payments">Payments</NavigationMenuLink>
      </NavigationMenu>
    </div>
    <UserMenu />
  </div>
)
