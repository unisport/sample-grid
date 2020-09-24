/**
 *
 */
import React, {Suspense, lazy, useState, useEffect} from "react";

// Dynamic loading
const Hello = lazy(() => import("./lib/Hello"));

// Load data
// TODO: Move to separate file
const useFetch = url => {
    const [data, setData] = useState(null);

    async function fetchData() {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
    }

    useEffect(() => {fetchData()}, [url]);

    return data;
}

// Main app
const App = () => {
    const data = useFetch("/data.json");

    if (data === null) {
        // No products have been loaded
        return <div>Loading... slow internet is a bitch!</div>;
    } else {
        // Products have been loaded
        return <Suspense fallback={<div>Loading...</div>}>
                <Hello />
            </Suspense>
    }
}

export default App;
