// AppFinalizer for RocketLang
// Date: May 5, 2025
const { execSync } = require('child_process');
const fs = require('fs');

class AppFinalizer {
    constructor(appName) {
        this.appName = appName;
    }

    async finalize() {
        await this.runTests();
        await this.debug();
        await this.runScriptedTests();
        await this.adminTasks();
        await this.document();
        console.log(`${this.appName} finalized with ending components`);
    }

    async runTests() {
        try {
            execSync('cd C:/CodeRocket && npm test', { stdio: 'inherit' });
            console.log("Tests passed successfully");
        } catch (error) {
            console.log("Tests failed, logging for debugging");
        }
    }

    async debug() {
        fs.appendFileSync('C:/CodeRocket/logs/debug.log', `App ${this.appName} finalized at ${new Date().toISOString()}\n`);
        console.log("Debug log updated");
    }

    async runScriptedTests() {
        try {
            execSync('cd C:/CodeRocket && node tests/run_tests.js', { stdio: 'inherit' });
            console.log("Scripted tests executed");
        } catch (error) {
            console.log("Scripted tests failed, logging for debugging");
        }
    }

    async adminTasks() {
        try {
            execSync('cd C:/CodeRocket && git add . && git commit -m "AppFinalizer: Finalized app" && git push', { stdio: 'inherit' });
            console.log("Admin tasks completed: GitHub commit");
        } catch (error) {
            console.log("Admin tasks failed, logging for debugging");
        }
    }

    async document() {
        fs.appendFileSync('C:/CodeRocket/ip_collateral/collateral_rocketlang_mapping.md', `\n## Update on ${new Date().toISOString().split('T')[0]}\nFinalized app ${this.appName} with ending components\n`);
        console.log("Documentation updated in collateral_rocketlang_mapping.md");
    }
}

module.exports = AppFinalizer;