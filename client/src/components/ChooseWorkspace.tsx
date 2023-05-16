import { Workspace } from "@/utils/Types";
import React from "react";
import { StandardButton } from "./StandardButton";

interface Props {
  workspaces: Workspace[];
  onClick?: any;
}

const ChooseWorkspace = (props: Props) => {
  return (
    <div>
      {props.workspaces &&
        props.workspaces.map((ws: any) => (
          //   <button key={ws.id} onClick={() => props.onClick(ws)}>
          //     {ws.name}
          //   </button>
          <StandardButton
            key={ws.id}
            onClick={() => props.onClick(ws)}
            text={ws.name}
          />
        ))}
    </div>
  );
};

export default ChooseWorkspace;
