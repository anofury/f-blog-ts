const fs = require('fs');

const argvs = process.argv;
const zfill = (number, len = 2, prefix = '0') => {
    const str = number + '';
    if (str.length >= len)
        return str;
    else
        return Array.apply(null, Array(len - str.length + 1)).join(prefix) + str;
};

if (argvs.length < 3)
    console.error('Error: 请输入文件名.\n');
else {
    const title = argvs[2], description = argvs[3], now = new Date();
    const date = `${now.getFullYear()}-${zfill(now.getMonth() + 1)}-${zfill(now.getDate())} ${zfill(now.getHours())}:${zfill(now.getMinutes())}:${zfill(now.getSeconds())}`;
    const fileName = `./articles/${title}.md`;
    const mdHead = `---\ntitle: ${title}\ndescription: ${description || title}\ndate: ${date}\ncategories: \ntags: \n---\n\n# ${title}\n`;

    fs.access(fileName, fs.constants.F_OK, err => {
        if (!err) {
            console.error(`Error: 文件 "${fileName}" 已经存在.\n`)
        }
        else {
            fs.writeFile(fileName, mdHead, 'utf8', err => {
                if (err) throw err
                else console.log(`Success: "${fileName}" 文件创建成功.\n`)
            })
        }
    })
}