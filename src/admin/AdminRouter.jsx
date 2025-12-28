import { Refine } from "@refinedev/core";
import { dataProvider } from "./dataProvider";
import { HouseList } from "./pages/houses/list";
import { UserList } from "./pages/users/list";
import { ReportList } from "./pages/reports/list";
import { ReportShow } from "./pages/reports/show";
import { Dashboard } from "./pages/dashboard";
import { AdminLayout } from "./components/AdminLayout";
import { Route, Routes, Outlet } from "react-router-dom";

export const AdminRouter = () => {
  return (
    <Refine
      dataProvider={dataProvider}
      // routerProvider removed to avoid react-router-dom v7 vs v6 conflict
      resources={[
        {
          name: "houses",
          list: "/houses",
        },
        {
          name: "users",
          list: "/users",
        },
      ]}
      options={{
        syncWithLocation: false,
        warnWhenUnsavedChanges: true,
      }}
    >
      <Routes>
        <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="houses" element={<HouseList />} />
            <Route path="users" element={<UserList />} />
            <Route path="reports" element={<ReportList />} />
            <Route path="reports/:id" element={<ReportShow />} />
        </Route>
      </Routes>
    </Refine>
  );
};
