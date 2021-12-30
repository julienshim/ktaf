title = '';

if (document.querySelector('.TitleHeader__TitleText-sc-1wu6n3d-0')) {
    title = document.querySelector('.TitleHeader__TitleText-sc-1wu6n3d-0').textContent;
}

documentURL = '';

if (document.URL) {
    documentURL = document.URL.match(/https:\/\/www.imdb.com\/title\/(tt[0-9]*)/)[0]
}

genres = '';

if ([...document.querySelectorAll('li[data-testid="storyline-genres"] div ul li a')]) {
    genres = [...document.querySelectorAll('li[data-testid="storyline-genres"] div ul li a')].map(x => x.textContent).join(', ');
}

year = '';

if([...document.querySelectorAll('div.TitleBlock__TitleContainer-sc-1nlhx7j-1 div ul li span')]) {
    year = [...document.querySelectorAll('div.TitleBlock__TitleContainer-sc-1nlhx7j-1 div ul li span')].map(s => s.textContent)[0];
}

type = '';

if (document.querySelector('.ipc-inline-list > li')) {
    type = document.querySelector('.ipc-inline-list > li').textContent === 'TV Series' || numberOfEpisodes !== 'N/A' ? 'TV Series' : 'Film';
}

numberOfEpisodes = 'N/A'

if (document.querySelector('div[data-testid="episodes-header"] a h3 span')) { 
    numberOfEpisodes = document.querySelector('div[data-testid="episodes-header"] a h3 span').textContent;
}

isConvertingRuntime = true;

spliceStringTimeToInteger = (stringTime) => {
    return +stringTime[0].split(' ')[0];
}

convertTimeStringToIntegerMinutes = (timeString) => {
    minutes = timeString.match(/(\d)+ minutes/g);
    hours = timeString.match(/(\d)+ hour/g);
    outputIntegerTime = 0;
    if (hours) {
        outputIntegerTime += 60 * spliceStringTimeToInteger(hours);
    }
    if (minutes) {
        outputIntegerTime += spliceStringTimeToInteger(minutes);
    }
    return outputIntegerTime;
}

runtime = '';

if (document.querySelector('li[data-testid="title-techspec_runtime"] div')) {
    runtimeTmp = document.querySelector('li[data-testid="title-techspec_runtime"] div').textContent;
    if (isConvertingRuntime) {
        runtime = convertTimeStringToIntegerMinutes(runtimeTmp);
    } else {
        tuntime = runtimeTmp;
    }
};

plot = '';

if (document.querySelector('span[data-testid="plot-l"]')) {
    plot = document.querySelector('span[data-testid="plot-l"]').textContent;
}

results = [title, documentURL, plot, type, numberOfEpisodes, runtime, year, genres].join('\t')

copy(results)