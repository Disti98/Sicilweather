const $logo = document.querySelector(".logo");
const $formSelect = document.querySelector(".form");
const $selectProvinces = document.querySelector("#select_provinces");
const $resultUl = document.querySelector(".result_ul");
const provincesArr = [
  "Agrigento",
  "Caltanissetta",
  "Catania",
  "Enna",
  "Messina",
  "Palermo",
  "Ragusa",
  "Siracusa",
  "Trapani",
];

$logo.querySelector(".logo_icon").onclick = () => location.reload();
$logo.querySelector(".logo_title").onclick = () => location.reload();

const loadAll = () => {
  const allCity = [];
  provincesArr.map((el) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${el.toLowerCase()}&appid=d89527275bc1b556004113da77ae05be&units=metric`
    )
      .then((response) => response.json())
      .then((json) => {
        allCity.push(json);
        const sortCity = (a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        };
        allCity.sort(sortCity);
        $resultUl.innerHTML = "";
        allCity.forEach((json) => {
          $resultUl.insertAdjacentHTML(
            "beforeend",
            `<li class="weather_card">
       <h3 class="province_name">${json.name}</h2>
       <img src="http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png"
       <span class="weather">${json.weather[0].main}</span>
       <span class="temp">${json.main.temp}°</span>
       <span class="min_max">${json.main.temp_min}°/${json.main.temp_max}°</span>
     </li>`
          );
        });
      });
  });
};

loadAll();

$formSelect.addEventListener("submit", (event) => {
  event.preventDefault();

  if ($selectProvinces.value !== "--- All ---") {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${$selectProvinces.value.toLowerCase()}&appid=d89527275bc1b556004113da77ae05be&units=metric`
    )
      .then((response) => {
        // console.log({ response });
        const json = response.json();
        // console.log({ json });
        return json;
      })
      .then((json) => {
        // console.log(json);
        // console.log(json.name);
        // console.log(json.weather[0].icon);
        // console.log(json.weather[0].main);
        // console.log(json.main.temp);
        // console.log(json.main.temp_min, json.main.temp_max);
        $resultUl.innerHTML = `<li class="weather_card">
                                  <h3 class="province_name">${json.name}</h2>
                                  <img src="http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png"
                                  <span class="weather">${json.weather[0].main}</span>
                                  <span class="temp">${json.main.temp}°</span>
                                  <span class="min_max">${json.main.temp_min}°/${json.main.temp_max}°</span>
                               </li>`;
      });
  } else {
    loadAll();
  }
});
