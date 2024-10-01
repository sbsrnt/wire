import { AppShell, Text } from "@mantine/core";

const Footer = () => {
  return (
    <AppShell.Footer p="md">
      <Text c="dimmed" ta="center">
        Bower Search © {new Date().getFullYear()}
      </Text>
    </AppShell.Footer>
  );
};

export default Footer;
