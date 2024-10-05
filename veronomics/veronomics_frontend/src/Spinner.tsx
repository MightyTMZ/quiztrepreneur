import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-body">
      <div className="orbit-container">
        <div className="planet"></div>
        <div className="orbit-ring ring1"></div>
        <div className="orbit-ring ring2"></div>
        <div className="orbit-object object1"></div>
        <div className="orbit-object object2"></div>
      </div>
    </div>
  );
};

export default Spinner;
