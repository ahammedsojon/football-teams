const spinners = document.getElementById('spinners');
const searchResult = document.getElementById('search-result');
const teamDetails = document.getElementById('team-details');

const searchTeam = () => {
    const searchField = document.getElementById('search-field');
    const searchVal = searchField.value;
    // clear data
    searchResult.textContent = '';
    const teamDetails = document.getElementById('team-details');
    teamDetails.textContent = '';
    searchField.value = '';
    if (searchVal == '') {
        teamDetails.innerHTML = `
        <h3 class="text-center">please search a valid team name</h3>
        `;
    } else {
        spinners.classList.remove('d-none');
        fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchVal}`)
            .then(response => response.json())
            .then(data => displaySearchTeam(data.teams));
    }

}

const displaySearchTeam = teams => {
    searchResult.textContent = '';
    searchResult.classList.add('d-none');
    if (teams === null) {
        spinners.classList.add('d-none');
        teamDetails.innerHTML = `
        <h3 class="text-center">please search a valid team name</h3>
        `;
    } else {
        for (const team of teams) {
            const teamDiv = document.createElement('div');
            teamDiv.classList.add('col');
            teamDiv.innerHTML = `
            <div class="card">
            <img src="${team.strTeamBadge}" class="card-img-top" alt="">
                <div class="card-body">
                <h5 class="card-title">${team.strTeam}</h5>
                <p class="card-text">${team.strDescriptionEN ? team.strDescriptionEN.slice(0, 200) : ''}</p>
                <a onclick="loadTeamDetails('${team.idTeam}')" href="#" class="btn btn-primary">Team details</a>
                </div >
                </div >
                `;
            searchResult.appendChild(teamDiv);
        }
        spinners.classList.add('d-none');
        searchResult.classList.remove('d-none');
    }
}

const loadTeamDetails = id => {
    spinners.classList.remove('d-none');
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayTeamDetails(data.teams[0]))
}

const displayTeamDetails = team => {
    teamDetails.textContent = '';
    teamDetails.classList.add('d-none');
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('card');
    detailsDiv.innerHTML = `
    <h2>Team Details</h2>
    <div class="card">
            <img src="${team.strTeamBadge}" class="card-img-top" alt="">
            <div class="card-body">
                <h3 class="card-title">Team Name: ${team.strTeam}</h3>
                <h5 class="card-title">Country: ${team.strCountry}</h5>
                <h5 class="card-title">Lauge Name: ${team.strLeague}</h5>
                <a target="_blank" href="https://${team.strFacebook}" class="btn btn-primary d-block">Go facebook</a>
                <br>
                <a target="_blank" href="https://${team.strYoutube}" class="btn btn-primary d-block">Go youtube</a>
            </div>
        </div>
    `;
    teamDetails.appendChild(detailsDiv);
    spinners.classList.add('d-none');
    teamDetails.classList.remove('d-none');
}
