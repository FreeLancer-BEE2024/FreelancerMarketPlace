const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const workRoutes = require('./routes/workRoute')
const frelancerRoutes = require('./routes/freelancerRoute')
const companyRoute = require('./routes/companyRoute')
const port = 3000;
app.use(express.urlencoded({extended:true}))
const cors = require('cors');
// CORS setup with credentials and allowed origin
const corsOptions = {
  origin: "http://localhost:3001",  // React app's origin
  credentials: true,               // Allow credentials like cookies, authorization headers
};

app.use(cors(corsOptions));  

app.use(express.json());
app.use(cookieParser());

app.use('/', userRoutes);
app.use('/works', workRoutes);
app.use('/freelancers', frelancerRoutes);
app.use('/company', companyRoute);


app.listen(port, (err)=>{
  if(err) return console.log(err);
  console.log(`server is running on ${port}`);
})

