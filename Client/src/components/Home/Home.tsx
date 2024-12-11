import React from "react";
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import TaskList from "../Task/TaskList";
import CategoriesList from "../Category/Category";

const NAVIGATION: Navigation = [
  { kind: "header", title: "Main items" },
  { segment: "tasks", title: "Tasks", icon: <DashboardIcon /> },
  { kind: "divider" },
  { kind: "header", title: "Analytics" },
  {
    segment: "category",
    title: "Category",
    icon: <BarChartIcon />
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
});

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);
  const router = React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path: string | URL) => setPathname(String(path)),
  }), [pathname]);
  return router;
}

export default function DashboardLayoutBasic() {
  const router = useDemoRouter("/tasks");

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme}>
      <DashboardLayout>
        <PageContainer>
          {router.pathname === "/tasks" ? (
            <TaskList />
          ) : (
            <CategoriesList />
          )}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
