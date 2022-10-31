//lat - широта | 1° широты = 111.32 (км)
//lon - долгота | 1° долготы = 40075 * cos(широта) / 360 (км)

let domResult = document.querySelector(".result");

const resetCoordinates = () => {
    window.geoCoordinates = [];
}

const updateDomResult = result => {
    if (domResult) {
        result = result.toFixed(6);
        domResult.innerHTML = `Площадь равна ${result}(км²) | ${result * 1_000_000}(м²).`;
        resetCoordinates();
    } else {
        domResult = document.querySelector(".result");
        updateDomResult(result);
    }
}

const formatAreaToTrianglesArray = areaCoordinates => {
    areaCoordinates.push(areaCoordinates[0]); // Потому что первая вершина является и последней
    const length = areaCoordinates.length;

    if (length === 4) {
        return areaCoordinates;
    }

    const triangles = [];

    for (let i = 0; i < length - 2; i += 2) {
        triangles.push([areaCoordinates[i], areaCoordinates[i + 1], areaCoordinates[i + 2]])
    }

    return triangles;
}

const calculateLineLength = (firstCoordinate, secondCoordinate) => {
    const
        lon1 = firstCoordinate[0],
        lat1 = firstCoordinate[1],
        lon2 = secondCoordinate[0],
        lat2 = secondCoordinate[1];

    const lon = lon1 - lon2;

    const earthR = 6370; // Радиус земли равен 6370 км
    const d = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon));

    return earthR * d / 100;
}

const calculateTriangleArea = triangle => {
    const lines = [];
    lines[0] = calculateLineLength(triangle[0], triangle[1]);
    lines[1] = calculateLineLength(triangle[1], triangle[2]);
    lines[2] = calculateLineLength(triangle[0], triangle[2]);

    const perimeterHalf = (lines[0] + lines[1] + lines[2]) / 2;

    return Math.sqrt(
        perimeterHalf *
        (perimeterHalf - lines[0]) *
        (perimeterHalf - lines[1]) *
        (perimeterHalf - lines[2])
    );
}

window.calculateArea = () => {
    // Разбиваем многоугольник на массив треугольников
    // Считаем расстояния между точками как длины дуг и находим площади треугольников
    // Складываем площади треугольников

    const geoCoordinates = window.geoCoordinates;
    const length = geoCoordinates.length;

    if (length < 3) return;

    let result = 0;
    const triangles = formatAreaToTrianglesArray(geoCoordinates);
    console.log(triangles)
    triangles.forEach(triangle => {
        result += calculateTriangleArea(triangle);
    })

    updateDomResult(result);
}