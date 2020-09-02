import React, { useEffect } from "react";
import Grid from "./components/grid";
import "./App.scss";
import { getRequest, sort } from "./util";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  componentDidMount() {
    const requestPromise = getRequest(
      "https://www.unisport.dk/api/products/batch/?list=206348,188894,205946,204692,201338,202483,205989,205990,188896,201176,189188,209208,201481,201440,197237,206384,201450,205962,203906,193858,206566,193638,195932,197250,205949,205896,193539,197362,203234,194885,188489,204598,195935,198079,203856,205934,204085,205951,201174,188893"
    ).then(response => {
      if (response && response.products) {
        /*
         * since data will not change and is fetched only once on the initial render
         * I decided to store sorted products in the state
         */
        this.setState({
          data: response.products.sort((a, b) =>
            sort(a.discount_percentage, b.discount_percentage, false, true)
          )
        });
      }
    });
  }
  render() {
    return (
      <div className="App">
        <Grid data={this.state.data} />
      </div>
    );
  }
}

export default App;
