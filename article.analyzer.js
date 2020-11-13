const fs = require('fs');
const crypto = require('crypto');

function getArticleInfo() {
    const Articles = [];
    const dir = { input: './articles/', output: '/articles/' };
    const articleFileNameList = fs.readdirSync(dir.input);

    articleFileNameList.forEach(articleFileName => {
        const readPath = `${dir.input}${articleFileName}`;
        const stat = fs.lstatSync(readPath);

        if (stat.isFile()) {
            const fetchPath = `${dir.output}${articleFileName}`;
            const fileData = fs.readFileSync(readPath, 'utf8');
            const articleHead = fileData.split(/\r?\n/).slice(1, 6), articleInfo = {};
            const hash = crypto.createHash('sha256');

            hash.update(fileData);
            articleHead.forEach(line => {
                const splitIndex = line.indexOf(':');

                articleInfo[line.slice(0, splitIndex)] = line.slice(splitIndex + 1).trim();
            });
            articleInfo.categories = articleInfo.categories.split(/[,;，；]/).map(e => e.trim()).filter(e => e !== '');
            articleInfo.tags = articleInfo.tags.split(/[,;，；]/).map(e => e.trim()).filter(e => e !== '');
            articleInfo.path = fetchPath;
            articleInfo.hash = hash.digest('hex').slice(0, 8);
            Articles.push(articleInfo);
        }
    })
    Articles.sort((pre, next) => new Date(next.date) - new Date(pre.date));
    return JSON.stringify(Articles);
}

module.exports = { getArticleInfo }