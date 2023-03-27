export function toggleMode() {
  let toggle = document.getElementById("checkbox");

  // access HTML head element
  let head = document.head;

  // create lightmode css link element + add attributes
  let lightLink = document.createElement("link");
  lightLink.rel = "stylesheet";
  lightLink.href = "lightmode.css";

  // create darkmode css link element + add attributes
  let darkLink = document.createElement("link");
  darkLink.rel = "stylesheet";
  darkLink.href = "darkmode.css";

  // access slider
  let slider = document.querySelector(".slider");

  // start in light mode
  head.appendChild(lightLink);
  // listen for end of transition, then change mode
  slider.addEventListener("transitionend", () => {
    if (toggle.checked == true) {
      head.removeChild(lightLink);
      head.appendChild(darkLink);
    } else {
      head.removeChild(darkLink);
      head.appendChild(lightLink);
    }
  });
}
