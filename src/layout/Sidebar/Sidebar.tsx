import { AppShell, List, NavLink } from "@mantine/core";
import { ROUTES } from "../../constants.ts";

const Sidebar = () => {
  return (
    <AppShell.Navbar p="md">
      <List listStyleType="none">
        {ROUTES.sidebar.map((route) => (
          <List.Item key={`sidebar_${route.path}`}>
            <NavLink
              href={route.path}
              label={route.label}
              target="_blank"
              rel="noopener noreferrer"
            />
          </List.Item>
        ))}
      </List>
      <List hiddenFrom="sm" listStyleType="none">
        {ROUTES.header.map((route) => (
          <List.Item key={`sidebar_header_${route.path}`}>
            <NavLink
              href={route.path}
              label={route.label}
              target="_blank"
              rel="noopener noreferrer"
            />
          </List.Item>
        ))}
      </List>
    </AppShell.Navbar>
  );
};

export default Sidebar;
