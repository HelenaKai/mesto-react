import { useState, useEffect } from "react";

import Card from "./Card.js";
import api from "../utils/Api.js";

function Main(props) {
  const { onEditAvatar, onEditProfile, onAddPlace, onCardClick } = props;

  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState([]);

  //Переменная состояния для карточек
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([{ avatar, name, about }, initialCards]) => {
        setUserAvatar(avatar);
        setUserName(name);
        setUserDescription(about);
        setCards(initialCards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <section className="profile">
        <div
          className="profile__avatar"
          aria-label="Открыть попап редактирования аватара"
          style={{ backgroundImage: `url(${userAvatar})` }}
        >
          <button
            className="profile__avatar-button"
            type="button"
            onClick={onEditAvatar}
            // onClick={() => onEditAvatar(true)}
          ></button>
        </div>

        <div className="profile__info">
          <div className="profile__info-wrap">
            <h1 className="profile__title">{userName}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
              //onClick={() => onEditProfile(true)}
            ></button>
          </div>
          <h2 className="profile__subtitle">{userDescription}</h2>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
          //onClick={() => onAddPlace(true)}
        ></button>
      </section>

      <section className="cards" aria-label="Галерея фотографий">
        <ul className="cards__list">
          {cards.map((card) => {
            return (
              <Card key={card._id} card={card} onCardClick={onCardClick}></Card>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
