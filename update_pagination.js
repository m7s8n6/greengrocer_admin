const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if(file.endsWith('.vue')) results.push(file);
        }
    });
    return results;
}

const files = walk('resources/js/views');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Find all <b-pagination ... > blocks
    const paginationRegex = /<b-pagination([\s\S]*?)>/g;

    const newContent = content.replace(paginationRegex, (match, p1) => {
        let newAttrs = p1;
        
        // 1. align="fill" -> align="right"
        if (newAttrs.includes('align="fill"')) {
            newAttrs = newAttrs.replace(/align="fill"/g, 'align="right"');
        } else if (newAttrs.includes("align='fill'")) {
            newAttrs = newAttrs.replace(/align='fill'/g, 'align="right"');
        } else if (!newAttrs.includes('align=')) {
             newAttrs += ' align="right"';
        }

        // 2. remove size="sm"
        newAttrs = newAttrs.replace(/\s+size="sm"/g, '');
        newAttrs = newAttrs.replace(/\s+size='sm'/g, '');

        // 3. update class
        if (newAttrs.includes('class="')) {
            newAttrs = newAttrs.replace(/class="([^"]*)"/g, (classMatch, classP1) => {
                let classes = classP1.split(' ').filter(c => c !== 'my-0' && c !== 'mb-0' && c !== 'figma-pagination' && c !== 'pagination');
                classes.push('figma-pagination');
                classes.push('mb-0');
                return `class="${classes.join(' ')}"`;
            });
        } else if (newAttrs.includes("class='")) {
            newAttrs = newAttrs.replace(/class='([^']*)'/g, (classMatch, classP1) => {
                let classes = classP1.split(' ').filter(c => c !== 'my-0' && c !== 'mb-0' && c !== 'figma-pagination' && c !== 'pagination');
                classes.push('figma-pagination');
                classes.push('mb-0');
                return `class="${classes.join(' ')}"`;
            });
        } else {
            newAttrs += ' class="figma-pagination mb-0"';
        }
        
        // Ensure no hide-goto-end-buttons if it's there (since app.js handles it), 
        // wait actually let's leave existing attributes.

        return `<b-pagination${newAttrs}>`;
    });

    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated ${file}`);
    }
});
