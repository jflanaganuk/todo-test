import { useEffect, useState } from "react";
import "./App.css";
import { CreateItem } from "./components/CreateItem/CreateItem";
import { Item, ItemList } from "./components/ItemList/ItemList";

function App() {
  const [items, setItems] = useState<Item[]>([]);

  const handleSubmit = (title: string) => {
    const newItems = [
      ...items,
      { id: Math.floor(Math.random() * 10000), title, completed: false },
    ];
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
  };

  const handleComplete = (id: number) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, completed: true };
      }
      return item;
    });
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
  };
  
  const handleClearCompleted = () => {
    const newItems = items.filter((item) => !item.completed);
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
  }

  const handleClearAll = () => {
    setItems([]);
    localStorage.setItem("items", JSON.stringify([]));
  };

  useEffect(() => {
    localStorage.getItem("items") &&
      setItems(JSON.parse(localStorage.getItem("items") as string));
  }, []);

  return (
    <main className="App">
      <h1>TODO LIST</h1>
      <ItemList items={items} handleComplete={handleComplete} />
      <CreateItem setItems={handleSubmit} handleClearCompleted={handleClearCompleted} handleClearAll={handleClearAll} />
    </main>
  );
}

export default App;
