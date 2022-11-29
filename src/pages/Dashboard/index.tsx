import { Button } from "@mui/material";
import { auth, firestore } from "firebaseConfig";
import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [loading, setLoading] = React.useState(true);
  const [url, setUrl] = React.useState("");

  const nav = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userID = localStorage.getItem("uid");

        if (!userID) {
          throw new Error("User not logged in");
        }

        const shop = await firestore.collection("shops").where("userID", "==", userID).get();

        if (shop.empty) {
          nav("/create-shop");
          throw new Error("Shop not found, please create one");
        }

        const shopUrl = shop.docs[0].data().domin;
        setUrl(shopUrl);

        setLoading(false);
      } catch (error) {
        console.log(error);
        nav("/sign-up");
        setLoading(false);
      }
    };
    fetchData();
  }, [nav]);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>Dashboard</h1>
          <div>
            <a target={"_blank"} href={`http://${url}/`} rel="noreferrer">
              go to your website
            </a>
          </div>

          <div style={{ marginTop: "25px" }}>
            <Button
              onClick={async () => {
                await auth.signOut();
                nav("/login");
              }}
            >
              sing out
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
