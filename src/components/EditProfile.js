import PopupWithForm from "./PopupWithForm";

function EditProfile({ isOpen, onClose }) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="profile"
      buttonText="Сохранить"
      title="Редактировать профиль"
    >
      <label className="popup__input-wrap">
        <input
          id="input-name"
          className="popup__input popup__input_type_name"
          type="text"
          name="name"
          placeholder="Ваше имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__input-error input-name-error"></span>
      </label>

      <label className="popup__input-wrap">
        <input
          type="text"
          id="input-about"
          name="job"
          className="popup__input popup__input_type_about"
          placeholder="Описание"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__input-error input-about-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfile;
