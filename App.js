import React from "react";
import Main from "./Main";
import SettingsContext from "./contexts/SettingsContext";
import PermissionsContext from "./contexts/PermissionsContext";

const App = () => {
  return (
    <PermissionsContext>
      <SettingsContext>
        <Main />
      </SettingsContext>
    </PermissionsContext>
  );
};

export default App;
