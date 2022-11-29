import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { auth, firestore } from "firebaseConfig";
import { CircularProgress, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function CreateShop() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [template, setTemplate] = React.useState<string>("aaa");

  const nav = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // const { shopName, shopDescription, userID, template } = req.body;

    try {
      setLoading(true);
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const uid = auth.currentUser?.uid;

      if (!uid) {
        throw new Error("User not logged in");
      }

      const shopName: string = data.get("shopName") as string;
      const shopDescription: string = data.get("shopDescription") as string;

      let ports = (await firestore.collection("ports").doc("ports").get()).data();

      if (!ports || !ports.ports) {
        ports = { ports: ["1000"] };
      }

      ports.ports?.sort((a: any, b: any) => +b - +a);
      const port = +ports.ports?.[0] + 1 || "1000";

      ports.ports?.push(port);
      await firestore
        .collection("ports")
        .doc("ports")
        .update({
          ports: [...ports.ports],
        });

      const createShop = await fetch("http://localhost:8000/api/create-new-shop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shopName,
          shopDescription,
          template,
          userID: uid,
          port,
        }),
      });

      const res = createShop.status;

      if (res !== 200) {
        throw new Error("Something went wrong");
      }

      setLoading(false);

      nav("/dashboard");
    } catch (error) {
      setLoading(false);
      console.log(error);

      console.log("an error occurred");
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setTemplate(event.target.value as string);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create shop
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField autoComplete="shop-name" name="shopName" required fullWidth id="shopName" label="Shop name" autoFocus />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="shopDescription" label="Shop description" name="shopDescription" autoComplete="shop-description" />
              </Grid>
              <Grid item xs={12}>
                <Select //
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={template}
                  onChange={handleChange}
                >
                  <MenuItem value={"aaa"}>template 1</MenuItem>
                  <MenuItem value={"bbb"}>template 2</MenuItem>
                  <MenuItem value={"ccc"}>template 3</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Button disabled={loading} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {loading ? <CircularProgress size={20} color="inherit" /> : "Create shop"}
            </Button>
            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
