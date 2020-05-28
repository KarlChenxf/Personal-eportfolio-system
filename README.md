# Software project Team 12

## Clone

### `git clone https://github.com/KarlChenxf/Personal-eportfolio-system.git personal-eportfolio-system`

Note: React does not allow Capital project name.

## Setup

### `npm install`

Install all modules listed as dependencies in package.json.

## Run (Development)

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Deploy

### `npm run build`

Builds the app for production to the `build` folder.

### `scp -i key.pem -r build/* ubuntu@ec2.compute.amazonaws.com:/home/ubuntu/frontend/build`
### `scp -i key.pem -r ecosystem.config.js ubuntu@ec2.compute.amazonaws.com:/home/ubuntu/frontend`

Uploads the `build` folder and `ecosystem.config.js` to AWS.

### `pm2 start ecosystem.config.js`

(On AWS) Runs the app in deployment mode.

### `pm2 list`

Checks running processes.

## Team Member

+ Chuanxi Fu	chuanxif@student.unimelb.edu.au	
+ Shang Gao	gasg@student.unimelb.edu.au	
+ Xuefeng Chen	xuefeng@student.unimelb.edu.au	
+ Yiyang XU	yiyangx2@student.unimelb.edu.au
+ Chang Liu liu.c5@student.unimelb.edu.au

## Credits

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).