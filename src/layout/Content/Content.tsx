import { AppShell } from "@mantine/core";
import LibrariesList from "../../components/LibrariesTable/LibrariesTable.tsx";

const Content = () => {
  return (
    <AppShell.Main>
      <LibrariesList />
    </AppShell.Main>
  );
};

export default Content;
