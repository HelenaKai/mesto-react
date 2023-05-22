import PopupWithForm from './PopupWithForm';

function EditAvatar({isOpen, onClose }) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="avatar"
      buttonText="Сохранить"
      title="Обновить аватар"
    >
      <label className="popup__input-wrap">
        <input
          id="input-avatar"
          className="popup__input popup__input_type_avatar"
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          minLength="2"
          required
        />
        <span className="popup__input-error input-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatar;
