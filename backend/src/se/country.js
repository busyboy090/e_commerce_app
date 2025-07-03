const fs = require('fs');
const path = require('path');

async function seedCountry() {
    const filePath = path.join('src','data','countries+states+cities.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const countriesData = JSON.parse(rawData)['countries-states-cities'];
    const countries = [];
    const regions = [];
    const subregions = [];
    const currencies = [];
    const states = [];
    const cities = []

    for(let i = 0; i < countriesData.length; i++) {
        let region_id;
        let sub_region_id;
        let currency_id;
        let  country_id;

        const region = regions.filter(c => c.name === countriesData[i].region);

        if(region.length === 0) {
            if(countriesData[i].region === 'Polar'){
                region_id = regions.length + 1
                regions.push({
                    region_id,
                    name: 'Antarctic'
                });
            } else if (countriesData[i].region === '') {
                region_id = null
            }else {
                region_id = regions.length + 1
                regions.push({
                    region_id,
                    name: countriesData[i].region
                });
            }
        } else {
            region_id = regions[0].region_id;
        }

        const subregion = subregions.filter(r => r.name === countriesData[i].subregion);

        if(subregion.length === 0) {
            if(countriesData[i].subregion !== ''){
                sub_region_id = subregions.length + 1;
                subregions.push({
                    sub_region_id,
                    name: countriesData[i].subregion,
                    region_id
                });
            } else {
                sub_region_id = null;
            }
        } else {
            sub_region_id = subregion[0].sub_region_id;
        }

        const currency  = currencies.filter(c => c.name === countriesData[i].currency_name);
        if(currency.length === 0) {
            currency_id = currencies.length + 1
            currencies.push({
                currency_id: currencies.length + 1,
                name: countriesData[i].currency_name,
                symbol: countriesData[i].currency_symbol,
                code: countriesData[i].currency
            });
        } else {
            currency_id = currency[0].currency_id;
        }

        countries.push({
            country_id: i + 1,
            name: countriesData[i].name,
            code: countriesData[i].iso2,
            phone_code: countriesData[i].phonecode,
            sub_region_id,
            currency_id
        });

        country_id = i + 1;

        // Seed the states and cities
        for(let j = 0; j < countriesData[i].states.length; j++) {
            states.push({
                state_id: states.length + 1,
                name: countriesData[i].states[j].name,
                country_id
            });

            const citiesData = countriesData[i].states[j].cities;
            for(let k = 0; k < citiesData.length; k++) {
                cities.push({
                    city_id: cities.length + 1,
                    name: citiesData[k].name,
                    state_id: states.length
                });
            }
        }
    }

    await fs.writeFileSync('src/data/regions.json', JSON.stringify(regions, null, 2), 'utf-8');
    await fs.writeFileSync('src/data/sub-regions.json', JSON.stringify(subregions, null, 2), 'utf-8');
    await fs.writeFileSync('src/data/currencies.json', JSON.stringify(currencies, null, 2), 'utf-8')
    await fs.writeFileSync('src/data/countries.json',JSON.stringify(countries, null, 2), 'utf-8')
    await fs.writeFileSync('src/data/states.json', JSON.stringify(states, null, 2), 'utf-8');
    await fs.writeFileSync('src/data/cities.json', JSON.stringify(cities, null, 2), 'utf-8');
}


seedCountry();