import { calculateArea } from "@/api/calculateArea.js";

window.map = null;

export const styles = [
    {
        strokeColor: "#ff00ff",
        strokeOpacity: 0.7,
        strokeWidth: 3,
        fillColor: "#ff00ff",
        fillOpacity: 0.4,
    },
    {
        strokeColor: "#ff0000",
        strokeOpacity: 0.6,
        strokeWidth: 6,
        fillColor: "#ff0000",
        fillOpacity: 0.3,
    },
    {
        strokeColor: "#00ff00",
        strokeOpacity: 0.5,
        strokeWidth: 3,
        fillColor: "#00ff00",
        fillOpacity: 0.2,
    },
    {
        strokeColor: "#0000ff",
        strokeOpacity: 0.8,
        strokeWidth: 5,
        fillColor: "#0000ff",
        fillOpacity: 0.5,
    },
    {
        strokeColor: "#000000",
        strokeOpacity: 0.6,
        strokeWidth: 8,
        fillColor: "#000000",
        fillOpacity: 0.3,
    },
];
let currentIndex = 0;
let paintProcess;

export const handleMousedown = (event) => {
    if (event.get("ctrlKey") || window.drawTurnedOn) {
        if (currentIndex === styles.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex += 1;
        }
        // eslint-disable-next-line no-undef
        paintProcess = ymaps.ext.paintOnMap(map, event, {
            style: styles[currentIndex],
        });
    }
};

export const handleMouseUp = (event) => {
    if (paintProcess) {
        // Получаем координаты отрисованного контура.
        const coordinates = paintProcess.finishPaintingAt(event);
        addObjectToMap(coordinates);
    }
};

export const addObjectToMap = (coordinates, title = "", fromBd = false) => {
    if (paintProcess || fromBd) {
        const length = coordinates.length;
        if (length < 3) return;
        paintProcess = null;

        // eslint-disable-next-line no-undef
        const geoObject = new ymaps.Polygon(
            [coordinates],
            {
                balloonContent: title,
            },
            styles[currentIndex]
        );

        geoObject.events.add("mousedown", () => {
            calculateArea(coordinates);
        });

        // eslint-disable-next-line no-undef
        map.geoObjects.add(geoObject);
        calculateArea();
    }
};
