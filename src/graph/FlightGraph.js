import Graph from "./Graph";
import { useState, useEffect } from "react";
import { Box, Button, Input, List, ListItem, Text } from "@chakra-ui/react";

const FlightGraph = () => {
  const [flights, setFlights] = useState([]);
  const [showFlights, setShowFlights] = useState(false);
  const [startingCity, setStartingCity] = useState(null);
  const [destination, setDestination] = useState(null);
  const [toCities, setToCities] = useState([]);
  const [fromCities, setFromCities] = useState([]);
  const [showChosenFlight, setShowChosenFlight] = useState(false);
  const [cheapestRoute, setCheapestRoute] = useState(null);
  const [seeRoute, setSeeRoute] = useState(false);
  const [numLayerovers, setNumLayovers] = useState(0);

  useEffect(() => {
    const fromCitiesList = [];
    flightsList.forEach((item) => {
      if (!fromCitiesList.includes(item.start.toUpperCase()))
        fromCitiesList.push(item.start.toUpperCase());
    });
    const toCitiesList = [];
    flightsList.forEach((item) => {
      if (!toCitiesList.includes(item.destination.toUpperCase()))
        toCitiesList.push(item.destination.toUpperCase());
    });

    // console.log(toCitiesList);
    setFromCities(toCitiesList);
    setToCities(toCitiesList);
    setFlights(flightsList);
  }, []);

  const flightsList = [
    {
      id: 1,
      start: "OSLO",
      destination: "TRONDHEIM",
      price: 150,
    },
    {
      id: 2,
      start: "TRONDHEIM",
      destination: "BERGEN",
      price: 100,
    },
    {
      id: 3,
      start: "BERGEN",
      destination: "OSLO",
      price: 250,
    },
    {
      id: 4,
      start: "TRONDHEIM",
      destination: "BODØ",
      price: 600,
    },
    {
      id: 5,
      start: "BERGEN",
      destination: "BODØ",
      price: 300,
    },
  ];
  const g = new Graph(flightsList.length);

  flightsList.forEach((item) => {
    g.addVertex(item.start);
    g.addVertex(item.destination);
  });

  flightsList.forEach((item) => {
    g.addEdge(item.start, item.destination, item.price);
  });

  const dijkstra = (src, end, nMaxStops) => {
    const stack = [];
    const processed = [];
    const dist = new Map();
    const path = [];
    let stopCount = -1;

    stack.push(src);
    path.push(src);
    g.getVertecies().forEach((node) => {
      dist.set(node, Infinity);
    });
    dist.set(src, 0);

    while (stack.length > 0 && stopCount <= nMaxStops) {
      const curr = stack.pop();
      const prevCost = dist.get(curr);

      for (let i = 0; i < g.getNeighbours(curr).length; i++) {
        let city = g.getNeighbours(curr)[i];
        if (processed.indexOf !== -1) {
          stack.push(city);
          dist.set(city, prevCost + g.getWeight(curr, city));
          if (path.indexOf(curr) === -1) {
            path.push(curr);
          }
        }
      }

      stopCount++;
      processed.push(curr);
    }
    path.push(end);
    return [dist.get(end), path];
  };

  return (
    <>
      <Box>
        <Input
          placeholder="Enter starting city"
          borderColor="purple.200"
          focusBorderColor="purple.500"
          onChange={(e) => {
            setStartingCity(e.target.value.toUpperCase());
          }}
        />
        <Input
          placeholder="Enter destination"
          borderColor="purple.200"
          focusBorderColor="purple.500"
          onChange={(e) => {
            setDestination(e.target.value.toUpperCase());
          }}
        />
        <Input
          placeholder="Enter number of layovers allowed"
          borderColor="purple.200"
          focusBorderColor="purple.500"
          type={"number"}
          onChange={(e) => {
            setNumLayovers(e.target.value);
          }}
        />
      </Box>
      <Box>
        {toCities.includes(startingCity) && (
          <Text>Starting City: {startingCity}</Text>
        )}
        {fromCities.includes(destination) && (
          <>
            <Text>Destination: {destination}</Text>
            <Button
              onClick={() => {
                setShowChosenFlight(true);
                setCheapestRoute(
                  dijkstra(startingCity, destination, numLayerovers)
                );
              }}
            >
              See Flight
            </Button>
          </>
        )}
      </Box>
      {showChosenFlight && (
        <Box>
          <Text>
            {startingCity} to {destination} for {cheapestRoute[0]}$
          </Text>
          {seeRoute ? (
            <Button onClick={() => setSeeRoute(false)}>Hide Route</Button>
          ) : (
            <Button onClick={() => setSeeRoute(true)}>See Route</Button>
          )}
        </Box>
      )}
      {cheapestRoute && seeRoute && (
        <Box>
          {cheapestRoute[1].map((city) => (
            <Text key={city}>{city}</Text>
          ))}
        </Box>
      )}
    </>
  );
};

export default FlightGraph;
