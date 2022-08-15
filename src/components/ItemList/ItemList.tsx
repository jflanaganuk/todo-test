import "../../App.css";

export interface Item {
  id: number;
  title: string;
  completed: boolean;
}

interface ItemListProps {
  items: Item[];
  handleComplete: (id: number) => void;
}

export function ItemList(props: ItemListProps) {
  return (
    <ol className="ItemList">
      {props.items.map((item) => {
        return (
          <li
            className={item.completed ? "Complete" : ""}
            key={item.id}
            onClick={() => props.handleComplete(item.id)}
          >
            {item.title}
          </li>
        );
      })}
    </ol>
  );
}
