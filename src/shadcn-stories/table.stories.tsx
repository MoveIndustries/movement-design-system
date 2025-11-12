import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/shadcn/table";
import { useSortableData } from "../components/shadcn/table-hooks";

const meta = {
  title: "UI/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["simple", "borders", "alternating"],
      description: "Visual variant of the table",
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "Inactive",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "User",
    status: "Active",
  },
];

function SortableTableContent() {
  const sortedUsers = useSortableData(users);

  return (
    <>
      <TableHeader>
        <TableRow>
          <TableHead sortKey="name">Name</TableHead>
          <TableHead sortKey="email">Email</TableHead>
          <TableHead sortKey="role">Role</TableHead>
          <TableHead sortKey="status">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}

export const Simple: Story = {
  args: {
    variant: "simple",
  },
  render: (args) => (
    <Table {...args}>
      <SortableTableContent />
    </Table>
  ),
};

export const Borders: Story = {
  args: {
    variant: "borders",
  },
  render: (args) => (
    <Table {...args}>
      <SortableTableContent />
    </Table>
  ),
};

export const Alternating: Story = {
  args: {
    variant: "alternating",
  },
  render: (args) => (
    <Table {...args}>
      <SortableTableContent />
    </Table>
  ),
};

export const WithCaption: Story = {
  args: {
    variant: "simple",
  },
  render: (args) => (
    <Table {...args}>
      <TableCaption>
        A list of users in the system. Click on column headers to sort.
      </TableCaption>
      <SortableTableContent />
    </Table>
  ),
};

export const NonSortable: Story = {
  args: {
    variant: "simple",
  },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
