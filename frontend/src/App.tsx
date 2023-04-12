import React from "react";
import { GET_AGENTS } from "./client";
import { useQuery } from "@apollo/client";

import { AppContext } from "./context";

import Interactions from "./components/interactions";
import InteractionContent from "./components/InteractionContent";
import { Id } from "./types";
import Banner from "./components/Banner";
function App() {
    const { data: agentData } = useQuery(GET_AGENTS);

    const [selectedId, setSelectedId] = React.useState<Id | undefined>();

    function handleSelection(id: Id) {
        setSelectedId(id);
    }

    return (
        <AppContext.Provider
            value={{
                selectedId: selectedId,
                // faking an agent (using for in new message / notes )
                agent: agentData?.agents[0],
            }}
        >
            <div className="h-screen">
                <Banner />
                <div className="bg-slate p-6 h-5/6">
                    <div className="flex bg-white h-full rounded">
                        <Interactions onSelect={handleSelection} />
                        <div className=" h-full pt-4 pb-8 px-6 grow">
                            {!selectedId && (
                                <p>Select an Interaction to Start!</p>
                            )}
                            {selectedId && <InteractionContent />}
                        </div>
                    </div>
                </div>
            </div>
        </AppContext.Provider>
    );
}

export default App;
