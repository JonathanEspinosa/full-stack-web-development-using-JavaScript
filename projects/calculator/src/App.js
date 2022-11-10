import { Component } from "react";
import Button from "./components/Button";
import "./css/style.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: "0",
      previous: "",
      nextIsReset: false,
    };
  }

  reset = () => {
    this.setState({ current: "0", previous: "", nextIsReset: false });
  };

  addToCurrent = (symbol) => {
    console.log(symbol);

    if (["*", "/", "+", "-"].indexOf(symbol) > -1) {
      let { previous } = this.state;
      if (!this.state.nextIsReset) {
        previous = previous.concat(this.state.current + symbol);
        console.log(previous);
        this.setState({ previous, nextIsReset: true });
      }
      if (this.state.nextIsReset && previous.charAt(previous.length - 1) !== symbol) {
        previous = previous.substring(0, previous.length - 1).concat(symbol);
        this.setState({ previous, nextIsReset: true });
      }
    } else {
      if (
        (this.state.current === "0" && symbol !== ".") ||
        this.state.nextIsReset
      ) {
        this.setState({ current: symbol, nextIsReset: false });
      } else {
        this.setState({ current: this.state.current + symbol });
      }
    }
  };

  calculate = () => {
    let { current, previous } = this.state;
    if (previous !== "") {
      current = eval(String(previous.concat(current)));
      console.log(current.toString());
      this.setState({ current, previous: current.toString(), nextIsReset: true });
    }
  };

  render() {
    const buttons = [
      { symbol: "C", cols: 3, action: this.reset },
      { symbol: "/", cols: 1, action: this.addToCurrent },
      { symbol: "7", cols: 1, action: this.addToCurrent },
      { symbol: "8", cols: 1, action: this.addToCurrent },
      { symbol: "9", cols: 1, action: this.addToCurrent },
      { symbol: "*", cols: 1, action: this.addToCurrent },
      { symbol: "4", cols: 1, action: this.addToCurrent },
      { symbol: "5", cols: 1, action: this.addToCurrent },
      { symbol: "6", cols: 1, action: this.addToCurrent },
      { symbol: "-", cols: 1, action: this.addToCurrent },
      { symbol: "1", cols: 1, action: this.addToCurrent },
      { symbol: "2", cols: 1, action: this.addToCurrent },
      { symbol: "3", cols: 1, action: this.addToCurrent },
      { symbol: "+", cols: 1, action: this.addToCurrent },
      { symbol: "0", cols: 2, action: this.addToCurrent },
      { symbol: ".", cols: 1, action: this.addToCurrent },
      { symbol: "=", cols: 1, action: this.calculate },
    ];

    return (
      <div className="App">
        {this.state.previous.length > 0 ? (
          <div className="floaty-last">{this.state.previous}</div>
        ) : null}
        <input className="result" type="text" value={this.state.current} />

        {buttons.map((btn, index) => {
          return (
            <Button
              key={index}
              symbol={btn.symbol}
              cols={btn.cols}
              action={btn.action}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
