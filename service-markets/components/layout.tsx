import Navbar from "./navbar";
import Footer from "./footer";
import { Grid } from "@chakra-ui/layout";

export default function Layout({ children }:any) {
    return (
        <Grid minH="100vh" templateRows="auto 1fr auto">
            <Navbar />
            {children}
            <Footer />
        </Grid>
    );
}