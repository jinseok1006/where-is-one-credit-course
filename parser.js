const cheerio = require('cheerio');
const fs = require('fs');
const fsPromises = require('fs').promises;

const xml = fs.readFileSync('./courses.xml', 'utf-8');
const $ = cheerio.load(xml, { xml: true });

const $courses = $('Rows')
  .find('Row')
  .map((_, e) => $(e));

const mapped = $courses
  .map((_, course) => {
    const type = $(course).find('Col[id=CPTNFGNM]').text();
    const pnt = $(course).find('Col[id=PNT]').text();
    const subject = $(course).find('Col[id=SBJTNM]').text();

    return [[type, subject, parseInt(pnt)]];
  })
  .get();

const filtered = mapped.filter(
  ([type, subject, pnt]) => pnt === 1 && type.match(/^.+(선택)|(필수)$/)
);

async function save() {
  try {
    const file = await fsPromises.open('filtered.csv', 'w+');
    // let buf = Buffer.alloc(1024);
    // await file.read(buf, 0, buf.length, 0);
    file.write('구별,과목,학점\n');

    const writePromises = filtered.map(
      async (e) => await file.write(e.join(',') + '\n', 'utf-8')
    );
    await Promise.all(writePromises);

    await file.close();
  } catch (err) {
    console.log(err);
  }
}

save();
