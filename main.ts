let init: any = {
	countries: [],
	getCountries: (cb:any) => {
		fetch("https://countries.trevorblades.com/", {
			headers: {"content-type": "application/json"},
			body: '{"query":"query {name: countries { capital, currency}}"}',
			method: "POST",
		}).then((response) => response.json()).then((data) => {init.countries = data;cb();});
	},
	createTableRows: (data:any) => {		
		let table:string = "";
		data.forEach((element) => {
			table =  table + "<tr><td>" + element.capital + "</td><td>" + element.currency + "</td></tr>";
		});
		document.querySelectorAll("#table tbody")[0]!.innerHTML = table
	},
	filterByCurrency: (text, data, cb) => {
		let filteredData:string[] = (text == "") ? data.data.name : data.data.name.filter(item => {			
			if(item.currency){
				return item.currency.includes(text.toUpperCase()) ? true : false;
			}
		});
		cb(filteredData);
	},
	start: () => {
		init.getCountries(() => {
			init.createTableRows(init.countries.data.name);
		});
	} 
};
init.start();
