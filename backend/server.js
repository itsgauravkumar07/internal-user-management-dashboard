// This is for run server locally

require("dotenv").config();

const app = require("./index");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});