import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import TodoList from "./components/TodoList";
import TodoListModel from "./models/TodoListModel";
import { AsyncTrunk } from "mobx-sync";

const store = new TodoListModel();

// create a mobx-sync instance, it will:
// 1. load your state from localStorage & ssr renderred state
// 2. persist your store to localStorage automatically
const trunk = new AsyncTrunk(store, { storage: localStorage });

// init the state and auto persist watcher(use mobx's autorun)
trunk.init().then(() => {});

render(
  <div>
    <DevTools />
    <TodoList store={store} />
  </div>,
  document.getElementById("root")
);

window.addEventListener("storage", () => {
  // When local storage changes, update the list in the store
  try {
    const data = JSON.parse(window.localStorage.getItem("__mobx_sync__"));
    store.todos = data.todos;
    console.log(data);
  } catch (err) {}
});

// playing around in the console
window.store = store;
