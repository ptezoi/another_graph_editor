import { GraphInput } from "./components/GraphInput";
import { GraphCanvas } from "./components/GraphCanvas";
import { GraphSettings } from "./components/GraphSettings";

import { InputFormat, Settings } from "./types";
import { Graph } from "./types";

import { useState } from "react";
function App() {
  const [graphEdges, setGraphEdges] = useState<Graph>({
    nodes: new Array<string>(),
    adj: new Map<string, string[]>(),
    rev: new Map<string, string[]>(),
    edges: new Array<string>(),
    edgeLabels: new Map<string, string>(),
    nodeLabels: new Map<string, string>(),
  });

  const [graphParChild, setGraphParChild] = useState<Graph>({
    nodes: new Array<string>(),
    adj: new Map<string, string[]>(),
    rev: new Map<string, string[]>(),
    edges: new Array<string>(),
    edgeLabels: new Map<string, string>(),
    nodeLabels: new Map<string, string>(),
  });

  const [inputFormat, setInputFormat] = useState<InputFormat>("edges");
  const [directed, setDirected] = useState<boolean>(false);

  const [settings, setSettings] = useState<Settings>({
    labelOffset: 0,
    darkMode:
      localStorage.getItem("darkMode") !== null
        ? localStorage.getItem("darkMode") === "true"
        : false,
    nodeRadius:
      localStorage.getItem("nodeRadius") !== null
        ? Number.parseInt(localStorage.getItem("nodeRadius")!)
        : 16,
    nodeBorderWidthHalf:
      localStorage.getItem("nodeBorderWidthHalf") !== null
        ? Number.parseFloat(localStorage.getItem("nodeBorderWidthHalf")!)
        : 1,
    showComponents: false,
    showBridges: false,
    treeMode: false,
    lockMode: false,
  });

  return (
    <>
      <div
        className={
          settings.darkMode
            ? "dark bg-ovr text-text absolute w-full min-h-200 overflow-scroll"
            : "light bg-ovr text-text absolute w-full min-h-200 overflow-scroll"
        }
      >
        <GraphInput
          graphEdges={graphEdges}
          setGraphEdges={setGraphEdges}
          graphParChild={graphParChild}
          setGraphParChild={setGraphParChild}
          inputFormat={inputFormat}
          setInputFormat={setInputFormat}
          directed={directed}
          setDirected={setDirected}
        />

        <div className="relative z-0">
          <GraphCanvas
            graph={graphEdges}
            inputFormatToRender={"edges"}
            inputFormat={inputFormat}
            directed={directed}
            settings={settings}
          />

          <GraphCanvas
            graph={graphParChild}
            inputFormatToRender={"parentChild"}
            inputFormat={inputFormat}
            directed={directed}
            settings={settings}
          />
        </div>

        <GraphSettings
          directed={directed}
          settings={settings}
          setSettings={setSettings}
        />
      </div>
    </>
  );
}

export default App;
