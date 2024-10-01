import type { MRT_ColumnDef } from "mantine-react-table";
import type { RepositoryDataLite } from "../../types.ts";

export const LIBRARY_COLUMNS = (
  isMobile?: boolean,
): MRT_ColumnDef<RepositoryDataLite>[] => [
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: false,
    size: isMobile ? 100 : 400,
  },
  {
    accessorKey: "owner",
    header: "Owner",
    enableSorting: false,
    size: 100,
  },
  {
    accessorKey: "stars",
    header: "Stars",
    size: 70,
  },
];
