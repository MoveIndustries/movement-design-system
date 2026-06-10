// Styles
import "./index.css";

// Theme
export { ThemeProvider } from "./components/theme";
export type { ThemeProviderProps } from "./components/theme";

// Components
export * from "./components/Icon";
export {
  Footer,
  DesktopFooter,
  MobileFooter,
  footerLinkVariants,
  footerHeaderVariants,
  socialIconVariants,
} from "./components/Footer";
export type {
  FooterProps,
  FooterLink,
  FooterColumn,
  SocialLink,
} from "./components/Footer";
export { GlobalNavMenu, productBlockVariants } from "./components/GlobalNavMenu";
export type {
  GlobalNavMenuProps,
  NavMenuItem,
} from "./components/GlobalNavMenu";
export { IconButton } from "./components/IconButton/IconButton";
export { ProgressButton } from "./components/ProgressButton";
// WalletModal moved to separate entry point:
// import { WalletModal } from "@moveindustries/movement-design-system/wallet"
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/shadcn/accordion";
export { Alert, AlertDescription, AlertTitle } from "./components/shadcn/alert";
export {
  Avatar,
  AvatarFallback,
  AvatarImage,
  avatarVariants,
} from "./components/shadcn/avatar";
export { Badge, badgeVariants } from "./components/shadcn/badge";
export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/shadcn/breadcrumb";
export { Button, buttonVariants } from "./components/shadcn/button";
export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/shadcn/card";
// Carousel components moved to separate entry point:
// import { Carousel, ... } from "@moveindustries/movement-design-system/carousel"
export {
  Dialog,
  DialogClose,
  DialogContent,
  dialogContentVariants,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/shadcn/dialog";
// Drawer components moved to separate entry point:
// import { Drawer, ... } from "@moveindustries/movement-design-system/drawer"
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./components/shadcn/dropdown-menu";
export { Input } from "./components/shadcn/input";
export { Label } from "./components/shadcn/label";
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/shadcn/pagination";
export type { PaginationVariant } from "./components/shadcn/pagination";
export { Progress } from "./components/shadcn/progress";
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./components/shadcn/select";
export {
  Sheet,
  SheetClose,
  SheetContent,
  sheetContentVariants,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./components/shadcn/sheet";
export { Skeleton } from "./components/shadcn/skeleton";
export { Slider } from "./components/shadcn/slider";
export { Toaster, toast } from "./components/shadcn/sonner";
export type {
  CreateToastArgs,
  TypedToastArgs,
} from "./components/shadcn/sonner";
export { Spinner } from "./components/shadcn/spinner";
export type { ToastVariant } from "./components/shadcn/toast-types";
export { toastVariants } from "./components/shadcn/toast-types";
export { GlobalToaster, toast as movementToast } from "./lib/global-toast";
export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/shadcn/table";
export type { TableVariant } from "./components/shadcn/table";
export { useTableSort, useSortableData } from "./components/shadcn/table-hooks";
export type {
  SortDirection,
  SortFunction,
} from "./components/shadcn/table-hooks";
export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/shadcn/tabs";
export { ToggleGroup, ToggleGroupItem } from "./components/shadcn/toggle-group";
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/shadcn/tooltip";
export {
  Typography,
  Text,
  typographyVariants,
} from "./components/shadcn/typography";

// Utilities
export { cn } from "./lib/utils";
export { gradientBorderClasses } from "./lib/border-styles";

// Hooks
export { useIsMobile } from "./hooks/use-mobile";

// Re-export useful types
export type { VariantProps } from "class-variance-authority";
