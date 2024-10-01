import { Button, Group, Stack, Text, TextInput, em } from "@mantine/core";
import { useDebouncedValue, useMediaQuery } from "@mantine/hooks";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  type MRT_PaginationState,
  type MRT_SortingState,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import { getLibraries } from "../../api/getLibraries.ts";
import { LIBRARY_COLUMNS } from "./libraryColumns.tsx";

const DEFAULT_PAGINATION_STATE = { pageIndex: 0, pageSize: 5 };

const LibrariesList = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(409)}`);
  const columns = useMemo(() => LIBRARY_COLUMNS(isMobile), [isMobile]);

  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 200);

  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>(
    DEFAULT_PAGINATION_STATE,
  );

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["libraries"],
    queryFn: () =>
      getLibraries({
        globalFilter: debouncedSearchValue,
        pagination,
        sorting,
      }),
    placeholderData: keepPreviousData,
  });

  const fetchedLibraries = data ?? [];

  useEffect(() => {
    refetch();
  }, [sorting, debouncedSearchValue, pagination]);

  const handleFiltersReset = () => {
    setSearchValue("");
    setPagination(DEFAULT_PAGINATION_STATE);
    setSorting([]);
  };

  const table = useMantineReactTable({
    columns,
    data: fetchedLibraries,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: false,
    enableGlobalFilter: false,
    enableFilterMatchHighlighting: false,
    enableHiding: false,
    enableFilters: false,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableTopToolbar: false,
    enableColumnActions: false,
    layoutMode: "grid",
    mantineToolbarAlertBannerProps: isError
      ? {
          color: "red",
          children: "Error loading data",
        }
      : undefined,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount: 13719905, // Whatever the bolded value under search input is at https://libraries.io/
    paginationDisplayMode: "pages",
    initialState: {
      density: "xs",
      pagination: DEFAULT_PAGINATION_STATE,
      sorting: [{ id: "stars", desc: true }],
    },
    state: {
      isLoading: isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isFetching,
      sorting,
    },
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(event.target.value);

  return (
    <Stack>
      <Group justify="space-between">
        <TextInput
          value={searchValue}
          onChange={handleInputChange}
          w={isMobile ? "100%" : 250}
          disabled={isFetching}
          placeholder="Search for library"
        />
        <Button onClick={handleFiltersReset} w={isMobile ? "100%" : "inherit"}>
          Reset filters
        </Button>
      </Group>
      <MantineReactTable table={table} />
      <a
        href="https://v2.mantine-react-table.com/docs/guides/pagination#customize-pagination"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text>
          The table component is currently in Beta and there is no Pagination
          customization options yet
        </Text>
      </a>
    </Stack>
  );
};

export default LibrariesList;
