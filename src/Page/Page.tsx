import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Content, Footer, Header, Sidebar } from "../layout";

const Page = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 200,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      footer={{
        height: 60,
      }}
      padding="md"
    >
      <Header opened={opened} toggle={toggle} />
      <Sidebar />
      <Content />
      <Footer />
    </AppShell>
  );
};

export default Page;
