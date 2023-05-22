function ImagePopup(props) {
//console.log('props', props)

return (
    <section className={`popup popup_modal ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container-img">
        <button
          type="button"
          className="popup__close popup__close-img"
          onClick={props.onClose}
        ></button>
        <img className="popup__img" 
            src={props.card.link}
            alt={props.card.name} 
        />
        <h2 className="popup__title-img">{props.card.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;

