// import { fetch } from "node-fetch";

export function fetchProjects() {
  // fetch("https://magnet.paradoxclub.org/projects.json") // pi
  fetch("projects.json") // local host
    .then((response) => response.json())
    .then((data) => {
      console.log("fetch successful");

      // iterate over projects[]
      let projects = data["projects"];
      for (let i = 0; i < 8; i++) {
        const projectsContainer = document.querySelector(".projects");

        // create project div
        const project = document.createElement("div");
        project.setAttribute("class", "project");

        // create projName div
        const projName = document.createElement("div");
        projName.setAttribute("class", "proj-name");

        // create name & set innerHTML
        // append name to projName
        const name = document.createElement("h4");
        name.innerHTML = projects[i].name;
        projName.appendChild(name);

        // create line & append to projName
        // append projName to project
        const lineDiv = document.createElement("div");
        lineDiv.setAttribute("class", "line");
        projName.appendChild(lineDiv);
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
        // ---------------------------------------------
        // externalLinks
        const externalLinksDiv = document.createElement("div");
        externalLinksDiv.setAttribute("class", "externalLinks");

        // gitDiv + <a> tag
        const gitDiv = document.createElement("div");
        gitDiv.setAttribute("class", "gitDiv");
        const gitIcon = document.createElement("a");

        // get gitUrl and set <a> attributes
        // append gitIcon to gitDiv
        // append gitDiv to externalLinks
        let gitUrl = projects[i].gitUrl;
        gitIcon.setAttribute("href", gitUrl);
        gitIcon.setAttribute("target", "_blank");
        gitIcon.setAttribute("class", "fa-brands fa-github fa-2x");
        gitIcon.setAttribute("title", "check out this repo on my GitHub");
        gitDiv.appendChild(gitIcon);
        externalLinksDiv.appendChild(gitDiv);

        // deployDiv + <a> tag
        const deployDiv = document.createElement("div");
        deployDiv.setAttribute("class", "deployDiv");
        const projectIcon = document.createElement("a");

        // get projUrl and if it exists, set <a> attributes
        // append projIcon to deployDiv
        let projectUrl = projects[i].projUrl;
        if (projectUrl) {
          projectIcon.setAttribute("href", projectUrl);
          projectIcon.setAttribute("target", "_blank");
          projectIcon.setAttribute(
            "class",
            "fa-solid fa-square-arrow-up-right fa-xl"
          );
          projectIcon.setAttribute("title", "open this project");
          deployDiv.appendChild(projectIcon);

          // append deployDiv to externalLinksDiv
          externalLinksDiv.appendChild(deployDiv);
        }

        project.appendChild(externalLinksDiv);

        // append project to projects
        projectsContainer.appendChild(project);
      }
    });
}
