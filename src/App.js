import {
  Box,
  Center,
  Stack,
  Heading,
  SimpleGrid,
  Text,
  Button,
  List,
  ListItem,
  Input,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
// import Flights from "./components/Flights";
// import InputField from "./components/InputField";
import axios from "axios";
import { useEffect, useState } from "react";
import FlightGraph from "./graph/FlightGraph";

// https://bloomberg-market-and-financial-news.p.rapidapi.com/market/auto-complete
// https://expedia-scraper-by-infatica.p.rapidapi.com/rapid.php

const App = () => {
  const [flights, setFlights] = useState([]);
  const [showFlights, setShowFlights] = useState(false);

  const flightsList = [
    {
      id: 1,
      start: "Oslo",
      destination: "Trondheim",
      price: 150,
    },
    {
      id: 2,
      start: "Trondheim",
      destination: "Bergen",
      price: 100,
    },
    {
      id: 3,
      start: "Bergen",
      destination: "Oslo",
      price: 250,
    },
    {
      id: 4,
      start: "Trondheim",
      destination: "Bodø",
      price: 600,
    },
    {
      id: 5,
      start: "Bergen",
      destination: "Bodø",
      price: 300,
    },
  ];

  return (
    <Center>
      <Stack>
        <Heading fontSize={"6xl"}>Flight Planner</Heading>
        {showFlights ? (
          <Button
            onClick={() => {
              setFlights([]);
              setShowFlights(false);
            }}
          >
            Hide Flights
          </Button>
        ) : (
          <Button
            onClick={() => {
              setFlights(flightsList);
              setShowFlights(true);
            }}
          >
            Show Flights
          </Button>
        )}
        <Button
          onClick={() => {
            const sortedFlights = flightsList.sort((a, b) => a.price - b.price);
            setFlights(sortedFlights);
          }}
        >
          Filter by Price
        </Button>
        <Button
          onClick={() => {
            setFlights(flightsList);
          }}
        >
          Reset
        </Button>
        {showFlights && (
          <SimpleGrid columns={2}>
            {flights.map((flight) => (
              <Box
                bg={"blackAlpha.800"}
                borderRadius={"10px"}
                margin={"0.5"}
                key={flight.id}
                height={"60px"}
              >
                <Text marginLeft={"5"} color={"yellow.500"}>
                  {flight.start}
                  <ArrowForwardIcon />
                  {flight.destination}
                </Text>
                <Text marginLeft={"10"} color={"yellow.400"}>
                  {flight.price}$
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        )}
        <FlightGraph />
      </Stack>
    </Center>
  );
};

export default App;
