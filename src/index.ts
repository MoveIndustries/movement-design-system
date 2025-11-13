// Styles
import "./index.css";

// Components
export * from "./components/Icon";
export { DottedBackground } from "./components/DottedBackground";
export { IconButton } from "./components/IconButton/IconButton";
export { Logo } from "./components/Logo/Logo";
export { ProgressButton } from "./components/ProgressButton";
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/shadcn/accordion";
export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/shadcn/alert-dialog";
export { Alert, AlertDescription, AlertTitle } from "./components/shadcn/alert";
export { AspectRatio } from "./components/shadcn/aspect-ratio";
export {
  Avatar,
  AvatarFallback,
  AvatarImage,
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
export { ButtonGroup } from "./components/shadcn/button-group";
export { Calendar } from "./components/shadcn/calendar";
export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/shadcn/card";
export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./components/shadcn/carousel";
export {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "./components/shadcn/chart";
export type { ChartConfig } from "./components/shadcn/chart";
export { Checkbox } from "./components/shadcn/checkbox";
export {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/shadcn/collapsible";
export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./components/shadcn/command";
export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./components/shadcn/context-menu";
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/shadcn/dialog";
export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./components/shadcn/drawer";
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
export { Empty } from "./components/shadcn/empty";
export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "./components/shadcn/field";
export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "./components/shadcn/form";
export {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./components/shadcn/hover-card";
export { Input } from "./components/shadcn/input";
export {
  CryptoAmountInput,
  WalletIcon,
} from "./components/shadcn/crypto-amount-input";
export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "./components/shadcn/input-group";
export {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./components/shadcn/input-otp";
export { Item } from "./components/shadcn/item";
export { Kbd } from "./components/shadcn/kbd";
export { Label } from "./components/shadcn/label";
export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./components/shadcn/menubar";
export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "./components/shadcn/navigation-menu";
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/shadcn/pagination";
export {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/shadcn/popover";
export { Progress } from "./components/shadcn/progress";
export { RadioGroup, RadioGroupItem } from "./components/shadcn/radio-group";
export {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/shadcn/resizable";
export { ScrollArea, ScrollBar } from "./components/shadcn/scroll-area";
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
export { Separator } from "./components/shadcn/separator";
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./components/shadcn/sheet";
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "./components/shadcn/sidebar";
export { Skeleton } from "./components/shadcn/skeleton";
export { Slider } from "./components/shadcn/slider";
export { Toaster } from "./components/shadcn/sonner";
export { toast } from "sonner";
export { Spinner } from "./components/shadcn/spinner";
export { Switch } from "./components/shadcn/switch";
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
export type { SortDirection, SortFunction } from "./components/shadcn/table-hooks";
export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/shadcn/tabs";
export { Textarea } from "./components/shadcn/textarea";
export { Toggle, toggleVariants } from "./components/shadcn/toggle";
export { ToggleGroup, ToggleGroupItem } from "./components/shadcn/toggle-group";
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/shadcn/tooltip";
export { Typography, typographyVariants } from "./components/shadcn/typography";

// Utilities
export { cn } from "./lib/utils";
export {
  gradientBorderStyles,
  gradientBorderClasses,
  glassBackgroundStyles,
  glassBackgroundClasses,
} from "./lib/border-styles";

// Hooks
export { useIsMobile } from "./hooks/use-mobile";

// Theme scales
export {
  spacing,
  sizes,
  radii,
  borderWidths,
  shadows,
  zIndex,
} from "./lib/scales";

// Re-export useful types
export type { VariantProps } from "class-variance-authority";
