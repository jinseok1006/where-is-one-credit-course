const axios = require('axios').default;
const fs = require('fs');
require('dotenv').config();

const payload = `<?xml version="1.0" encoding="UTF-8"?>
<Root xmlns="http://www.nexacroplatform.com/platform/dataset">
	<Parameters>
		<Parameter id="JSESSIONID" />
		<Parameter id="gvYy">2017</Parameter>
		<Parameter id="gvShtm">U211600010</Parameter>
		<Parameter id="gvRechPrjtNo" />
		<Parameter id="gvRechDutyr" />
		<Parameter id="_fwb">128nbqn4MdanRitUOwx39B8.1703297565257</Parameter>
		<Parameter id="_ga">GA1.1.1779274746.1703298581</Parameter>
		<Parameter id="_ga_FBDVPJE94W">GS1.1.1703298580.1.1.1703299048.60.0.0</Parameter>
		<Parameter id="WMONID">mP7KVtuukkd</Parameter>
		<Parameter id="JSESSIONIDSSO">S1UJ4Af1YA6RUa3y1mcP6x9AVnvNzyN4PHlTKJHgTOHZxP9DnY6eyndivCpVUhwN.amV1c19kb21haW4vc2VydmVyNV8z</Parameter>
		<Parameter id="yy">2023</Parameter>
		<Parameter id="shtm">U211600020</Parameter>
		<Parameter id="fg" />
		<Parameter id="value1" />
		<Parameter id="value2" />
		<Parameter id="value3" />
		<Parameter id="sbjtNm" />
		<Parameter id="profNm" />
		<Parameter id="openLectFg" />
		<Parameter id="sType">EXT1</Parameter>
	</Parameters>
</Root>`;

const headers = {
  'Content-Type': 'text/xml',
  'X-Requested-With': 'XMLHttpRequest',
};

async function main() {
  const resp = await axios.post(process.env.REQ_URL, payload, { headers });

  fs.writeFileSync('./courses.xml', resp.data);
}

main();
