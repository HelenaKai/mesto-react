import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import api from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);      // попап редактирования
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);            // попап добавления место
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);        // попап аватара
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);

  //Переменная состояния для карточек
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const [dataDeleteCard, setDataDeleteCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState({});
  const [buttonState, setButtonState] = useState(true);

  const handlePopupElement =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isImagePopupOpen ||
    isConfirmDeletePopupOpen;

  // --------закрытие по ESC и оверлею
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    const handleClick = (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        closeAllPopups();
      }
    };

    if (handlePopupElement) {
      document.addEventListener("keydown", handleEscClose);
      document.addEventListener("mousedown", handleClick);
      return () => {
        document.removeEventListener("keydown", handleEscClose);
        document.removeEventListener("mousedown", handleClick);
      };
    }
  }, [handlePopupElement]);

  //---------------------------------------------------------
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  // -------- Открыте изображение
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  };

  const handleCardDeleteClick = (card) => {
    setDataDeleteCard(card);
    setIsConfirmDeletePopupOpen(true);
  };

  //  --------- закрытие всех попапов
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
  };

  // Api------- Изменение данных пользователя
  const handleUpdateUser = (data) => {
    setIsLoading(true);
    api
      .changeUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  // Api-------- Изменение аватара
  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    api
      .changeUserAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  // Api--------Like
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Api----- Обработчик подтверждения удаления карточки
  const handleCardDelete = (card) => {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then((newCard) => {
        const newCards = cards.filter((c) =>
          c._id === card._id ? "" : newCard
        );
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  // Api----- Добавление карточки
  const handleAddPlaceSubmit = (card) => {
    setIsLoading(true);
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };


  function checkInputValidity(evt) {
    if (!evt.currentTarget.checkValidity()) {
      setErrorMessage({
        ...errorMessage,
        [evt.target.name]: evt.target.validationMessage,
      });
      setButtonState(true);
    } else {
      setErrorMessage({});
      setButtonState(false);
    }
  }

  useEffect(() => {
    setErrorMessage({});
    setButtonState(true);
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          currentUser={currentUser}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteClick}
        />

        <Footer date={new Date().getFullYear()} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          onValidate={checkInputValidity}
          buttonState={buttonState}
          errorMessage={errorMessage}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
          onValidate={checkInputValidity}
          buttonState={buttonState}
          errorMessage={errorMessage}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
          onValidate={checkInputValidity}
          buttonState={buttonState}
          errorMessage={errorMessage}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onSubmit={handleCardDelete}
          card={dataDeleteCard}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

