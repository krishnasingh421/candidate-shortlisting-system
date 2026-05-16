require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

app.use(
    "/api/candidates",
    require("./routes/candidateRoutes")
);

app.use(
    "/api/match",
    require("./routes/matchRoutes")
);

app.use(
    "/api/ai",
    require("./routes/aiRoutes")
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});