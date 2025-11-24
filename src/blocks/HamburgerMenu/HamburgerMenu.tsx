import { useState } from "react";
import { List, Bell } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/shadcn/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/shadcn/avatar";
import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import { Branding } from "@/components/Branding";
import { cn } from "@/lib/utils";

export interface HamburgerMenuProps {
  /**
   * User information
   */
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
  /**
   * Navigation items
   */
  navItems?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    active?: boolean;
  }>;
  /**
   * Profile menu items
   */
  profileMenuItems?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
  /**
   * Number of notifications
   */
  notificationCount?: number;
  /**
   * Callback when notification icon is clicked
   */
  onNotificationClick?: () => void;
  /**
   * Custom class name for the container
   */
  className?: string;
}

/**
 * HamburgerMenu component for mobile navigation
 *
 * A comprehensive mobile navigation component featuring:
 * - Hamburger menu icon that opens a slide-down menu
 * - Logo in the center
 * - Notification bell with badge
 * - User avatar
 * - Navigation tabs
 * - Profile section with user info and menu items
 */
export function HamburgerMenu({
  user = {
    name: "Moveus",
    email: "moveus@movementlabs.xyz",
    avatar: "",
  },
  navItems = [
    { label: "Tab 1", active: true },
    { label: "Tab 2" },
    { label: "Tab 3" },
    { label: "Tab 4" },
  ],
  profileMenuItems = [
    { label: "Your profile" },
    { label: "Settings" },
    { label: "Sign out" },
  ],
  notificationCount = 1,
  onNotificationClick,
  className,
}: HamburgerMenuProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(
    navItems.findIndex((item) => item.active) || 0
  );

  return (
    <div className={cn("relative w-full", className)}>
      {/* Navbar */}
      <nav className="relative h-16 flex items-center justify-between px-3 bg-background border-b">
        {/* Hamburger Menu */}
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-10">
              <List size={24} weight="bold" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-56">
            {/* Navigation Tabs */}
            {navItems.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => {
                  setActiveTab(index);
                  item.onClick?.();
                }}
                className={cn(
                  activeTab === index && "bg-accent text-accent-foreground"
                )}
              >
                {item.label}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            {/* Profile Menu */}
            <DropdownMenuLabel className="flex items-center gap-2 p-2">
              <Avatar className="size-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-yellow-400 text-black font-bold text-xs">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
              {notificationCount > 0 && (
                <button
                  onClick={onNotificationClick}
                  className="relative shrink-0"
                >
                  <Bell size={16} weight="regular" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 size-4 p-0 flex items-center justify-center text-[10px] bg-[#f068d4] text-white border-0"
                  >
                    {notificationCount}
                  </Badge>
                </button>
              )}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* Profile Menu Items */}
            {profileMenuItems.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Branding
            variant="logomark"
            color="color"
            className="size-8"
            alt="Movement Labs"
          />
        </div>

        {/* Notification and Profile */}
        <div className="flex items-center gap-2">
          {/* Notification Icon with Badge */}
          {notificationCount > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onNotificationClick}
              className="relative size-10"
              aria-label="Notifications"
            >
              <Bell size={20} weight="regular" />
              <Badge
                variant="destructive"
                className="absolute top-1 right-1 size-4 p-0 flex items-center justify-center text-[10px] bg-[#f068d4] text-white border-0"
              >
                {notificationCount}
              </Badge>
            </Button>
          )}

          {/* Avatar */}
          <Avatar className="size-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-yellow-400 text-black font-bold text-xs">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </nav>
    </div>
  );
}

