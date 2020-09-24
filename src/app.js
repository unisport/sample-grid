/**
 *
 */
import React, {Suspense, lazy} from "react";

// Dynamic loading
const Hello = lazy(() => import("./lib/Hello"));

// Main app
const App = () => {
    return <Suspense fallback={<div>Loading...</div>}>
            <Hello />
        </Suspense>
}

export default App;
