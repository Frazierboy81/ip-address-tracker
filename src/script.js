import { API_KEY } from "./secret.js";

const mapDiv = document.getElementById("map");
const ipSearch = document.getElementById("search-input");
const ipAdress = document.getElementById("ip-address");
const location = document.getElementById("locate");
const timeZone = document.getElementById("time-zone")
const intntSvc = document.getElementById("internet-service")
const form = document.querySelector("form");


const map = L.map(mapDiv)

function mapData(data) {
  ipSearch.textContent = `IP Adress: ${data.location.ipSearch}`
  location.textContent = `Location: ${data.location.region}, ${data.location.city}, ${data.location.postalCode}`
  timeZone.textContent = `UTC: ${data.location.timezone}`
  intntSvc.textContent = `ISP: ${data.location.intntSvc}`
}

async function showMapData(event) {
  event.preventDefault();
  const addressIp = ipSearch.value;
  try {
    const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${addressIp}`)
  if (!res.ok) {
    throw new Error ("Enter a valid IP address!")
    }
    const data = await res.json();
    console.log(data);
    mapData(data)

    map.setView(
      [data.location.lat, data.location.lng],
      13);

    const marker = L.marker([data.location.lat, data.location.lng]).addTo(map);
    marker.bindPopup("I'm here!!").openPopup();

  } catch (error) {
    console.error(error);
    }
}


form.addEventListener("submit", async (event) => {
event.preventDefault();
    
  showMapData();
})


document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`
    );

    if (!res.ok) {
      throw new Error("Error fetching data");
    }
    const data = await res.json();
    console.log(data);
    mapData(data)

    // Map
    map.setView(
      [data.location.lat, data.location.lng],
      13);

    const marker = L.marker([data.location.lat, data.location.lng]).addTo(map);
    marker.bindPopup("I'm here!!").openPopup();

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
  } catch (error) {
    console.error(error);
  }
});
