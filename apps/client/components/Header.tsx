import { NavigationMenu } from "client/libs/shadcn/navigation-menu"
import {
  BorrowMenuLink,
  HistoryMenuLink,
  ManageMenuLink,
  PaymentsMenuLink,
  UserMenu,
} from "client/modules"

export const Header: React.FC = () => (
  <div className="flex flex-row justify-between p-6">
    <div className="flex flex-row gap-6">
      <h1 className="text-2xl font-bold">Sample Library</h1>
      <NavigationMenu>
        <BorrowMenuLink />
        <HistoryMenuLink />
        <PaymentsMenuLink />
        <ManageMenuLink />
      </NavigationMenu>
    </div>
    <UserMenu />
  </div>
)
