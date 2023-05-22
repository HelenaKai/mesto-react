function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="card">
      <img
        className="card__img"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="card__description">
        <h2 className="card__title">{props.card.name}</h2>
        <button type="button" className="card__delete"></button>
        <div className="card__like-container">
          <button type="button" className="card__like"></button>
          <div className="card__like-counter">{props.card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
