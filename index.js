import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourUsername = "randomuser1";
const yourPassword = "12345";
const yourAPIKey = "fb74acfb-d308-4233-b5c6-8603a85f0b47";
const yourBearerToken = "a201ffdd-5a66-4152-935a-170090d659a1";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  const result = await axios.get(API_URL + "/random");
  console.log(JSON.stringify(result.data));

  res.render("index.ejs", { content: JSON.stringify(result.data) });
});

app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/all", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    console.log(JSON.stringify(result.data));
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    console.log(error);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/filter", {
      params: {
        apiKey: yourAPIKey,
        score: 5,
      },
    });

    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    console.log(error);
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/secrets/42", {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    });

    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
