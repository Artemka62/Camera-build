import './loading-component.css';
function LoadingComponent (): JSX.Element {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p className="loading-text">Загрузка...</p>
    </div>
  );
}

export {LoadingComponent};
