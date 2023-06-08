import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  styled,
} from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

function CountryCard({ imgflag, name, continent, population, id }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <RouterLink to={"/home/" + id} style={{ textDecoration: "none" }}>
        <StyledCard>
          <CardMedia
            component="img"
            src={imgflag}
            alt="not found"
            height="180"
          />
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>
              {name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Continente: {continent}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Población: {population} habitantes
            </Typography>
          </CardContent>
        </StyledCard>
      </RouterLink>
    </Grid>
  );
}

export default CountryCard;
