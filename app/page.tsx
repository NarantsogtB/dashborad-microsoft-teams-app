"use client";
import { useEffect } from "react";
import * as microsoftTeams from "@microsoft/teams-js";

const Dashboard = () => {
  useEffect(() => {
    microsoftTeams.app
      .initialize()
      .then(() => console.log("Teams SDK initialized"));
  }, []);

  return <div>Hello Teams Tab!</div>;
};

export default Dashboard;
