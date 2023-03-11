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

        // create description div + paragraph
        const skills = document.createElement("div");
        skills.setAttribute("class", "description");
        const desc = document.createElement("p");
        desc.setAttribute("class", "descText");
        desc.innerHTML = projects[i].skills;

        // append description to skills div
        // append skills div to project div
        skills.appendChild(desc);
        project.appendChild(skills);

        // create github div
        // append to project div
        const githubDiv = document.createElement("div");
        githubDiv.setAttribute("class", "githubLink");
        project.appendChild(githubDiv);

        project.addEventListener("click", clickableProjects);

        // append project to projects
        projectsContainer.appendChild(project);
      }
    });
}

export function clickableProjects() {
  console.log("click");
}
