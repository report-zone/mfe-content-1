import React from "react";

// Micro frontend imports require ts-ignore as they reside in another repo and vscode cannot find them
//@ts-ignore
const Visualization = React.lazy(() => import("visualization/Visualization"));

export default function VisualizationContent() {
  return <Visualization />;
}
