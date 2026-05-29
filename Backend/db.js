const mongoose = require("mongoose");

mongoose.connect(
"mongodb+srv://harshitpal902_db_user:8Ksfsn1h2KgxGRWX@cluster0.kcrw9df.mongodb.net/?appName=Cluster0"
)
.then(() => {
    console.log("Database connected");
})
.catch((err) => {
    console.log("DB Error:", err);
});

module.exports = mongoose;