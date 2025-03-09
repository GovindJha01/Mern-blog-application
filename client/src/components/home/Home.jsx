import Banner from "../Banner/Banner";
import Categories from "./Categories";
import { Grid2 } from "@mui/material";
import Posts from "./post/posts";

const Home = () => {
    return (
        <>
            <Banner />
            <Grid2 container>
                <Grid2 item lg={2} xs={12} sm={2}>
                    <Categories />
                </Grid2>
                <Grid2 container item xs={12} sm={10} lg={10}>
                    <Posts />
                </Grid2>
            </Grid2>
        </>
    )
}

export default Home;