import { AppShell, Box, Burger, Group, List, NavLink, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ROUTES } from "../../constants.ts";

type HeaderProps = {
  opened: boolean;
  toggle: () => void;
};

const Header = ({ opened, toggle }: HeaderProps) => {
  const isMobile = useMediaQuery(`(max-width: ${em(767)}`);

  return (
    <AppShell.Header>
      <Group h="100%" mr="sm">
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
          ml="sm"
        />

        <Group justify="space-between" h="100%" ml={isMobile ? 0 : 28} w={isMobile ? "inherit" : "100%"}>
          <Box>Bower Search (Lite)</Box>
          <List
            visibleFrom="sm"
            listStyleType="none"
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              alignItems: "center",
            }}
          >
            {ROUTES.header.map((route) => (
              <List.Item key={`header_${route.path}`}>
                <NavLink
                  href={route.path}
                  label={route.label}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </List.Item>
            ))}
          </List>
        </Group>
      </Group>
    </AppShell.Header>
  );
};

export default Header;
