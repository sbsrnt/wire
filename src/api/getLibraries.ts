import type {
  MRT_PaginationState,
  MRT_SortingState,
} from "mantine-react-table";
import type { RepositoryData } from "../types.ts";

interface Params {
  globalFilter: string;
  sorting: MRT_SortingState;
  pagination: MRT_PaginationState;
}

function extractOwnerFromUrl(url: string) {
  try {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split("/");

    // The second segment after splitting is the username
    return pathSegments[1];
  } catch (error) {
    console.error("Invalid URL:", error);
    return "-";
  }
}

export async function getLibraries({
  globalFilter,
  sorting,
  pagination,
}: Params) {
  try {
    const fetchURL = new URL("https://libraries.io/api/search");

    fetchURL.searchParams.set("page", String(pagination.pageIndex + 1)); // default is 1
    fetchURL.searchParams.set("per_page", String(pagination.pageSize));
    fetchURL.searchParams.set("api_key", import.meta.env.VITE_API_KEY);

    globalFilter.length > 0 && fetchURL.searchParams.set("q", globalFilter);
    sorting.length > 0 &&
      fetchURL.searchParams.set(
        "sort",
        sorting[0].id === "owner" ? "repository_url" : sorting[0].id,
      );

    const data: RepositoryData[] = await fetch(fetchURL.href).then((response) =>
      response.json(),
    );
    const projects = data.map((data) => ({
      stars: data.stars || 0,
      name: data.name || "-",
      owner: extractOwnerFromUrl(data.repository_url),
    }));

    return projects;
  } catch (e) {
    console.error(e);
    return null;
  }
}
