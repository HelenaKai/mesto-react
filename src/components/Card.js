function Card({ card, onCardClick })  {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="card">
      <img
        className="card__img"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <button type="button" className="card__delete"></button>
        <div className="card__like-container">
          <button type="button" className="card__like"></button>
          <div className="card__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
