var init = {
    countries: [],
    getCountries: function (cb) {
        fetch("https://countries.trevorblades.com/", {
            headers: { "content-type": "application/json" },
            body: '{"query":"query {name: countries { capital, currency}}"}',
            method: "POST"
        }).then(function (response) { return response.json(); }).then(function (data) { init.countries = data; cb(); });
    },
    createTableRows: function (data) {
        var table = "";
        data.forEach(function (element) {
            table = table + "<tr><td>" + element.capital + "</td><td>" + element.currency + "</td></tr>";
        });
        document.querySelectorAll("#table tbody")[0].innerHTML = table;
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
            init.createTableRows(init.countries.data.name);
        });
    }
};
init.start();
