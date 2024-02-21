import './loading-component.css';
function LoadingComponent (): JSX.Element {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
}

export {LoadingComponent};
