// API Key (substitua por sua própria chave da OpenWeatherMap)
const apiKey = 'c10e334f45708b72b6a9b88d64b7a666'; // Chave fornecida no exemplo

// Selecionando os elementos da interface
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const weatherIcon = document.getElementById('weather-icon');
const locationInput = document.getElementById('location-input');
const searchButton = document.getElementById('search-button');
const forecast = document.getElementById('forecast');
const errorMessage = document.getElementById('error-message');
const localTime = document.getElementById('local-time');

// Função para buscar os dados de previsão do tempo e previsão simultaneamente
async function fetchWeather(city) {
    try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;

        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
        ]);

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        if (weatherData.cod === '404' || forecastData.cod === '404') {
            showError('Local não encontrado.');
            return;
        }

        updateWeatherUI(weatherData);
        updateForecastUI(forecastData);
        updateLocalTime(weatherData.timezone);
    } catch (error) {
        console.error('Erro ao buscar os dados', error);
        showError('Erro ao buscar os dados. Tente novamente mais tarde.');
    }
}

// Função para mostrar mensagens de erro na interface
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Função para atualizar a interface com os dados do tempo
function updateWeatherUI(data) {
    cityName.textContent = data.name;
    temperature.textContent = Math.round(data.main.temp);
    condition.textContent = data.weather[0].description;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

// Função para atualizar a interface com a previsão do tempo
function updateForecastUI(data) {
    forecast.innerHTML = '';
    for (let i = 0; i < data.list.length; i += 8) {
        const dayForecast = data.list[i];
        const date = new Date(dayForecast.dt_txt).toLocaleDateString('pt-BR');
        const temp = Math.round(dayForecast.main.temp);
        const weather = dayForecast.weather[0].description;
        const icon = `http://openweathermap.org/img/wn/${dayForecast.weather[0].icon}@2x.png`;

        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
            <p><strong>${date}</strong></p>
            <p>Temp: ${temp}°C</p>
            <p>Condições: ${weather}</p>
            <img src="${icon}" alt="Ícone do tempo">
        `;
        forecast.appendChild(forecastItem);
    }
}

// Função para atualizar o horário local
function updateLocalTime(timezone) {
    const now = new Date();
    const localTimeOffset = now.getTimezoneOffset() * 60000;
    const cityTime = new Date(now.getTime() + localTimeOffset + timezone * 1000);
    localTime.textContent = cityTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// Adicionando evento ao botão de busca
searchButton.addEventListener('click', function () {
    const city = locationInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        showError('Por favor, insira uma localidade.');
    }
});

// Ao carregar a página, buscar automaticamente a previsão para Brasília
document.addEventListener('DOMContentLoaded', function () {
    locationInput.value = 'Brasília';
    fetchWeather('Brasília');
});