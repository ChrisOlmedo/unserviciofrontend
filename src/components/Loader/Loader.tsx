const Loader = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '40vh'
  }}>
    <div className="spinner-border text-primary" role="status" style={{ width: 48, height: 48 }}>
      <span className="visually-hidden">Cargando...</span>
    </div>
  </div>
);

export default Loader; 