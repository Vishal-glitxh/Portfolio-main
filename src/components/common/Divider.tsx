import React from "react";

export const Divider = React.memo(() => (
  <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: "15px 0" }} />
));

Divider.displayName = "Divider";
