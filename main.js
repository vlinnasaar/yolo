var init = {
    countries: [],
    getCountries: function (cb) {
        fetch("https://countries.trevorblades.com/", {
            headers: { "content-type": "application/json" },
            body: '{"query":"query {name: countries { capital, currency}}"}',
            method: "POST"
        }).then(function (response) { return response.json(); }).then(function (data) { init.countries = data; cb(); });
    },
    createTable: function (data) {
        var table = "";
        data.forEach(function (element) {
            table = table + "<tr><td>" + element.capital + "</td><td>" + element.currency + "</td></tr>";
        });
        document.getElementById("table").innerHTML = " <table width=\"600px\"><thead><tr><th width=\"300px\">Capital</th><th width=\"300px\">Currency</th></tr></thead><tbody>" + table + "</tbody></table>";
    },
    filterByCurrency: function (text, data, cb) {
        var filteredData = (text == "") ? data.data.name : data.data.name.filter(function (item) {
            if (item.currency) {
                return item.currency.includes(text.toUpperCase()) ? true : false;
            }
        });
        cb(filteredData);
    },
    start: function () {
        init.getCountries(function () {
            init.createTable(init.countries.data.name);
        });
    }
};
init.start();
