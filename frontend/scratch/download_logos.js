const fs = require('fs');
const path = require('path');
const https = require('https');

const LOGO_DIR = path.join(__dirname, '..', 'public', 'logo');

// Ensure directory exists
if (!fs.existsSync(LOGO_DIR)) {
  fs.mkdirSync(LOGO_DIR, { recursive: true });
}

const logoUrls = {
  'samsung.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/512px-Samsung_Logo.svg.png',
  'bareanatomy.png': 'https://bareanatomy.in/cdn/shop/files/Bare_Anatomy_Logo_370x.png',
  'zaydn.png': 'https://zaydns.com/cdn/shop/files/ZAYDN_LOGO_BLACK.png',
  'tashhair.png': 'https://tashhair.com/cdn/shop/files/tash-logo-02.png',
  'mamaearth.png': 'https://images.mamaearth.in/wysiwyg/mamaearth-logo.png',
  'fraganote.png': 'https://fraganote.com/cdn/shop/files/Fraganote_Logo_Black.png',
  'glam21.png': 'https://glam21.in/cdn/shop/files/GLAM21_LOGO_BLACK.png',
  'goeye.png': 'https://goeye.in/assets/images/logo.png',
  'ozone.png': 'https://ozoneayurvedics.com/cdn/shop/files/OZONE_Logo_Black_150x.png',
  'recode.png': 'https://recodestudios.com/cdn/shop/files/Recode_Logo_Black_150x.png',
  'aqualite.png': 'https://aqualiteindia.com/assets/images/logo.png',
  'sunscoop.png': 'https://innovist.com/cdn/shop/files/Sunscoop_Logo_370x.png',
  'clayco.png': 'https://clayco.in/cdn/shop/files/ClayCo_Logo_Black_120x.png',
  'perpaa.png': 'https://perpaa.com/cdn/shop/files/Perpaa_Logo_Black_120x.png',
  'funcity.png': 'https://funcity.in/wp-content/uploads/2021/08/funcity-logo.png',
  'manmatters.svg': 'https://manmatters.com/images/logo.svg',
  'skinjuices.png': 'https://theskinjuices.com/cdn/shop/files/TheSkinJuices_Logo_Black_120x.png',
  'carltonlondon.png': 'https://carltonlondon.co.in/cdn/shop/files/Carlton_London_Logo_Black_150x.png',
  'oraiste.png': 'https://oraiste.com/cdn/shop/files/Oraiste_Logo_Black_120x.png',
  'omsons.png': 'https://omsonsbridal.com/wp-content/uploads/2022/08/omsons-logo.png',
  'mattlook.png': 'https://mattlookcosmetics.com/cdn/shop/files/MattLook_Logo_Black_120x.png',
  'uphaar.png': 'https://uphaargifts.com/wp-content/uploads/2023/10/uphaar-logo.png',
  'clementine.png': 'https://clementine.co.in/cdn/shop/files/Clementine_Logo_Black_120x.png',
  'yesmadam.png': 'https://yesmadam.com/assets/images/logo.png',
  'assembly.png': 'https://assemblytravel.com/cdn/shop/files/Assembly_Logo_Black_120x.png',
  'maliao.png': 'https://maliaocosmetics.com/cdn/shop/files/Maliao_Logo_Black_120x.png',
  'beautypeople.png': 'https://beautypeople.in/cdn/shop/files/BeautyPeople_Logo_Black_120x.png',
  'krvy.png': 'https://krvy.in/cdn/shop/files/Krvy_Logo_Black_120x.png',
  'sanfe.png': 'https://sanfe.in/cdn/shop/files/Sanfe_Logo_Black_120x.png',
  'chemistatplay.png': 'https://innovist.com/cdn/shop/files/ChemistAtPlay_Logo_370x.png',
  'velour.png': 'https://velourfragrances.com/cdn/shop/files/Velour_Logo_Black_120x.png',
  'shryoan.png': 'https://shryoan.com/cdn/shop/files/Shryoan_Logo_Black_120x.png',
  'mbm.png': 'https://mbmmakeovers.com/wp-content/uploads/2022/08/mbm-logo.png',
  'freakins.png': 'https://freakins.com/cdn/shop/files/Freakins_Logo_Black_120x.png',
  'lapink.png': 'https://lapink.com.in/cdn/shop/files/LaPink_Logo_Black_120x.png'
};

function download(filename, url) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(LOGO_DIR, filename));
    const request = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }, function(response) {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Handle redirect
        download(filename, response.headers.location).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: status code ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', function() {
        file.close();
        console.log(`Successfully downloaded ${filename}`);
        resolve();
      });
    }).on('error', function(err) {
      fs.unlink(path.join(LOGO_DIR, filename), () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Starting logo downloads...');
  for (const [filename, url] of Object.entries(logoUrls)) {
    try {
      await download(filename, url);
    } catch (err) {
      console.error(`Error downloading ${filename}:`, err.message);
    }
  }
  console.log('All downloads finished.');
}

main();
