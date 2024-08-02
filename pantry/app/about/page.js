"use client";
import myimg from "../cover.png";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Container, List, ListItem, ListItemText, Link } from "@mui/material";
import { useRouter } from "next/navigation";
export default function About() {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };
  return (
    <Box
      sx={{
        backgroundImage: `url(${myimg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar position="static" sx={{ bgcolor: "#303134" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pantry Tracker
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              sx={{ textTransform: "none", paddingRight: "20px" }}
              color="inherit"
              onClick={handleHomeClick}
            >
              Home
            </Button>
            <Button
              sx={{ textTransform: "none", fontWeight: "bold" }}
              color="inherit"
              onClick={() => window.location.reload()}
            >
              About
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: { xs: 4, md: 10 }, // Add margin-top for mobile and larger screens
          width: { xs: "90%", md: "80%" },
          minHeight: "200px",
          margin: "auto",
          borderRadius: "20px",
          boxShadow: 3,
          p: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Box mt={3} mb={1}>
          <Typography variant="body1" paragraph>
            Our pantry tracker app is designed to make managing your pantry
            simple and efficient. Here are some of the key features:
          </Typography>
          <List sx={{ padding: 0 }}>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText
                primary="User-Friendly Interface"
                secondary="Enjoy a clean and intuitive UI that makes managing your pantry a breeze. The design is straightforward, ensuring that even beginners can navigate effortlessly."
              />
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText
                primary="Comprehensive Pantry Management"
                secondary="Easily add, delete, and remove items from your pantry. Keep track of your inventory with just a few clicks, making it simple to stay organized and avoid running out of essentials."
              />
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText
                primary="Efficient Search Functionality"
                secondary="Quickly find any item in your pantry with our powerful search feature. No more scrolling through long lists—just type in what you're looking for, and find it instantly."
              />
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText
                primary="Responsive Design"
                secondary="Access your pantry tracker on any device, whether it's a desktop, tablet, or smartphone. The responsive layout ensures a seamless experience, adapting perfectly to any screen size."
              />
            </ListItem>
            <ListItem sx={{ padding: 0, paddingTop: "30px" }}>
              <ListItemText
                primary={
                  <>
                    Project has been created by{" "}
                    <Link
                      href="https://github.com/ganbnuray"
                      color="primary"
                      underline="none"
                      fontWeight={"bold"}
                    >
                      Nuray Ganbarova ❤️
                    </Link>
                  </>
                }
              />
            </ListItem>
          </List>
        </Box>
      </Container>
    </Box>
  );
}
