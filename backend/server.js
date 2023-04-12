const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { promisify } = require("util");
const { fileCorruptor } = require("./utils/corruptFile");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/corrupt", async (req, res) => {
  try {
    const { file, corruptionLevel } = req.body;
    const readFile = promisify(fs.readFile);
    const writeFile = promisify(fs.writeFile);
    const fileData = await readFile(file.path);
    const corruptedData = fileCorruptor(fileData, corruptionLevel);
    const fileNameParts = file.originalname.split(".");
    const extension = fileNameParts.pop();
    const fileName = fileNameParts.join(".");
    const corruptedFileName = `${fileName}_corrupted.${extension}`;
    await writeFile(corruptedFileName, corruptedData);
    res.set("Content-Disposition", `attachment; filename=${corruptedFileName}`);
    res.sendFile(corruptedFileName, { root: __dirname });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "An error occurred while corrupting the file" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
