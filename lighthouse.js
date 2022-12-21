#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');
let defaultNodeProfile='-dev';
const budgetFailArr = [];

require('dotenv').config({ path: path.join(__dirname,".env") });

console.log("process.argv",process.argv);


// Check for dev or build 
if(process.argv.length>2){
  if(~process.argv.indexOf('-build')){
    defaultNodeProfile = '-build';
  }
}



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const { spawn } = require('child_process');

let userChoice ='';
let specificProfile='';



const createTargetUrl = (port) =>{
  return 'http://localhost:'+port+'/home';
}


// Execute Lighthouse profile logic
const executeProfile = async (profileArr) => {
    console.log("INSIDE EXECUTE PROFILE",profileArr)
    let chrome = null;
    try{
        chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    }catch(e){
        console.log("ERROR on chrome launch",e);
    }
    
    let PAGE_URL = defaultNodeProfile === '-build'? process.env.POST_PAGE_URL : process.env.PRE_PAGE_URL;


    console.log("process.env.npm_config_port",process.env.npm_config_port);

    if(process.env.npm_config_port){
      PAGE_URL = createTargetUrl(process.env.npm_config_port);
    }
    const BUDGETS= JSON.parse(process.env.BUDGETS);
    console.log("BUDGETS",BUDGETS);

    const options = {logLevel: 'info', output: 'html', onlyCategories: profileArr, port: chrome.port};
    const runnerResult = await lighthouse(PAGE_URL, options);
    
    
    const reportHtml = runnerResult.report;
    fs.writeFileSync('lhreport.html', reportHtml);
    const finalScore =[];
    for(let i=0; i< profileArr.length; i++){
        const score = runnerResult.lhr.categories[profileArr[i]].score * 100;
        finalScore.push({
            profileName:profileArr[i],
            score
        });
    }
    console.log("FINAL SCORE",finalScore )
    
    await chrome.kill();

    // Loop through budget array
    
    for(let i=0;i<finalScore.length; i++){
        if(finalScore[i].score < parseInt(BUDGETS[finalScore[i].profileName])){
            budgetFailArr.push({
              profileName:finalScore[i].profileName,
              score:finalScore[i].score
            });
        }
    }

    // Failed report 

    if(budgetFailArr.length){
      console.log("\x1b[36m%s\x1b[0m", "------ Failed Profile Report ------");
      budgetFailArr.forEach((val)=>{
        console.log("\x1b[36m", val.profileName.toUpperCase() +" = "+ val.score, "\x1b[0m");
      });
      
      
      //throw(`${finalScore[i].profileName} score too low (${finalScore[i].score})for production release. ${finalScore[i].profileName.toUpperCase()} budget is ${BUDGETS[finalScore[i].profileName]} `)
      // throw(`${finalScore[i].profileName} score too low (${finalScore[i].score})for production release. ${finalScore[i].profileName.toUpperCase()} budget is ${BUDGETS[finalScore[i].profileName]} `);
    }else{
      process.exit()
    }


    // killing the webserver instance after profile got generated
    if(defaultNodeProfile === '-build'){
      spawn('kill',['-9 $(lsof -ti:9000)'],{
        shell:true,
        stdio: "inherit"
      }); 
    }
    
    
};


// Ask question to load default and specific profile
const question1 = () => {
    return new Promise((resolve, reject) => {
      rl.question('Do you want to load default lighthouse profile: Y/N ?', (answer) => {
        userChoice = answer;
        resolve();
      })
    })
}

const question2 = () => {
    return new Promise((resolve, reject) => {
      rl.question('Please provide a specific profile to be loaded by Lighthouse: ', (answer) => {
        specificProfile = answer;
        resolve()
      })
    })
}


// Controling the questions to be asked
const main = async () => {
  const defaultProfile = ['performance','accessibility','seo','best-practices'];
  await question1();
  console.log("userChoice",typeof userChoice,userChoice)
  const ans = userChoice.trim().toLowerCase();

  if (ans !== 'y' && ans !== 'n') {
        return;
  }
  if(ans === 'y'){
      executeProfile(defaultProfile);
  }else if(ans === 'n'){
      await question2();
      const ans = specificProfile.trim().toLowerCase();

      if(~defaultProfile.indexOf(ans)){
          console.log('NO ANS',ans)
          executeProfile([ans]);
      }

  }
  
  rl.close()
}

try{
  main();
}catch(e){
  console.error(e);
}










