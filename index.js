const { Octokit } = require("@octokit/core");
const dotenv = require("dotenv").config();

const octokit = new Octokit({
  auth: process.env.GITHUB_PAT,
});

const express = require("express");
const app = express();
const port = 3003;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Made by Kolinabir and FariaLimpa");
});

// Rest of the code...
// app.post("/update-file-skills", async (req, res) => {
//   const { content } = req.body;
//   const owner = "kolinabir";
//   const repo = "developer-portfolio-main";
//   const contactPath = "skills.js";
//   const message = "Updating file";
//   const branch = "main";
//   const committer = {
//     name: "Kolinabir",
//     email: "knkolin9@gmail.com",
//   };
//   try {
//     if (content) {
//       // Fetch the file SHA
//       const response = await octokit.request(
//         "GET /repos/{owner}/{repo}/contents/utils/data/{path}",
//         {
//           owner,
//           repo,
//           path: contactPath,
//         }
//       );

//       const sha = response.data.sha;

//       // Update the file
//       const updateResponse = await octokit.request(
//         "PUT /repos/{owner}/{repo}/contents/utils/data/{path}",
//         {
//           owner,
//           repo,
//           path: contactPath,
//           message,
//           content: Buffer.from(content).toString("base64"),
//           branch,
//           sha,
//           committer,
//           headers: {
//             "X-GitHub-Api-Version": "2022-11-28", // Specify the API version
//           },
//         }
//       );
//       res.send(`File updated successfully! File path: ${contactPath}`);
//     } else {
//       res.status(400).send("Content cannot be empty");
//     }
//   } catch (error) {
//     console.error("Error updating file:", error.message);
//     res.status(500).send("Error updating file");
//   }
// });

app.post("/update-file-contact", async (req, res) => {
  const {
    email,
    phone,
    address,
    github,
    facebook,
    linkedIn,
    twitter,
    stackOverflow,
    devUsername,
  } = req.body.personalData || {};

  const owner = "kolinabir";
  const repo = "developer-portfolio-main";
  const contactPath = "utils/data/contactsData.js"; // Ensure this path is correct
  const message = "Updating file";
  const branch = "main";
  const committer = {
    name: "Kolinabir",
    email: "knkolin9@gmail.com",
  };

  // New content to be updated in the file
  const newContent = `export const contactsData = {
    email: '${email || ""}',
    phone: '${phone || ""}',
    address: '${address || ""}',
    github: '${github || ""}',
    facebook: '${facebook || ""}',
    linkedIn: '${linkedIn || ""}',
    twitter: '${twitter || ""}',
    stackOverflow: '${stackOverflow || ""}',
    devUsername: '${devUsername || ""}'
  }`;

  try {
    // Fetch the file SHA and existing content
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path: contactPath,
      }
    );

    const sha = response.data.sha;
    const existingContent = Buffer.from(
      response.data.content,
      "base64"
    ).toString("utf8");

    // Check if the content is different
    if (existingContent === newContent) {
      res.send(
        "Content is identical to the existing content. No update necessary."
      );
      return;
    }

    // Encode new content to base64
    const encodedContent = Buffer.from(newContent).toString("base64");
    console.log(`Encoded Content: ${encodedContent}`);

    // Update the file
    const updateResponse = await octokit.request(
      "PUT /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path: contactPath,
        message,
        content: encodedContent,
        branch,
        sha,
        committer,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    console.log(updateResponse);
    res.send(`File updated successfully! File path: ${contactPath}`);
  } catch (error) {
    console.error("Error updating file:", error.message);
    res.status(500).send("Error updating file");
  }
});
app.post("/update-file-education", async (req, res) => {
  const educationData = req.body.educationData || [];
  console.log(educationData);
  const owner = "kolinabir";
  const repo = "developer-portfolio-main";
  const educationPath = "utils/data/educations.js"; // Ensure this path is correct
  const message = "Updating education file";
  const branch = "main";
  const committer = {
    name: "Kolinabir",
    email: "knkolin9@gmail.com",
  };

  // Add unique IDs to each education item
  const educations = educationData.map((item, index) => ({
    id: index + 1,
    ...item,
  }));

  // New content to be updated in the file
  const newContent = `export const educations = ${JSON.stringify(
    educations,
    null,
    2
  )};`;

  try {
    // Fetch the file SHA and existing content
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path: educationPath,
      }
    );

    const sha = response.data.sha;
    const existingContent = Buffer.from(
      response.data.content,
      "base64"
    ).toString("utf8");

    // Check if the content is different
    if (existingContent === newContent) {
      res.send(
        "Content is identical to the existing content. No update necessary."
      );
      return;
    }

    // Encode new content to base64
    const encodedContent = Buffer.from(newContent).toString("base64");
    console.log(`Encoded Content: ${encodedContent}`);

    // Update the file
    const updateResponse = await octokit.request(
      "PUT /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path: educationPath,
        message,
        content: encodedContent,
        branch,
        sha,
        committer,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    console.log(updateResponse);
    res.send(`File updated successfully! File path: ${educationPath}`);
  } catch (error) {
    console.error("Error updating file:", error.message);
    res.status(500).send("Error updating file");
  }
});
app.post("/update-file-experience", async (req, res) => {
  const experienceData = req.body.experienceData || [];

  const owner = "kolinabir";
  const repo = "developer-portfolio-main";
  const experiencePath = "utils/data/experience.js"; // Ensure this path is correct
  const message = "Updating experience file";
  const branch = "main";
  const committer = {
    name: "Kolinabir",
    email: "knkolin9@gmail.com",
  };

  // Add unique IDs to each experience item
  const experiences = experienceData.map((item, index) => ({
    id: index + 1,
    ...item,
  }));

  // New content to be updated in the file
  const newContent = `export const experiences = ${JSON.stringify(
    experiences,
    null,
    2
  )};`;

  try {
    // Fetch the file SHA and existing content
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path: experiencePath,
      }
    );

    const sha = response.data.sha;
    const existingContent = Buffer.from(
      response.data.content,
      "base64"
    ).toString("utf8");

    // Check if the content is different
    if (existingContent === newContent) {
      res.send(
        "Content is identical to the existing content. No update necessary."
      );
      return;
    }

    // Encode new content to base64
    const encodedContent = Buffer.from(newContent).toString("base64");
    console.log(`Encoded Content: ${encodedContent}`);

    // Update the file
    const updateResponse = await octokit.request(
      "PUT /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path: experiencePath,
        message,
        content: encodedContent,
        branch,
        sha,
        committer,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    console.log(updateResponse);
    res.send(`File updated successfully! File path: ${experiencePath}`);
  } catch (error) {
    console.error("Error updating file:", error.message);
    res.status(500).send("Error updating file");
  }
});
app.post("/update-file-personal", async (req, res) => {
  const personalData = req.body.personalData || {};

  const owner = "kolinabir";
  const repo = "developer-portfolio-main";
  const personalDataPath = "utils/data/personal-data.js"; // Ensure this path is correct
  const message = "Updating personal data file";
  const branch = "main";
  const committer = {
    name: "Kolinabir",
    email: "knkolin9@gmail.com",
  };

  // New content to be updated in the file
  const newContent = `export const personalData = ${JSON.stringify(
    personalData,
    null,
    2
  )};`;

  try {
    // Fetch the file SHA and existing content
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path: personalDataPath,
      }
    );

    const sha = response.data.sha;
    const existingContent = Buffer.from(
      response.data.content,
      "base64"
    ).toString("utf8");

    // Check if the content is different
    if (existingContent === newContent) {
      res.send(
        "Content is identical to the existing content. No update necessary."
      );
      return;
    }

    // Encode new content to base64
    const encodedContent = Buffer.from(newContent).toString("base64");
    console.log(`Encoded Content: ${encodedContent}`);

    // Update the file
    const updateResponse = await octokit.request(
      "PUT /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path: personalDataPath,
        message,
        content: encodedContent,
        branch,
        sha,
        committer,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    console.log(updateResponse);
    res.send(`File updated successfully! File path: ${personalDataPath}`);
  } catch (error) {
    console.error("Error updating file:", error.message);
    res.status(500).send("Error updating file");
  }
});
app.post("/update-file-projects", async (req, res) => {
  const projectData = req.body.projectData || [];

  const owner = "kolinabir";
  const repo = "developer-portfolio-main";
  const projectsDataPath = "utils/data/projects-data.js"; // Ensure this path is correct
  const message = "Updating projects data file";
  const branch = "main";
  const committer = {
    name: "Kolinabir",
    email: "knkolin9@gmail.com",
  };

  // Add unique IDs to each project item
  const projects = projectData.map((item, index) => ({
    id: index + 1,
    ...item,
  }));

  // New content to be updated in the file
  const newContent = `export const projectsData = ${JSON.stringify(
    projects,
    null,
    2
  )};`;

  try {
    // Fetch the file SHA and existing content
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path: projectsDataPath,
      }
    );

    const sha = response.data.sha;
    const existingContent = Buffer.from(
      response.data.content,
      "base64"
    ).toString("utf8");

    // Check if the content is different
    if (existingContent === newContent) {
      res.send(
        "Content is identical to the existing content. No update necessary."
      );
      return;
    }

    // Encode new content to base64
    const encodedContent = Buffer.from(newContent).toString("base64");
    console.log(`Encoded Content: ${encodedContent}`);

    // Update the file
    const updateResponse = await octokit.request(
      "PUT /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path: projectsDataPath,
        message,
        content: encodedContent,
        branch,
        sha,
        committer,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    console.log(updateResponse);
    res.send(`File updated successfully! File path: ${projectsDataPath}`);
  } catch (error) {
    console.error("Error updating file:", error.message);
    res.status(500).send("Error updating file");
  }
});
app.post("/update-file-skills", async (req, res) => {
  const skillData = req.body.skillData || [];

  const owner = "kolinabir";
  const repo = "developer-portfolio-main";
  const skillsDataPath = "utils/data/skills.js"; // Ensure this path is correct
  const message = "Updating skills data file";
  const branch = "main";
  const committer = {
    name: "Kolinabir",
    email: "knkolin9@gmail.com",
  };

  // New content to be updated in the file
  const newContent = `export const skillsData = ${JSON.stringify(
    skillData,
    null,
    2
  )};`;

  try {
    // Fetch the file SHA and existing content
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path: skillsDataPath,
      }
    );

    const sha = response.data.sha;
    const existingContent = Buffer.from(
      response.data.content,
      "base64"
    ).toString("utf8");

    // Check if the content is different
    if (existingContent === newContent) {
      res.send(
        "Content is identical to the existing content. No update necessary."
      );
      return;
    }

    // Encode new content to base64
    const encodedContent = Buffer.from(newContent).toString("base64");
    console.log(`Encoded Content: ${encodedContent}`);

    // Update the file
    const updateResponse = await octokit.request(
      "PUT /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path: skillsDataPath,
        message,
        content: encodedContent,
        branch,
        sha,
        committer,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    console.log(updateResponse);
    res.send(`File updated successfully! File path: ${skillsDataPath}`);
  } catch (error) {
    console.error("Error updating file:", error.message);
    res.status(500).send("Error updating file");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
