const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const submitBtn = document.getElementById('submitBtn');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector('.middle_layer');
const getCurrentDay = () => {
  var weekday = new Array(7);
  (weekday[0] = 'Sunday'),
    (weekday[1] = 'Monday'),
    (weekday[2] = 'Tuesday'),
    (weekday[3] = 'Wednesday'),
    (weekday[4] = 'Thursday'),
    (weekday[5] = 'Friday'),
    (weekday[6] = 'Saturday');
  let currentTime = new Date();
  let day = weekday[currentTime.getDay()];
  return day;
};
day.innerHTML = getCurrentDay();
// console.log('day', getCurrentDay());
const getCurrentTime = () => {
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var now = new Date();
  var month = months[now.getMonth()];
  var date = now.getDate();
  return `${date} ${month} `;
};
today_date.innerHTML = getCurrentTime();
// console.log('getCurrentTime>', getCurrentTime());
const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;

  // console.log('cityVal>', cityVal);
  if (cityVal === '') {
    city_name.innerText = `please write city name`;
    datahide.classList.add('data_hide');
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=6380cfad24621a89c85b1d7a0e00986f`;
      const response = await fetch(url);
      const data = await response.json();
      const arrData = [data];
      // console.log('arrData>', arrData);

      city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
      temp_real_val.innerText = arrData[0].main.temp;
      // temp_status.innerText = arrData[0].weather[0].main;

      const tempMood = arrData[0].weather[0].main;
      console.log(tempMood);
      // condition to check sunny or cloudy
      if (tempMood == 'Sunny') {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style='color: #eccc68'></i>";
      } else if (tempMood == 'Clouds') {
        temp_status.innerHTML =
          "<i class='fas fa-cloud' style='color:#f1f2f6'></i>";
      } else if (tempMood == 'Rainy') {
        temp_status.innerHTML =
          "<i class='fas fa-rain' style='color: #a4b0be'></i>";
      } else {
        ("<i class='fas fa-sun' style='color: #FF0000'></i>");
      }
      datahide.classList.remove('data_hide');
    } catch {
      city_name.innerText = `please enter name properly  name`;
      datahide.classList.add('data_hide');
    }
  }
};
submitBtn.addEventListener('click', getInfo);
