// src/pages/Home.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Home = () => {
  const cards = [
    { title: 'Card 1', content: 'Content for card 1' },
    { title: 'Card 2', content: 'Content for card 2' },
    { title: 'Card 3', content: 'Content for card 3' },
    { title: 'Card 4', content: 'Content for card 4' },
    { title: 'Card 5', content: 'Content for card 5' },
    { title: 'Card 6', content: 'Content for card 6' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className="m-4">
          <CardContent>
            <Typography variant="h5" component="div">
              {card.title}
            </Typography>
            <Typography variant="body2">
              {card.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Home;
