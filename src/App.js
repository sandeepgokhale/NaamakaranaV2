import React from "react";
import "./styles.css";
import playArea from "./arrays";

// TO DO :: Pass Max Length dynamically.
// const maxStars = playArea.stars.length;
// const maxColors = playArea.colors.length;
// const maxAnimals = playArea.animals.length;
// const maxAdj = playArea.adj.length;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const selectData = [
  { key: "stars", value: "Stars" },
  { key: "colors", value: "Colors" },
  { key: "animals", value: "Animals" }
];

function fetchRandomAdj() {
  return playArea.adj[getRandomInt("adj")];
}

function getRandomInt(abc) {
  // console.log(abc);
  // console.log(playArea[abc]);
  //console.log(playArea[abc].length);
  return Math.floor(Math.random() * Math.floor(playArea[abc].length));
}

const fetchName = selectedItem => {
  const adj = fetchRandomAdj();
  const names = playArea[selectedItem][getRandomInt(selectedItem)];
  const final = names.split(" ");
  const last = final[1] === undefined ? "" : capitalizeFirstLetter(final[1]);
  return (
    capitalizeFirstLetter(adj) +
    " " +
    capitalizeFirstLetter(final[0]) +
    " " +
    last
  );
};

export default function App() {
  const [selectedItem, setSelectedItem] = React.useState("stars");
  const [name, setName] = React.useState("");
  const [dropDownData] = React.useState(selectData);
  return (
    <div className="App">
      <h1>Find me a name</h1>
      <select onChange={e => setSelectedItem(e.target.value.toLowerCase())}>
        {dropDownData.map((value, index) => {
          return <option key={value.key}> {value.value} </option>;
        })}
      </select>
      <button
        onClick={() => {
          setName(fetchName(selectedItem));
        }}
      >
        Let's see
      </button>
      <br />
      <br />
      <br />
      <br />
      <h2>{name}</h2>
      {name && <AddToDatabase name={name} />}
    </div>
  );
}

class AddToDatabase extends React.Component {
  state = {
    data: [],
    loading: false,
    error: false,
    addButtonName: "Add as Fav [ if not there below]",
    displayButtonName: "Display Favs",
    addButtonStatus: false,
    displayButtonStatus: false
  };

  showFav = () => {
    const URL = "https://my-azure-nodejs-api.azurewebsites.net/";
    // const URL = "https://httpbin.org/ip";
    // fetch(URL)
    //   .then(resp => resp.json())
    //   .then(resp => console.log(resp));
    this.setState({
      displayButtonName: "Loading...",
      displayButtonStatus: !this.state.addButtonStatus
    });
    fetch(URL)
      .then(response => {
        console.log("inside");
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          displayButtonName: "Display Favs",
          data: data.results,
          displayButtonStatus: !this.state.addButtonStatus
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.showFav();
  }

  addAsFav = () => {
    const URL = "https://my-azure-nodejs-api.azurewebsites.net/";
    const data = { name: this.props.name };

    if (this.state.data.includes(data.name)) return;

    this.setState({
      addButtonName: "Loading...",
      addButtonStatus: !this.state.addButtonStatus
    });
    fetch(URL, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({
          addButtonName: "Add as Fav [ if not there below]",
          data: data.results,
          addButtonStatus: !this.state.addButtonStatus
        });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  render() {
    const {
      // displayButtonName,
      addButtonName,
      // displayButtonStatus,
      addButtonStatus
    } = this.state;
    return (
      <>
        <button disabled={addButtonStatus} onClick={this.addAsFav}>
          {addButtonName}
        </button>

        <hr />
        <h2> Recent Favorites </h2>
        {/* <button disabled={displayButtonStatus} onClick={this.showFav}>
          {displayButtonName}
        </button> */}
        {this.state.data.map((e, i) => {
          return (
            <div className="App" key={e + i}>
              {e}
            </div>
          );
        })}
      </>
    );
  }
}
