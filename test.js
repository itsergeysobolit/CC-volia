let team = document.getElementsByClassName('button');
if (localStorage.getItem('team') == team) {
    team.eq(0).trigger('click');
}

function click() {
    console.log(team);
}
