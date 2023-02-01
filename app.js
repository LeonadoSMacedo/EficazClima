// Interacao (header) 01:05
const barraPesquisaCidade = document.getElementById('barra-pesquisa-cidade');
const botaoPesquisaCidade = document.getElementById('barra-pesquisa-botao');

// Exibicao
const dataAtual = document.getElementById('data-atual');
const nomeCidade = document.getElementById('nome-cidade');
const climaIcon = document.getElementById('clima-icon'); // Esse nao foi para a function displayclima
const climaDescricao = document.getElementById('clima-descricao');
const temperaturaAtual = document.getElementById('temperatura-atual');
const velocidadeVentoAtual = document.getElementById('velocidade-vento-atual');
const sensacaoTemperaturaAtual = document.getElementById('sensacao-temperatura-atual');
const umidadeAtual = document.getElementById('umidade-atual');
const nascerSolTime = document.getElementById('nascersol-time');
const porSolTime = document.getElementById('porsol-time');

const api_key = "573f72a1b6827b63ea371a0ee21b1773";

botaoPesquisaCidade.addEventListener( "click", () => {

    let nomeCidade = barraPesquisaCidade.value
    getCityWeather(nomeCidade)
})


//https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric$lang=pt_br&appid=${api_key}

navigator.geolocation.getCurrentPosition(
    (position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        
        getCurrentLocationWeather(lat, lon)
    },
    (err) => {
        if (err.code === 1){
            alert('Geolocalizacao negada pelo usuario, busque manualmente por uma cidade atraves da barra de pesquisas')
        } else {
            console.log(err)
        }
    }
)

function getCurrentLocationWeather (lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
        .then((response) => response.json())
        .then((data) => exibirTempo (data))
}

function getCityWeather(nomeCidade) {

    climaIcon.src=`./assets/loading-icon.svg`


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nomeCidade}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => response.json())
    .then((data) => exibirTempo (data))
}

function exibirTempo(data) { //destrituracao
    let {
        dt,
        name,
        weather: [{ icon, description }],
        main: { temp, feels_like, humidity },
        wind: { speed },
        sys: { sunrise, sunset },
     } = data

     dataAtual.textContent = formatDate(dt)
     nomeCidade.textContent = name;
     climaIcon.src=`./assets/${icon}.svg`
     climaDescricao.textContent = description;
     temperaturaAtual.textContent = `${Math.round(temp)}ºC`;
     velocidadeVentoAtual.textContent = `${Math.round(speed * 3.6)}Km/h`;
     sensacaoTemperaturaAtual.textContent = `${Math.round(feels_like)}ºC`;
     umidadeAtual.textContent = `${humidity}%`;
     nascerSolTime.textContent = formatTime(sunrise);
     porSolTime.textContent = formatTime(sunset);
}

function formatDate(epochTime) {
    let date = new Date(epochTime * 1000)
    let formattedDate = date.toLocaleDateString("pt-BR", { month: "long", day: 'numeric'})
    return `Hoje, ${formattedDate}`
}

function formatTime (epochTime) {
    let date = new Date(epochTime * 1000)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    return `${hours}:${minutes}`
}
