"use client";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
  Container,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import myimg from "./cover.png";

import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "./firebase"; // Ensure this is your Firestore instance

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/about");
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [itemName, setItemName] = useState("");
  const [amount, setQuantity] = useState("");

  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addItem2(itemName, Number(amount));
    setItemName("");
    setQuantity("");
  };

  const fetchAndLogInventory = async () => {
    const querySnapshot = await getDocs(collection(firestore, "pantry"));
    const inventoryList = [];
    querySnapshot.forEach((doc) => {
      //console.log(`${doc.id} =>`, doc.data());
      inventoryList.push({ id: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    fetchAndLogInventory();
  }, []);

  const decreaseItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await fetchAndLogInventory();
  };

  const addItem2 = async (item, amount) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity: existingQuantity } = docSnap.data();
      await setDoc(docRef, { quantity: existingQuantity + amount });
    } else {
      await setDoc(docRef, { quantity: amount });
    }
    await fetchAndLogInventory();
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    }
    await fetchAndLogInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await deleteDoc(docRef);
    }
    await fetchAndLogInventory();
  };
  // useEffect(() => {
  //   updateInventory();
  // }, []);

  // const filteredInventory = inventory.filter((item) =>
  //   item.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  //console.log(inventory);

  const filteredInventory = inventory.filter((item) =>
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //console.log(filteredInventory);
  return (
    <Box
      sx={{
        backgroundImage: `url(${myimg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <AppBar position="static" sx={{ bgcolor: "#303134" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pantry Tracker
          </Typography>

          <Box
            display="flex"
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button
              paddingright={"20px"}
              color="inherit"
              sx={{ textTransform: "none", fontWeight: "bold" }}
              onClick={() => window.location.reload()}
            >
              Home
            </Button>
            <Button
              color="inherit"
              sx={{ textTransform: "none" }}
              onClick={handleClick}
            >
              About
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          marginTop: "50px",
        }}
      >
        {/**Search Bar */}
        <Box>
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            sx={{ backgroundColor: "#fff" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>

        {/*Adding items */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 3,
            maxWidth: 600,
            margin: "auto",
            padding: 2,
            backgroundColor: "white",
            borderRadius: 1,
            boxShadow: 3,
            mt: 4,
          }}
        >
          <TextField
            label="Item Name"
            variant="outlined"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
            sx={{ flex: 1, height: "56px" }}
          />
          <TextField
            label="Quantity"
            variant="outlined"
            value={amount}
            onChange={(e) => setQuantity(e.target.value)}
            required
            sx={{ flex: 1, height: "56px" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              flex: 1,
              alignSelf: "center",
              minHeight: "56px",
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#F9C846",
              "&:hover": {
                backgroundColor: "#D7A20F",
              },
              "&:active": {
                backgroundColor: "#F9C846",
              },
              "&:focus": {
                backgroundColor: "#F9C846",
              },
            }}
            onClick={() => {
              addItem2(itemName.toLowerCase(), Number(amount));
              setItemName("");
            }}
          >
            Add Item
          </Button>
        </Box>

        {/*Displaying the inventory */}
        <Box
          border="1px solid #333"
          p={0}
          marginTop={5}
          marginBottom={5}
          minHeight={isMobile ? "500px" : 0}
          borderRadius={2}
          sx={{ bgcolor: "#fff" }}
        >
          <Box
            width="100%"
            height="60px"
            bgcolor="#333"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius={1}
          >
            <Typography
              variant={isMobile ? "h6" : "h5"}
              color="#fff"
              textAlign="center"
            >
              Inventory Items
            </Typography>
          </Box>
          <Stack width="100%" spacing={1} height="300px" overflow="auto">
            {filteredInventory.map(({ id, quantity }) => (
              <Box
                key={id}
                width="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bgcolor="#f0f0f0"
                p={2}
                borderRadius={1}
                boxShadow={1}
                sx={{ boxSizing: "border-box", m: 0 }}
              >
                <Box width={isMobile ? "70px" : "140px"}>
                  <Typography variant={isMobile ? "h6" : "h5"}>{id}</Typography>
                </Box>

                <Box minWidth="fit-content">
                  <Typography variant={isMobile ? "h6" : "h5"}>
                    {quantity}
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  minWidth={isMobile ? "200px" : "250px"}
                  sx={{
                    flexDirection: "row",
                    justifyContent: "end",
                    flexWrap: "nowrap",
                    gap: 1,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: "fit-content" }}
                    onClick={() => addItem(id)}
                    //sx={{ marginRight: "20px" }}
                  >
                    +
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: "fit-content" }}
                    onClick={() => decreaseItem(id)}
                    //sx={{ marginRight: "20px" }}
                  >
                    -
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: "none" }}
                    onClick={() => removeItem(id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
