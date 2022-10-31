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
    let length = areaCoordinates.length;

    if (length === 3) {
        return areaCoordinates;
    }


    let isEverythingActivated = true;

    const triangles = [];

    for (let i = 0; i < length - 2; i += 2) {
        const
            first = areaCoordinates[i],
            second = areaCoordinates[i + 1],
            third = areaCoordinates[i + 2];

        triangles.push([first, second, third]);
        areaCoordinates[i + 1].active = false;

        // После каждой итерации первая вершина треугольника
        // добавляется в конец итерируемых вершин, чтобы продолжать генерировать
        // треугольники, которые возникают внутри
        areaCoordinates.push(areaCoordinates[i]);
        length++;

        if (areaCoordinates[i + 1].active) {
            isEverythingActivated = false;
        }

        if (!isEverythingActivated && i >= length - 2) {
            i = 0;
        }
    }

    return triangles;
}

const calculateLineLength = (firstCoordinate, secondCoordinate) => {
    const
        lat1 = firstCoordinate.lat,
        lat2 = secondCoordinate.lat;

    const lon = firstCoordinate.lon - secondCoordinate.lon;

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

const formatCoordinates = geoCoordinates => {
    return geoCoordinates.map(item => {
        return {
            lat: item[0],
            lon: item[1],
            active: true
        }
    })
}

window.calculateArea = () => {
    // Разбиваем многоугольник на массив треугольников
    // Считаем расстояния между точками как длины дуг и находим площади треугольников
    // Складываем площади треугольников

    const geoCoordinates = formatCoordinates(window.geoCoordinates);
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