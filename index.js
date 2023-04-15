const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const { pdfMerger } = require("./mergepdf");

const upload = multer({ dest: "uploads/" });
app.use("/static", express.static("public"));
const port = 3000;
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.post("/merge", upload.array("pdfs", 2), async function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  const mergedFileName = await pdfMerger(
    path.join(__dirname, req.files[0].path),
    path.join(__dirname, req.files[1].path)
  );
  res.redirect(`static/${mergedFileName}.pdf`);
});
