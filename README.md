# Personal ePortfolio System / Front End

## Local Development Environment

### Setup
Install [Node.js](https://nodejs.org/en/download/) v12.16.1

Clone from repository:
```
git clone https://github.com/KarlChenxf/Personal-eportfolio-system.git personal-eportfolio-system
```
>Note: React does not allow Capital project name.

Install all modules listed as dependencies in package.json:
```
npm install
```

### Run (Development)
```
npm start
```
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Deploy
| :warning: Be sure to update the `API_END_POINT` in `Config.js`.   |
|-------------------------------------------------------------------|

```
npm run build
```
Builds the app for production to the `build` folder.
```
scp -i key.pem -r build/* ubuntu@ec2.compute.amazonaws.com:/home/ubuntu/frontend/build
scp -i key.pem -r ecosystem.config.js ubuntu@ec2.compute.amazonaws.com:/home/ubuntu/frontend
```
Uploads the `build` folder and `ecosystem.config.js` to AWS in following structure.

```
📂
 ┣ 📂build
 ┗ 📜ecosystem.config.js
```

## Sever Environment

### Setup
Install [nvm](https://github.com/nvm-sh/nvm) (used to install nodejs):
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```
Install node.js:
```
nvm install 12.16.1
```
Install [serve](https://github.com/vercel/serve) (11.3.0) and [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/) (4.2.3):
```
npm install -g serve
```
```
npm install -g pm2
```
### Run (Deployment)
Run the app (in deployment mode):
```
pm2 start ecosystem.config.js
```
Check running processes:
```
pm2 list
```
Configure a startup script to launch pm2 and its managed processes on server boots:
```
pm2 startup
```
Copy/paste the line PM2 gives you and the startup script will be configured for your OS. [Reference][1]

[1]:https://pm2.keymetrics.io/docs/usage/startup/

## Software Project Team 12

+ Chang Liu     liu.c5@student.unimelb.edu.au
+ Chuanxi Fu	chuanxif@student.unimelb.edu.au	
+ Shang Gao	    gasg@student.unimelb.edu.au	
+ Xuefeng Chen	xuefeng@student.unimelb.edu.au	
+ Yiyang XU	    yiyangx2@student.unimelb.edu.au

## Credits

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
