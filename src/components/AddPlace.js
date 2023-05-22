import PopupWithForm from './PopupWithForm';

function AddPlace(props) {
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="place"
      title="Новое место"
      buttonText="Создать"
    >
      <label className="popup__input-wrap">
        <input
          id="input-img-title"
          className="popup__input popup__input_type_name popup__input_img-title"
          type="text"
          name="title"
          placeholder="Название места"
          minLength="2"
          maxLength="30"
          required
          defaultValue=""
        />
        <span className="popup__input-error input-img-title-error"></span>
      </label>

      <label className="popup__input-wrap">
        <input
          id="input-url"
          className="popup__input popup__input_type_about popup__input-url"
          type="url"
          name="link"
          placeholder="Ссылка на изображение"
          required
          defaultValue=""
        />
        <span className="popup__input-error input-url-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlace;

