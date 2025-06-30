import  express  from "express";
import postRoute from "./routes/buku"


const app = express()
const PORT = 3000
app.use(express.json());

app.use("/data", postRoute)

app.listen(PORT, () => {
    console.log("server is running")
})