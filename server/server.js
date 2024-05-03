import server from "./app.js";
import connectDB from "./database/db.js";

const { PORT } = process.env;

connectDB()
    .then(() => {
        server.listen(PORT || 8080, () => {
            console.log(`Server started - http://localhost:${PORT}`)
        });
    })
    .catch(() => process.exit(1));
