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
    let resultInfo1 = {}
    let resulta ={}
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

        const data = await compareImages(
            fs.readFileSync(`./results/${datetime}/1G5-${b}.png`),
            fs.readFileSync(`./results/${datetime}/1G3-${b}.png`),
            options
        );
        resultInfo1[b]= {misMatchPercentage: data.misMatchPercentage,}
          var resul = [];
          resul[0]=resultInfo1[b];
          console.log(resul)
        fs.writeFileSync(`./results/${datetime}/compare-1-${b}.png`, data.getBuffer());
    }
    for(b of browsers){
      if(!b in ['chromium', 'webkit', 'firefox']){
          return;
      }
      if (!fs.existsSync(`./results/${datetime}`)){
          fs.mkdirSync(`./results/${datetime}`, { recursive: true });
      }

        const data = await compareImages(
            fs.readFileSync(`./results/${datetime}/2G5-${b}.png`),
            fs.readFileSync(`./results/${datetime}/2G3-${b}.png`),
            options
        );
        resultInfo1[b]= {misMatchPercentage: data.misMatchPercentage,}

        fs.writeFileSync(`./results/${datetime}/compare-2-${b}.png`, data.getBuffer());
    }
    for(b of browsers){
      if(!b in ['chromium', 'webkit', 'firefox']){
          return;
      }
      if (!fs.existsSync(`./results/${datetime}`)){
          fs.mkdirSync(`./results/${datetime}`, { recursive: true });
      }

        const data = await compareImages(
            fs.readFileSync(`./results/${datetime}/3G5-${b}.png`),
            fs.readFileSync(`./results/${datetime}/3G3-${b}.png`),
            options
        );
        resultInfo1[b]= {misMatchPercentage: data.misMatchPercentage,}

        fs.writeFileSync(`./results/${datetime}/compare-3-${b}.png`, data.getBuffer());
    }

    fs.writeFileSync(`./results/${datetime}/report.html`, createReport(datetime, resultInfo1, resul));
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
        <img class="img2" src="1G5-${b}.png" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="1G3-${b}.png" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="./compare-1-${b}.png" id="diffImage" label="Diff">
      </div>
    </div>


    <div class="imgline">
    <div class="imgcontainer">
      <span class="imgname">Reference</span>
      <img class="img2" src="2G5-${b}.png" id="refImage" label="Reference">
    </div>
    <div class="imgcontainer">
      <span class="imgname">Test</span>
      <img class="img2" src="2G3-${b}.png" id="testImage" label="Test">
    </div>
  </div>
  <div class="imgline">
    <div class="imgcontainer">
      <span class="imgname">Diff</span>
      <img class="imgfull" src="./compare-2-${b}.png" id="diffImage" label="Diff">
    </div>
  </div>
    <div class="imgline">
    <div class="imgcontainer">
      <span class="imgname">Reference</span>
      <img class="img2" src="2G5-${b}.png" id="refImage" label="Reference">
    </div>
    <div class="imgcontainer">
      <span class="imgname">Test</span>
      <img class="img2" src="2G3-${b}.png" id="testImage" label="Test">
    </div>
  </div>
  <div class="imgline">
    <div class="imgcontainer">
      <span class="imgname">Diff</span>
      <img class="imgfull" src="./compare-2-${b}.png" id="diffImage" label="Diff">
    </div>
  </div>


  <div class="imgline">
  <div class="imgcontainer">
    <span class="imgname">Reference</span>
    <img class="img2" src="3G5-${b}.png" id="refImage" label="Reference">
  </div>
  <div class="imgcontainer">
    <span class="imgname">Test</span>
    <img class="img2" src="3G3-${b}.png" id="testImage" label="Test">
  </div>
</div>
<div class="imgline">
  <div class="imgcontainer">
    <span class="imgname">Diff</span>
    <img class="imgfull" src="./compare-3-${b}.png" id="diffImage" label="Diff">
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
            <h1>Reporte para comparar la version 5 de Ghost con la version 3 
            <h2>Link de la version 5.46.1 de Ghost 
                 <a href="${config.url}"> ${config.url}</a>
            <h2>Link de la version 3.42 de Ghost 
            <a href="${config.url2}"> ${config.url2}</a>
            </h1>
            <p>Ejecutado: ${datetime}</p>
            <div id="visualizer">
                ${config.browsers.map(b=>browser(b, resInfo[b]))}
            </div>
        </body>
    </html>`
}