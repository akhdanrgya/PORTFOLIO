const fs = require('fs');
const https = require('https');

const urls = {
  about: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2MwMjljOWI2MjBhOTRhMmRiNTg4NzQwYTM3ZjU2OTliEgsSBxCupKOw8hgYAZIBIwoKcHJvamVjdF9pZBIVQhM2NzQyOTAyNTc2NjM1NjU2OTUx&filename=&opi=89354086',
  skills: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzg0NmVmODhhNTY1MTQ2OTU5ZTdhZTNiNTY5YWEzZWY4EgsSBxCupKOw8hgYAZIBIwoKcHJvamVjdF9pZBIVQhM2NzQyOTAyNTc2NjM1NjU2OTUx&filename=&opi=89354086',
  projects: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzJmNDNhOGRiMmNlMzQ0ODRhMmYyYTRlYmJlYjg1YjY2EgsSBxCupKOw8hgYAZIBIwoKcHJvamVjdF9pZBIVQhM2NzQyOTAyNTc2NjM1NjU2OTUx&filename=&opi=89354086',
  contact: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzE5OTZlNTllMzEzNzQxYmNiZjQwMzMxNmI2MzUzZTE2EgsSBxCupKOw8hgYAZIBIwoKcHJvamVjdF9pZBIVQhM2NzQyOTAyNTc2NjM1NjU2OTUx&filename=&opi=89354086'
};

Object.entries(urls).forEach(([name, url]) => {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => fs.writeFileSync(`stitch_${name}.html`, data));
  });
});
console.log('Downloading...');
