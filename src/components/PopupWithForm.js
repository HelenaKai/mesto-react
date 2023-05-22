function PopupWithForm(props) {
  const { title, name, children, isOpen, onClose, buttonText } = props;
  return (
    <section  className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          type="button"
          className={`popup__close popup__close_${name}`}
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_${name}`}
          method="post"
          name={`${name}-form`}
          noValidate
        >
          {children}
          <button
            className={`popup__save-button popup__save-button_${name} popup__save-button_inactive`}
            type="submit"
            disabled
          >
            {buttonText || 'Сохранить'}
          </button>
        </form>
      </div>
    </section >
  );
}

export default PopupWithForm;

