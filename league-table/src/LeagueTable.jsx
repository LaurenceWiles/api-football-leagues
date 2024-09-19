import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import "./App.css";

const LeaguesTable = () => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      const cachedLeagues = localStorage.getItem("leagues");
      if (cachedLeagues) {
        setLeagues(JSON.parse(cachedLeagues));
        return;
      }

      try {
        const response = await axios.get(
          "https://v3.football.api-sports.io/leagues",
          {
            headers: {
              "x-apisports-key": "2441fdc7bcd844d971358c66e7ac8056",
            },
          }
        );
        const leaguesData = response.data.response;

        localStorage.setItem("leagues", JSON.stringify(leaguesData));
        setLeagues(leaguesData);
      } catch (error) {
        console.error("Error fetching leagues:", error);
      }
    };

    fetchLeagues();
  }, []);

  return (
    <TableContainer component={Paper} className="table-container">
      <Table className="table">
        <TableHead className="table-head">
          <TableRow>
            <TableCell className="header-cell">Name</TableCell>
            <TableCell className="header-cell">Type</TableCell>
            <TableCell className="header-cell">Country</TableCell>
            <TableCell className="header-cell logo-cell">Logo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leagues.map((league) => (
            <TableRow key={league.league.id} className="row">
              <TableCell className="cell">{league.league.name}</TableCell>
              <TableCell className="cell">{league.league.type}</TableCell>
              <TableCell className="cell">
                {league.country.name || "N/A"}
              </TableCell>
              <TableCell className="cell logo-cell">
                <img
                  src={league.league.logo}
                  alt={league.league.name}
                  className="logo-img"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaguesTable;
