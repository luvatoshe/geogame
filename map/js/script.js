L.TileLayer.prototype.options.referrerPolicy = 'strict-origin-when-cross-origin';

const cities = [
    { name: "Москва", lat: 55.7558, lng: 37.6173 },
    { name: "Санкт-Петербург", lat: 59.9343, lng: 30.3351 },
    { name: "Новосибирск", lat: 55.0084, lng: 82.9357 },
    { name: "Екатеринбург", lat: 56.8389, lng: 60.6057 },
    { name: "Казань", lat: 55.8304, lng: 49.0661 },
];

const map = L.map("map").setView([61.524, 105.3188], 4);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
}).addTo(map);

const customIcon = L.divIcon({
    className: "custom-marker",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
});

cities.forEach((city) => {
    const marker = L.marker([city.lat, city.lng], { icon: customIcon }).addTo(
        map,
    );

    marker.bindPopup(`<b>${city.name}</b>`);

    marker.on("click", function () {
        const el = marker.getElement();
        if (el) {
            el.classList.add("pulse");
            setTimeout(() => el.classList.remove("pulse"), 600);
        }
    });
});
