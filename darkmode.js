export function toggleMode() {
  let toggle = document.getElementById("checkbox");

  // access HTML head element
  let head = document.head;
  // create darkmode css link element + add attributes
  let darkLink = document.createElement("link");
  darkLink.rel = "stylesheet";
  darkLink.href = "darkmode.css";

  // access slider
  let slider = document.querySelector(".slider");

  // listen for end of transition, then change mode
  slider.addEventListener("transitionend", () => {
    if (toggle.checked == true) {
      head.appendChild(darkLink);
    } else {
      head.removeChild(darkLink);
    }
  });
}
