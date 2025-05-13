const { Octokit } = require("@octokit/rest");
const fs = require('fs-extra');
const path = require('path');

const githubToken = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: githubToken });

async function run() {
  try {
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
    const latestRelease = await octokit.repos.getLatestRelease({ owner, repo });

    console.log(`🔧 Updating release notes for release: ${latestRelease.data.name}`);

    const templatePath = path.join(__dirname, '../templates/GitHub Release Notes Template');
    const releaseNotesTemplate = fs.readFileSync(templatePath, 'utf8');

    await octokit.repos.updateRelease({
      owner,
      repo,
      release_id: latestRelease.data.id,
      body: releaseNotesTemplate
    });

    console.log('✅ Release notes updated successfully!');
  } catch (error) {
    console.error(`❌ Failed to update release notes: ${error.message}`);
    process.exit(1);
  }
}

run();
