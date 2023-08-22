const express = require('express');
const app = express();

const workingHoursMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const currentHour = currentDate.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && currentHour >= 9 && currentHour <= 17) {
    next();
  } else {
    res.send('The website is only available during working hours (Monday to Friday, 9 to 17).');
  }
};

app.use(express.static('public'));
app.use(workingHoursMiddleware);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/public/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/public/contact.html');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
