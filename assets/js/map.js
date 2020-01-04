AmCharts.makeChart("map", {
    type: "map",
    pathToImages: "http://www.amcharts.com/lib/3/images/",
    addClassNames: true,
    fontSize: 15,
    color: "#000000",
    projection: "mercator",
    backgroundAlpha: 0,
    backgroundColor: "rgba(80,80,80,1)",
    dataProvider: {
        map: "worldLow",
        getAreasFromMap: true,
        images: [],
        "areas": [
            {
                "id": "AT",
                "title": "Austria",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "BA",
                "title": "Bosnia and Herzegovina",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "BE",
                "title": "Belgium <br> ERASMUS",
                "color": "rgba(255,0,0,0.8)"
            },
            {
                "id": "CZ",
                "title": "Czechia",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "DE",
                "title": "Germany",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "DK",
                "title": "Denmark",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "EE",
                "title": "Estonia",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "ES",
                "title": "España <br> ",
                "color": "rgba(255,0,0,0.8)"
            },
            {
                "id": "FI",
                "title": "Finland",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "FR",
                "title": "France",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "GB",
                "title": "United Kingdom",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "HR",
                "title": "Croatia",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "HU",
                "title": "Hungary",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "IE",
                "title": "Ireland",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "IT",
                "title": "Italy",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "LT",
                "title": "Lithuania",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "LU",
                "title": "Luxembourg",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "LV",
                "title": "Latvia",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "NL",
                "title": "Netherlands",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "PL",
                "title": "Poland",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "PT",
                "title": "Portugal",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "RU",
                "title": "Russia",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "SK",
                "title": "Slovakia",
                "color": "rgba(0,0,255,0.8)"
            },
            {
                "id": "US",
                "title": "United States",
                "color": "rgba(0,0,255,0.8)"
            }
        ],
    },
    balloon: {
        horizontalPadding: 15,
        borderAlpha: 0,
        borderThickness: 1,
        verticalPadding: 15
    },
    areasSettings: {
        color: "rgba(128,128,128,1)",
        outlineColor: "rgba(255,255,255,1)",
        rollOverOutlineColor: "rgba(255,255,255,1)",
        rollOverBrightness: 20,
        selectedBrightness: 20,
        selectable: true,
        unlistedAreasAlpha: 0,
        unlistedAreasOutlineAlpha: 0
    },
    imagesSettings: {
        alpha: 1,
        color: "rgba(129,129,129,1)",
        outlineAlpha: 0,
        rollOverOutlineAlpha: 0,
        outlineColor: "rgba(255,255,255,1)",
        rollOverBrightness: 20,
        selectedBrightness: 20,
        selectable: true
    },
    linesSettings: {
        color: "rgba(129,129,129,1)",
        selectable: true,
        rollOverBrightness: 20,
        selectedBrightness: 20
    },
    zoomControl: {
        zoomControlEnabled: true,
        homeButtonEnabled: true,
        panControlEnabled: false,
        right: 38,
        bottom: 30,
        minZoomLevel: 0.25,
        gridHeight: 100,
        gridAlpha: 0.1,
        gridBackgroundAlpha: 0,
        gridColor: "#FFFFFF",
        draggerAlpha: 1,
        buttonCornerRadius: 2
    }
});
