import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Stack,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import "./App.css";

function App() {
  const [data, setData] = useState<any>("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://openlibrary.org/search.json?author=tolkien")
      .then((response) => response.json())
      .then((bookData) => {
        setData(bookData);
      });
  }, []);

  return (
    <Container>
      <TextField
        sx={{ m: 2 }}
        value={search}
        label="Search Authors Here..."
        variant="filled"
        size="medium"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        onClick={() => {
          searchAuthor();
        }}
        sx={{ mt: 3 }}
      >
        Search
      </Button>
      {!data ? (
        <>
          <Stack alignItems="center" justifyContent="center" margin="300px">
            <CircularProgress />
          </Stack>
        </>
      ) : (
        <Container>
          <Typography gutterBottom variant="h2">
            List of Works
          </Typography>
          {data.docs.map((e: any) => {
            return (
              <Grid container columnSpacing="30px" border="1px solid black" m="1%" p="1%" borderRadius="5px">
                <Grid item>
                  <a
                    href={` https://openlibrary.org${e.key}/${e.title}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {e.title}
                  </a>
                </Grid>
                <Grid item>{e.first_publish_year}</Grid>
              </Grid>
            );
          })}
        </Container>
      )}
    </Container>
  );

  function searchAuthor() {
    setData("");

    if (search === undefined) {
      return;
    }

    fetch("http://openlibrary.org/search.json?author=" + search)
      .then((response) => response.json())
      .then((bookData) => {
        setData(bookData);
      });
  }
}

export default App;
