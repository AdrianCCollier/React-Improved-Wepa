import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';


const birthdays = [
  { name: 'Alice', birthMonth: 'Jan', birthDay: '05' },
  { name: 'Bob', birthMonth: 'Feb', birthDay: '12' },
  { name: 'Charlie', birthMonth: 'Mar', birthDay: '19' },
  { name: 'Diana', birthMonth: 'Apr', birthDay: '26' },
  { name: 'Evan', birthMonth: 'May', birthDay: '31' },
];

const BirthdayTracker = () => {
  return (
    <Card
      sx={{
        width: '80%',
        maxWidth: 800,
        margin: 'auto',
        backgroundColor: '#120136',
        color: '#ffffff',
        padding: 2,
        borderRadius: 2,
        boxShadow: '0 0 10px #8b00ff',
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            color: '#8b00ff',
            textShadow: '0 0 10px #8b00ff',
            marginBottom: 2,
            textAlign: 'center',
          }}
        >
          Upcoming Birthdays
        </Typography>
        <List>
          {birthdays.map((birthday, index) => (
            <ListItem
              key={index}
              sx={{ borderBottom: '1px solid #8b00ff', padding: '10px 0' }}
            >
              <ListItemIcon>
                <CakeIcon sx={{ color: '#ffffff', marginRight: 1 }} />
              </ListItemIcon>
              <ListItemText
                primary={`${birthday.name} - ${birthday.birthMonth}/${birthday.birthDay}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default BirthdayTracker;
