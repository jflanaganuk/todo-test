import { useState } from "react";

interface CreateItemProps {
  setItems: (title: string) => void;
  handleClearCompleted: () => void;
  handleClearAll: () => void;
}

export function CreateItem(props: CreateItemProps) {
  const [title, setTitle] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!title) return;
    props.setItems(title);
    setTitle(null);
  };

  return (
    <div className="AddItemContainer">
      <label htmlFor="item">Add New Item:</label>
      <input
        type="text"
        id="item"
        onChange={(e) => setTitle(e.target.value)}
        value={title || ""}
        placeholder="Enter item here"
      />
      <button name="Submit" onClick={handleSubmit}>
        Submit
      </button>
      <button name="ClearCompleted" onClick={props.handleClearCompleted}>
        Clear Completed
      </button>
      <button name="ClearAll" onClick={props.handleClearAll}>
        Clear All
      </button>
    </div>
  );
}
