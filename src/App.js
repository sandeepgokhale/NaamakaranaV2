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
      <h2>{name}</h2>
    </div>
  );
}
