interface AlertProperties {
  error: string;
  onClose: () => void;
}

const FormAlert = ({ error, onClose }: AlertProperties) => {
  return (
    <>
      <div className="alert alert-danger alert-dismissible fade show">
        <strong>{error}</strong>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
    </>
  );
};

export default FormAlert;
