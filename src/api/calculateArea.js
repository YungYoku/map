//lat - широта | 1° широты = 111.32 (км)
//lon - долгота | 1° долготы = 40075 * cos(широта) / 360 (км)

const showAddObjectPopup = () => {
    document.querySelector(".popup__name").classList.remove("hide");
};

let domResult = document.querySelector(".result");

const updateDomResult = (result) => {
    if (domResult) {
        result = result.toFixed(6);
        if (isNaN(result)) {
            domResult.innerHTML = `Ошибка.`;
        } else {
            domResult.innerHTML = `Площадь = ${result}(км²) | ${Math.round(
                result * 1000000
            )}(м²).`;
        }
    } else {
        domResult = document.querySelector(".result");
        updateDomResult(result);
    }
};

const formatAreaToTrianglesArray = (areaCoordinates) => {
    let length = areaCoordinates.length;

    if (length === 3) {
        return [areaCoordinates];
    }

    const triangles = [];

    for (let i = 0; i < length - 2; i += 2) {
        const first = areaCoordinates[i],
            second = areaCoordinates[i + 1],
            third = areaCoordinates[i + 2];

        triangles.push([first, second, third]);

        // После каждой итерации первая вершина треугольника
        // добавляется в конец итерируемых вершин, чтобы продолжать генерировать
        // треугольники, которые возникают внутри
        areaCoordinates.push(areaCoordinates[i]);
        length++;
    }

    return triangles;
};

const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};

// Формула Хаверсина
const getDistanceFromLatLonInKm = (firstCoordinate, secondCoordinate) => {
    const R = 6371;
    const dLat = deg2rad(secondCoordinate.lat - firstCoordinate.lat);
    const dLon = deg2rad(secondCoordinate.lon - firstCoordinate.lon);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(firstCoordinate.lat)) *
        Math.cos(deg2rad(secondCoordinate.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const calculateTriangleArea = (triangle) => {
    const lines = [];
    lines[0] = getDistanceFromLatLonInKm(triangle[0], triangle[1]);
    lines[1] = getDistanceFromLatLonInKm(triangle[1], triangle[2]);
    lines[2] = getDistanceFromLatLonInKm(triangle[0], triangle[2]);

    const perimeterHalf = (lines[0] + lines[1] + lines[2]) / 2;

    return Math.sqrt(
        perimeterHalf *
        (perimeterHalf - lines[0]) *
        (perimeterHalf - lines[1]) *
        (perimeterHalf - lines[2])
    );
};

export const formatCoordinatesToLatLonArray = (geoCoordinates) => {
    return geoCoordinates.map((item) => {
        return {
            lat: item[0],
            lon: item[1],
        };
    });
};

export const formatCoordinatesToNumbersArray = (geoCoordinates) => {
    return geoCoordinates.map((item) => {
        return [item.lat, item.lon];
    });
};

export const calculateArea = (coordinates) => {
    // Разбиваем многоугольник на массив треугольников
    // Считаем расстояния между точками как длины дуг и находим площади треугольников
    // Складываем площади треугольников

    let geoCoordinates;
    if (coordinates) {
        geoCoordinates = formatCoordinatesToLatLonArray(coordinates);
    } else {
        geoCoordinates = formatCoordinatesToLatLonArray(window.geoCoordinates);

        const length = geoCoordinates.length;
        if (length < 3) return;

        showAddObjectPopup();
    }

    let result = 0;
    const triangles = formatAreaToTrianglesArray(geoCoordinates);
    triangles.forEach((triangle) => {
        result += calculateTriangleArea(triangle);
    });

    updateDomResult(result);
};
