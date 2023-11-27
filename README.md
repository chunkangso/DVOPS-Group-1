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