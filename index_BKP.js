const playwright = require('playwright');
const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const fs = require('fs');

const { viewportHeight, viewportWidth, browsers, options } = config;

async function executeTest(){
  
    if(browsers.length === 0){
      return;
    }
    let resultInfo = {}
    let datetime = new Date().toISOString().replace(/:/g,".");
    for(b of browsers){
        if(!b in ['chromium', 'webkit', 'firefox']){
            return;
        }
        if (!fs.existsSync(`./results/${datetime}`)){
            fs.mkdirSync(`./results/${datetime}`, { recursive: true });
        }
        //Launch the current browser context
        let cont = 1;
        const browser = await playwright[b].launch({headless: true, viewport: {width:viewportWidth, height:viewportHeight}});
        const context = await browser.newContext();
        const page = await context.newPage(); 
        await page.goto(config.url);
        await new Promise(r => setTimeout(r, 2000));
        await page.type('input[type="email"]', 'jm.pantoja@uniandes.edu.co');    //llenar correo
        await page.type('input[type="password"]', 'Johnny1123309');    //llenar contraseña        
        await page.screenshot({ path: `./results/${datetime}/${cont}G5-${b}.png` });
        await page.click('css=button#ember5')    //Clic en sing in
        await new Promise(r => setTimeout(r, 2000));
        cont += 1;
        await page.screenshot({path:`./results/${datetime}/${cont}G5-${b}.png`})    //Screenshot
        await page.click('css=a[href="#/pages/"]');    //Clic en paginas
        await new Promise(r => setTimeout(r, 2000));
        cont += 1;
        await page.screenshot({path:`./results/${datetime}/${cont}G5-${b}.png`})    //Screenshot


        await page.goto(config.url2);
        cont = 1;
        await page.type('input[type="email"]', 'jm.pantoja@uniandes.edu.co');    //llenar correo
        await page.type('input[type="password"]', 'Johnny1123.');    //llenar contraseña
        await page.screenshot({ path: `./results/${datetime}/${cont}G3-${b}.png` });
        await page.click('#ember12');
        await new Promise(r => setTimeout(r, 2000));
        cont += 1;
        await page.screenshot({path:`./results/${datetime}/${cont}G3-${b}.png`})    //Screenshot
        await page.click('css=a[href="#/pages/"]');    //Clic en paginas
        await new Promise(r => setTimeout(r, 2000));
        cont += 1;
        await page.screenshot({path:`./results/${datetime}/${cont}G3-${b}.png`})    //Screenshot
        await browser.close();
    }
    for(b of browsers){
      if(!b in ['chromium', 'webkit', 'firefox']){
          return;
      }
      if (!fs.existsSync(`./results/${datetime}`)){
          fs.mkdirSync(`./results/${datetime}`, { recursive: true });
      }
      for (var i = 1; i < 4; i++) {
        const data = await compareImages(
            fs.readFileSync(`./results/${datetime}/${i}G5-${b}.png`),
            fs.readFileSync(`./results/${datetime}/${i}G3-${b}.png`),
            options
        );
        resultInfo[b] = {
            isSameDimensions: data.isSameDimensions,
            dimensionDifference: data.dimensionDifference,
            rawMisMatchPercentage: data.rawMisMatchPercentage,
            misMatchPercentage: data.misMatchPercentage,
            diffBounds: data.diffBounds,
            analysisTime: data.analysisTime
        }
        fs.writeFileSync(`./results/${datetime}/compare-${i}-${b}.png`, data.getBuffer());
      }
    }

    

    fs.writeFileSync(`./results/${datetime}/report.html`, createReport(datetime, resultInfo));
    fs.copyFileSync('./index.css', `./results/${datetime}/index.css`);

    console.log('------------------------------------------------------------------------------------')
    console.log("Execution finished. Check the report under the results folder")
    return resultInfo;  
  }
(async ()=>console.log(await executeTest()))();

function browser(b, info){
    return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>Browser: ${b}</h2>
        <p>Data: ${JSON.stringify(info)}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="before-${b}.png" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="after-${b}.png" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="./compare-${b}.png" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`
}

function createReport(datetime, resInfo){
    return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for 
                 <a href="${config.url}"> ${config.url}</a>
            </h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
                ${config.browsers.map(b=>browser(b, resInfo[b]))}
            </div>
        </body>
    </html>`
}