import {
  Group,
  ScrollArea,
  AppShell,
  Transition,
  Burger,
  Image,
  Skeleton,
  useMantineTheme,
  NavLink,
  Button,
} from "@mantine/core";
import { useDisclosure, useResizeObserver } from "@mantine/hooks";
import { Suspense, useCallback } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { superAdminNavlinks } from "./AdminNavlinks";
import { merchantNavLinks } from "./MerchantNavlinks";
import Static_Logo from "../../../assets/Static_Logo.jpeg";
import { useAuth } from "../../../hooks/useAuth";

export function AdminAppShell() {
  const [navbarCollapsed, { toggle: toggleNavbar }] = useDisclosure();
  const location = useLocation();
  const [opened, { toggle }] = useDisclosure();
  const isRouteActive = (route: string) => location.pathname.includes(route);
  const theme = useMantineTheme();
  const { logout, user } = useAuth();
  const [ref, rect] = useResizeObserver();
  console.log(rect.height);
  const userRole = user?.role;
  const AdminOnMerchantPage =
    user?.role === "admin" && location?.pathname?.startsWith("/merchant");
  const navLinks = AdminOnMerchantPage
    ? merchantNavLinks
    : user?.role === "admin"
      ? superAdminNavlinks
      : merchantNavLinks;

  const handleLogout = () => {
    logout();
  };
  const navigate = useNavigate();
  const handleGoBacktoSuperAdminNavlink = useCallback(() => {
    navigate("/admin/partners-and-customers/merchants", {
      replace: true,
    });
  }, []);
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      {/* Header */}
      <AppShell.Header>
        <Group h="100%" px="md" gap={"xl"}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Suspense fallback={<Skeleton height={20} width={200} />}>
            <Image
              radius="md"
              h={50}
              width={300}
              fit="contain"
              alt="logo"
              src={Static_Logo}
            />
          </Suspense>
        </Group>
      </AppShell.Header>

      {/* Navbar */}
      <Transition
        mounted={!navbarCollapsed}
        transition="scale-x"
        duration={300}
        timingFunction="ease"
      >
        {(styles) => (
          <AppShell.Navbar p="sm" pr={0}>
            <AppShell.Section mr={"sm"}>
              {AdminOnMerchantPage && (
                <Button
                  // style={{ background: theme.colors.gray[7] }}
                  onClick={handleGoBacktoSuperAdminNavlink}
                  variant="outline"
                  fullWidth
                >
                  {"< "}
                  Go Back to Admin Panel
                </Button>
              )}
              <Button
                style={{ background: theme.colors.gray[7] }}
                fullWidth
                mt={5}
              >
                {" "}
                {AdminOnMerchantPage
                  ? "Merchant"
                  : userRole === "admin"
                    ? "Admin"
                    : ""}{" "}
                Panel
              </Button>
            </AppShell.Section>
            <AppShell.Section grow my="md" component={ScrollArea}>
              <ScrollArea scrollbarSize={1}>
                {navLinks?.map((navItem) => (
                  <NavLink
                    label={navItem.label}
                    leftSection={
                      <navItem.icon
                        size="1rem"
                        stroke={1.5}
                        style={{
                          color: isRouteActive(navItem.path)
                            ? theme.primaryColor
                            : theme.colors.gray[7],
                        }}
                      />
                    }
                    childrenOffset={28}
                    to={navItem.path}
                    component={Link}
                    key={navItem.label}
                    styles={{
                      label: {
                        color: isRouteActive(navItem.path)
                          ? theme.colors.green[7]
                          : theme.colors.gray[7],
                        fontWeight: isRouteActive(navItem.path)
                          ? "600"
                          : "normal",
                      },
                      root: { borderRadius: "10px" },
                      children: { paddingLeft: "15px" },
                    }}
                    bg={
                      isRouteActive(navItem.path)
                        ? theme.colors.green[0]
                        : undefined
                    }
                  >
                    {navItem?.submenu?.map((subNavItem) => (
                      <NavLink
                        component={Link}
                        to={subNavItem.path}
                        label={subNavItem.label}
                        key={subNavItem.label}
                        styles={{
                          label: {
                            color: isRouteActive(subNavItem.path)
                              ? theme.colors.green[7]
                              : theme.colors.gray[7],
                            fontWeight: isRouteActive(subNavItem.path)
                              ? "600"
                              : "normal",
                          },
                          root: { borderRadius: "5px" },
                        }}
                        leftSection={
                          <subNavItem.icon
                            size="1rem"
                            stroke={1.5}
                            style={{
                              color: isRouteActive(subNavItem.path)
                                ? theme.colors.green[7]
                                : theme.colors.gray[7],
                            }}
                          />
                        }
                      />
                    ))}
                  </NavLink>
                ))}
              </ScrollArea>
            </AppShell.Section>
            <AppShell.Section mr={"sm"}>
              <Button
                style={{ background: theme.colors.gray[7] }}
                onClick={handleLogout}
                fullWidth
              >
                Log out
              </Button>
            </AppShell.Section>
          </AppShell.Navbar>
        )}
      </Transition>
      <AppShell.Main ref={ref}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
