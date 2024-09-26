import { ProgressSpinner } from "primereact/progressspinner";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="spinner">
      <ProgressSpinner />
    </div>
  );
};

export default Loading;
