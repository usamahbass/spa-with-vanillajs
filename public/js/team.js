document.addEventListener("DOMContentLoaded", () => {
  const saveButton = document.getElementById("save");
  const urlParams = new URLSearchParams(window.location.search);
  const isFromSaved = urlParams.get("saved");
  const tooltip = document.querySelectorAll(".tooltipped");
  let item = getTeam();

  if (isFromSaved) {
    saveButton.style.display = "none";

    getSavedTeamById();
  } else {
    item;
  }

  // inisialisai tooltip

  M.Tooltip.init(tooltip);

  saveButton.onclick = function () {
    const toastHtml =
      '<span>Saved</span><i class="material-icons ml-5">done</i>';
    M.toast({
      html: toastHtml,
    });
    item.then(function (team) {
      saveForClick(team);
    });

    saveButton.style.display = "none";
  };
});

const deleteDB = (id) => {
  const toastHtml =
    '<span>Team has been deleted !</span><i class="material-icons ml-5">done</i>';
  M.toast({
    html: toastHtml,
  });
  return deleteFromDB(id);
};
