// Artifact Manager for RocketLang
// Date: May 5, 2025
const fs = require('fs');
const { execSync } = require('child_process');

function createArtifact(type, name, content) {
    const path = type === 'collateral' ? `C:/CodeRocket/ip_collateral/${name}.md` : `C:/CodeRocket/docs/${name}.md`;
    fs.writeFileSync(path, content);
    console.log(`Created ${type} ${name} at ${path}`);
    commitChanges(`Created ${type} ${name}`);
}

function updateArtifact(type, name, content) {
    const path = type === 'collateral' ? `C:/CodeRocket/ip_collateral/${name}.md` : `C:/CodeRocket/docs/${name}.md`;
    fs.appendFileSync(path, `\n${content}`);
    console.log(`Updated ${type} ${name} at ${path}`);
    commitChanges(`Updated ${type} ${name}`);
}

function commitChanges(message) {
    try {
        execSync('cd C:/CodeRocket && git add . && git commit -m "' + message + '" && git push', { stdio: 'inherit' });
        console.log(`Committed changes to GitHub: ${message}`);
    } catch (error) {
        console.log(`Error committing changes: ${error.message}`);
    }
}

module.exports = { createArtifact, updateArtifact };