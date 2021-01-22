document.addEventListener("DOMContentLoaded", () => {
  getStandings();
});

let base_url = "http://api.football-data.org/";
const token = "cd870cc9d9ee4c49bfe063a0feed8f23";
const loading = document.querySelector("#timer");
const empty_image = document.getElementById("empty");

/*
  replace directly with regex
*/

if (base_url.match("^http://")) {
  base_url = base_url.replace("http://", "https://");
}

/*
    FETCH API 
*/

// parsing json array
const parsingJson = (response) => {
  return response.json();
};

const getStandings = () => {
  loading.classList.remove("d-none");
  if ("caches" in window) {
    caches.match(`${base_url}v2/competitions/2001/standings`).then((res) => {
      if (res) {
        res.json().then((items) => {
          loading.classList.add("d-none");
          renderStandings(items);
        });
      }
    });
  }

  fetch(`${base_url}v2/competitions/2001/standings`, {
    headers: {
      "X-Auth-Token": `${token}`,
    },
  })
    .then(parsingJson)

    .then((items) => {
      loading.classList.add("d-none");

      renderStandings(items);
    });
};

const getLeague = (id) => {
  loading.classList.remove("d-none");

  if ("caches" in window) {
    caches
      .match(`${base_url}v2/competitions/${id}/standings`, {
        headers: {
          "X-Auth-Token": `${token}`,
        },
      })
      .then((res) => {
        if (res) {
          res.json().then((items) => {
            loading.classList.add("d-none");

            renderLeague(items);
          });
        }
      });
  }

  fetch(`${base_url}v2/competitions/${id}/standings`, {
    headers: {
      "X-Auth-Token": `${token}`,
    },
  })
    .then(parsingJson)

    .then((items) => {
      loading.classList.add("d-none");

      renderLeague(items);
    });
};

const getTeam = () => {
  loading.classList.remove("d-none");
  // ambil query parameter (?id=)

  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if ("caches" in window) {
      caches
        .match(`${base_url}v2/teams/${idParam}`, {
          headers: {
            "X-Auth-Token": `${token}`,
          },
        })
        .then((res) => {
          if (res) {
            res.json().then((team) => {
              loading.classList.add("d-none");
              renderTeam(team);
              resolve(team);
            });
          }
        });
    }

    fetch(`${base_url}v2/teams/${idParam}`, {
      headers: {
        "X-Auth-Token": `${token}`,
      },
    })
      .then(parsingJson)
      .then((team) => {
        loading.classList.add("d-none");
        renderTeam(team);
        resolve(team);
      });
  });
};

const getSavedTeam = () => {
  loading.classList.remove("d-none");

  getAll().then((teams) => {
    let teamsHTML = "";

    teams.map((team) => {
      loading.classList.add("d-none");
      teamsHTML += `
      <div class="col s12 m6">
        <div class="card">
          <div class="card-image">
            <img class="img-team" src=${team.crestUrl} onerror="this.src='https://placehold.it/100x100'" alt=${team.name} />
            <a href="./team.html?id=${team.id}&saved=true" 
                class="btn-floating halfway-fab waves-effect waves-light tooltipped indigo darken-3" 
                data-position="right" 
                data-tooltip="See team"
            >
              <i class="material-icons">launch</i>
            </a>
          </div>
          <div class="card-content">
          <h5>${team.name}</h5>
            <h6>
              ${team.shortName} - <span>${team.founded}</span>
            </h6>
            <div class="d-flex flex-column">
              <div class="d-flex">
                <i class="material-icons valign-middle">business</i>
                <span class="ml-5">${team.address}</span>
              </div>
              <div class="d-flex">
                <i class="material-icons valign-middle">local_phone</i>
                <span class="ml-5">${team.phone}</span>
              </div>
              <div class="d-flex">
                <i class="material-icons valign-middle">public</i>
                <a class="btn-link ml-5" href=${team.website}>${team.website}</a>
              </div>
              <div class="d-flex">
                <i class="material-icons valign-middle">attach_email</i>
                <span class="ml-5">${team.email}</span>
              </div>
            </div>
            <blockquote>${team.venue}</blockquote>
          </div>
          <div class="card-action">
            <a class="waves-effect waves-light btn indigo darken-3" style="width: 100%" onclick="deleteFromDB(${team.id})">Delete Team</a>
          </div>
        </div>
      </div>
      `;

      document.querySelector("#teams").innerHTML = teamsHTML;
    });
  });
};

const getSavedTeamById = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");

  loading.classList.remove("d-none");

  getById(idParam).then((team) => {
    loading.classList.add("d-none");
    let teamElement = `<div class="row">`;

    teamElement += `
          <div class="col s12 m4">
            <img class="img-team" src=${
              team.crestUrl
            } onerror="this.src='https://placehold.it/100x100'" alt=${
      team.name
    } />
          </div>
          <div class="col s12 m8">
            <h5>${team.name}</h5>
            <h6>
              ${team.shortName} - <span>${team.founded}</span>
            </h6>
            <div class="d-flex flex-column">
              <div class="d-flex">
                <i class="material-icons valign-middle">business</i>
                <span class="ml-5">${team.address}</span>
              </div>
              <div class="d-flex">
                <i class="material-icons valign-middle">local_phone</i>
                <span class="ml-5">${team.phone}</span>
              </div>
              <div class="d-flex">
                <i class="material-icons valign-middle">public</i>
                <a class="btn-link ml-5" href=${team.website}>${
      team.website
    }</a>
              </div>
              <div class="d-flex">
                <i class="material-icons valign-middle">attach_email</i>
                <span class="ml-5">${team.email}</span>
              </div>
            </div>
            <blockquote>${team.venue}</blockquote>
          </div>
          <div class="col s12">
            <div class="table-responsive">
              <h4>${team.name}</h4>
              <table class="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>dateOfBirth</th>
                    <th>countryBirth</th>
                    <th>Nationality</th>
                    <th>Role</th>
                  </tr>
                </thead>

                ${team.squad.map((squads) => {
                  return `
                  <tbody>
                    <tr>
                      <td>${squads.name}</td>
                      <td>${null ? "-" : squads.position}</td>
                      <td>${squads.dateOfBirth}</td>
                      <td>${squads.countryOfBirth}</td>
                      <td>${squads.nationality}</td>
                      <td>${squads.role}</td>
                    </tr>
                  </tbody>
                  `;
                })}
              </table>
            </div>
          </div>
        </div>
        `;
    document.querySelector("#content").innerHTML = teamElement;
  });
};

/*

  RENDER DATA

*/

const renderStandings = (items) => {
  let standingsElem = "";
  let klasemenElem = "";
  standingsElem += `<h4 class="center mb-10">${items.competition.name}</h4>`;

  let filterData = items.standings.filter((el) => {
    return el.type.length >= 5;
  });

  filterData.forEach((data) => {
    standingsElem += `
            <div class="col s12 m6">
              <div class="card white">
                <div class="card-content">
                  <h6 class="center mb-10">${data.group}</h6>
                    ${data.table.map((teams) => {
                      return `
                        <div class="d-flex">
                          <img class="custom-img" src=${teams.team.crestUrl} onerror="this.src='https://placehold.it/100x100'" alt=${teams.team.name} />
                          <a class="btn-link valign-middle ml-5" href="./team.html?id=${teams.team.id}">${teams.team.name}</a>
                        </div>
                      `;
                    })}
                </div>
              </div>
            </div>
          `;

    klasemenElem += `
            <div class="col s12">
              <div class="responsive-table">
                  <h6>${data.group}</h6>
                  <table class="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Team</th>
                        <th>GP</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>GD</th>
                        <th>PTS</th>
                      </tr>
                    </thead>
      
                    ${data.table.map((el) => {
                      return `
                      <tbody>
                        <tr key=${el.position}>
                          <td>${el.position}</td>
                          <td>
                            <img
                              class="custom-img"
                              src=${el.team.crestUrl}
                              onerror="this.src='https://placehold.it/100x100'"
                              alt=${el.team.name} />
                            <a class="btn-link" href="./team.html?id=${el.team.id}" class="team ml-5">${el.team.name}</a>
                          </td>
                          <td>${el.playedGames}</td>
                          <td>${el.won}</td>
                          <td>${el.draw}</td>
                          <td>${el.lost}</td>
                          <td>${el.goalDifference}</td>
                          <td>${el.points}</td>
                        </tr>
                      </tbody>
                      `;
                    })}
                  </table>
              </div>
            </div>
          `;

    document.querySelector("#standings").innerHTML = standingsElem;
    document.querySelector("#klasemen").innerHTML = klasemenElem;
  });
};

const renderLeague = (items) => {
  let klasemenElem = "";

  klasemenElem += `<h4 class="center mb-10">${items.competition.name}</h4>`;

  let filterData = items.standings.filter((el) => {
    return el.type.length >= 5;
  });

  filterData.forEach((data) => {
    klasemenElem += `
        <div class="col s12">
          <div class="responsive-table">
              <table class="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Team</th>
                    <th>GP</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GD</th>
                    <th>PTS</th>
                  </tr>
                </thead>

                ${data.table.map((el) => {
                  return `
                  <tbody>
                    <tr key=${el.position}>
                      <td>${el.position}</td>
                      <td>
                        <img
                          class="custom-img"
                          src=${el.team.crestUrl}
                          onerror="this.src='https://placehold.it/100x100'"
                          alt=${el.team.name} />
                        <a class="btn-link" href="./team.html?id=${el.team.id}" class="team ml-5">${el.team.name}</a>
                      </td>
                      <td>${el.playedGames}</td>
                      <td>${el.won}</td>
                      <td>${el.draw}</td>
                      <td>${el.lost}</td>
                      <td>${el.goalDifference}</td>
                      <td>${el.points}</td>
                    </tr>
                  </tbody>
                  `;
                })}
              </table>
          </div>
        </div>
      `;

    document.querySelector("#klasemen-league").innerHTML = klasemenElem;
  });
};

const renderTeam = (team) => {
  let teamElement = `<div class="row">`;

  teamElement += `
          <div class="col s12 m4">
            <img class="img-team" src=${
              team.crestUrl
            } onerror="this.src='https://placehold.it/100x100'" alt=${
    team.name
  } />
          </div>
          <div class="col s12 m8">
            <h5>${team.name}</h5>
            <h6>
              ${team.shortName} - <span>${team.founded}</span>
            </h6>
            <div class="d-flex flex-column">
              <div class="d-flex">
                <i class="material-icons valign-middle">business</i>
                <span class="ml-5">${team.address}</span>
              </div>
              <div class="d-flex">
                <i class="material-icons valign-middle">local_phone</i>
                <span class="ml-5">${team.phone}</span>
              </div>
              <div class="d-flex">
                <i class="material-icons valign-middle">public</i>
                <a class="btn-link ml-5" href=${team.website}>${
    team.website
  }</a>
              </div>
              <div class="d-flex">
                <i class="material-icons valign-middle">attach_email</i>
                <span class="ml-5">${team.email}</span>
              </div>
            </div>
            <blockquote>${team.venue}</blockquote>
          </div>
          <div class="col s12">
            <div class="table-responsive">
              <h4>${team.name}</h4>
              <table class="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>dateOfBirth</th>
                    <th>countryBirth</th>
                    <th>Nationality</th>
                    <th>Role</th>
                  </tr>
                </thead>

                ${team.squad.map((squads) => {
                  return `
                  <tbody>
                    <tr>
                      <td>${squads.name}</td>
                      <td>${null ? "-" : squads.position}</td>
                      <td>${squads.dateOfBirth}</td>
                      <td>${squads.countryOfBirth}</td>
                      <td>${squads.nationality}</td>
                      <td>${squads.role}</td>
                    </tr>
                  </tbody>
                  `;
                })}
              </table>
            </div>
          </div>
        </div>
        `;
  document.querySelector("#content").innerHTML = teamElement;
};
