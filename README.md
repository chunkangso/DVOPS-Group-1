# DVOPS Y2S2 Project [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
**Group Members:** So Chun Kang, Swan Htet Aung, Mahaliyanage Abhishek Thisun Devaka

## Commitizen Usage

Now that Commitizen is set up, you can use it to create commit messages for standardization purposes. Instead of using `git commit -m <comment>`, run:

```bash
npm run commit
```

Otherwise, stick with using your default:

```bash
git commit -m <comment>
```

For any issues, please contact Chun Kang regarding bugs/errors.


## Commit Message Creation

Commitizen will prompt you to fill in the necessary details for your commit message. Follow the prompts to create a commit message adhering to the conventional format.

### Unstable Automatic Commitizen Execution with Husky

Husky should have already been installed, Commitizen will seamlessly run when you use `git commit` but this feature is still in development and is rather unstable, please refrain from using it. It works but still launches the vim text editor which would cause an error.

### How to get out if you accidentally ran `git commit`:

Press 'Esc' and type `:wq` then press 'Enter'.

## Backend Functions

Backend functions have been developed and tested with test cases satisfying the overall code coverage of at least 90%.

- Login
- Register
- View Transactions
- Add Income
- Edit Income
- Delete Income
- Add Expense
- Edit Expense
- Delete Expense

## CI/CD Functions

Jenkins is the one hosting all of the unit testing, Docker, Azure CLI, Terraform, Kubernetes and Monitoring and Logging related functions.

Jenkins Email Plugin has been implemented to help notifiy developers about failed builds allowing them to promptly take a look and resolve the issue.

## Notes to ensure Jenkins builds running correctly

Startup Jenkins by visiting `localhost:8080` on your browser. Key in the initialAdminPassword as per the instructions and access the build.

When runnning `npm test`, ensure that server is running in another terminal via `node index.js`.

When running builds in Jenkins, ensure that Docker is running properly on your device, and make sure to <span style="color:red; font-weight:bold;">terminate all running applications</span>
 on port `5050` eg. `node index.js` terminal running the demo project.

Ensure that <span style="color:red; font-weight:bold;">code coverage</span> is at least `80%` for all test cases. There should be no test cases being tested via `npm test` that is failing, due to my configurations, any test case failing would result in the build failing.

To allow running Cypress spec files automating on Jenkins, this command might be required to be ran in order to allow it to happen:

```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Run this command again to set it back to the default settings for security reasons when you're no longer using it:

```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Restricted
```

## Cypress

To run `Cypress` to test my test file, run:

```bash
npx cypress run --headed --spec cypress\e2e\incomeTest.cy.js --browser chrome
```

Or run it manually through the `Cypress application` and selecting `E2E` then running the `spec file` manually:

```bash
npx cypress open
```