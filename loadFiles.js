const { writeFile } = require("fs/promises");
const { join } = require("path");
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

(async () => {
    const dataFile = join(process.cwd(), "src", "assets", "fileList.ts");

    const rawArt = await fetch('https://sfo3.digitaloceanspaces.com/naomi-cdn?prefix=rosalia/art');
    const artText = await rawArt.text();
    const artData = await parser.parseStringPromise(artText);
    const art = artData.ListBucketResult.Contents.map(i => i.Key[0].split('/')[2]).filter(el => el);

    const rawGames = await fetch('https://sfo3.digitaloceanspaces.com/naomi-cdn?prefix=rosalia/games');
    const gamesText = await rawGames.text();
    const gamesData = await parser.parseStringPromise(gamesText);
    const games = gamesData.ListBucketResult.Contents.map(i => i.Key[0].split('/')[2]).filter(el => el);

    const rawPoses = await fetch('https://sfo3.digitaloceanspaces.com/naomi-cdn?prefix=rosalia/koikatsu');
    const posesText = await rawPoses.text();
    const posesData = await parser.parseStringPromise(posesText);
    const poses = posesData.ListBucketResult.Contents.map(i => i.Key[0].split('/')[2]).filter(el => el);

    await writeFile(
        dataFile,
        `export const artFiles: string[] = ${JSON.stringify(
            art
        )};\nexport const gamesFiles: string[] = ${JSON.stringify(
            games
        )};\nexport const posesFiles: string[] = ${JSON.stringify(poses)};\n`
    );
})();
