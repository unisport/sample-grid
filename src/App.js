import React from "react";

import Grid from "@mui/material/Grid";

import List from "./List";
//the main app builds from here.
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <div className="image-grid">
          <Grid container>
            <List></List>
          </Grid>
        </div>
      </div>
    );
  }
}
export default App;
