document.getElementById("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const input = document.querySelector("#searchInput").value;

  if (input !== "") {
    clearInfo();
    showWarning("Carregando...");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=2760844cc87fbfeb5b2bb35f07eb4e5d&units=metric&lang=pt_br
    `;

    const result = await fetch(url);
    const json = await result.json();

    if (json.cod !== 200) {
      clearInfo();
      showWarning("Não encontramos essa localização");
    }

    showInfo({
      name: json.name,
      country: json.sys.country,
      temp: json.main.temp,
      description: json.weather[0].description,
      main: json.weather[0].main,
      tempIcon: json.weather[0].icon,
      windSpeed: json.wind.speed,
      humidity: json.main.humidity,
    });
  }
});

function showInfo(json) {
  showWarning("");

  let icon;

  switch (json.main) {
    case "Clear":
      icon = "clear";
      break;

    case "Clouds":
      icon = "clouds";
      break;

    case "Drizzle":
      icon = "drizzle";
      break;

    case "Thunderstorm":
      icon = "thunderstorm";
      break;

    case "Rain":
      icon = "rain";
      break;

    case "Snow":
      icon = "snow";
      break;
  }

  document
    .querySelector(".result img")
    .setAttribute("src", `/images/icons/${icon}.png`);

  document.querySelector(".description").innerHTML = `${json.description}`;

  document.querySelector(
    ".city-name"
  ).innerHTML = `${json.name}, ${json.country}`;

  document.querySelector(".temp").innerHTML = `${Math.round(
    json.temp
  )}<sup>°c<sup>`;

  document.querySelector(
    ".result .more-info .humidity"
  ).innerHTML = `${json.humidity} %`;

  document.querySelector(
    ".result .more-info .wind"
  ).innerHTML = `${json.windSpeed} km/h`;

  document.querySelector(".result").style.display = "flex";
}

function clearInfo() {
  showWarning("");
  document.querySelector(".result").style.display = "none";
}

function showWarning(message) {
  document.querySelector("[data-warning]").innerHTML = message;
}
