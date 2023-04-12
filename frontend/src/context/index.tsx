import React from "react";
import { Agent, Id } from "../types";

type Context = {
    selectedId?: Id;
    agent?: Agent;
};

export const AppContext = React.createContext<Context>({} as Context);
