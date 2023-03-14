import React from "react";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import routes from "../../routes";

const AppContent = () => {
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get("ref");
  const refReward = localStorage.getItem("refReward");

  if (refCode && !refReward) {
    localStorage.setItem("ref", refCode);
  }

  return (
    <div className="h-full">
      {" "}
      <Routes>
        {routes.map((route, idx) => {
          return (
            route.element && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={<route.element />}
              />
            )
          );
        })}
        {localStorage.getItem("user") ? (
          <Route path="/" element={<Navigate to="/home" replace />} />
        ) : (
          <Route path="/" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </div>
  );
};

export default AppContent;
