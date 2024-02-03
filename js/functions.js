function changeVisibility(id) {
  if (document.getElementById(id).style.visibility == "hidden")
    document.getElementById(id).style.visibility = "visible";
  else document.getElementById(id).style.visibility = "hidden";
}

function change(element, id) {
  element.innerHTML =
    document.getElementById(id).style.visibility == "hidden"
      ? "- Source Information"
      : "+ Source Information";
  changeVisibility(id);
}
