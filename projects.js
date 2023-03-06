// import { fetch } from "node-fetch";

export function fetchProjects() {
  // fetch("https://magnet.paradoxclub.org/projects.json") // pi
  fetch("projects.json") // local host
    .then((response) => response.json())
    .then((data) => {
      console.log("fetch successful");

      let projects = data["projects"];
      for (let i = 0; i < 8; i++) {
        const projectsContainer = document.querySelector(".projects");

        // create project div
        const project = document.createElement("div");
        project.setAttribute("class", "project");

        // create projName div
        const projName = document.createElement("div");
        projName.setAttribute("class", "proj-name");

        // create h4 + append name to projName
        // append projName to project
        const name = document.createElement("h4");
        name.innerHTML = projects[i].name;
        projName.appendChild(name);
        project.appendChild(projName);

        // create skills div + ordered list
        const skills = document.createElement("div");
        skills.setAttribute("class", "skills");
        const list = document.createElement("ol");

        // iterate through skills,
        // create li for each and assign skill at index
        // append li to ordered list
        for (let s = 0; s < projects[i].skills.length; s++) {
          const listItem = document.createElement("li");
          listItem.innerHTML = projects[i].skills[s];
          list.appendChild(listItem);
        }

        // append ordered list to skills div
        // append skills div to project div
        skills.appendChild(list);
        project.appendChild(skills);

        project.addEventListener("click", clickableProjects);

        // append project to projects
        projectsContainer.appendChild(project);
      }
    });
}

export function clickableProjects() {
  console.log("click");
}
