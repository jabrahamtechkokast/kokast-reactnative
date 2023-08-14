import { createContext } from "react";
import type { GlobalOutputState } from "./Types";
import { OutputAction } from "./Types";


type OutputContextType = {
    globalOutputState: GlobalOutputState,
    outputDispatch: React.Dispatch<OutputAction>
}

export const OutputGlobalStateContext = createContext<OutputContextType | undefined>(undefined);