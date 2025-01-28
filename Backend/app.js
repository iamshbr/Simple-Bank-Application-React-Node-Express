import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { accounts as users, setAccounts as setUsers } from "./users.js";

const envFile = dotenv.config({ path: ".env" });

const app = express();
app.use(express.json());
app.use(
  session({
    secret: "88881212", // Use a strong, secure key in production
    resave: false,
    saveUninitialized: true,
  })
);

const port = process.env.PORT;

app.listen(port || 3000, () => {
  console.log(`Server is running on ${port} port`);
});

app.get("/api/isLoggedIn", function (req, res) {
  if (req.session && req.session.user) {
    res.json(req.session.user);
  } else {
    res.json({});
  }
});

app.post("/api/login", function (req, res) {
  const currentUser = users.find((user) => user.username === req.body.username);
  if (currentUser) {
    calculateBalanceAndStore(req, req.body.username);
    bcrypt.compare(String(req.body.password), currentUser.pin, function (err, result) {
      req.session.user = currentUser;
      res.json(result ? currentUser : {});
    });
  } else {
    res.json({});
  }
});

app.post("/api/logout", function (req, res) {
  req.session.destroy();
  res.status(200).send("Logout Successful");
});

app.post("/api/transfer", function (req, res) {
  const { receiver, amount, currentUser: currentUsername } = req.body;
  const currentUser = users.find((user) => user.username === currentUsername);
  const receiverAccount = users.find((user) => user.username === receiver);
  if (receiverAccount && receiverAccount.balance > 0 && currentUser.balance >= Number(amount)) {
    receiverAccount.transactions.push(Number(amount));
    receiverAccount.transactionDates.push(new Date().toISOString());
    currentUser.transactions.push(-Number(amount));
    currentUser.transactionDates.push(new Date().toISOString());
    calculateBalanceAndStore(req, currentUsername);
    res.json(currentUser);
  } else {
    if (!receiverAccount) {
      res.status(500).send("No User Found!");
    } else {
      res.status(500).send("Insufficient Balance!");
    }
  }
});

app.post("/api/loan", function (req, res) {
  const { amount, currentUsername } = req.body;
  const currentUser = users.find((user) => user.username === currentUsername);
  if (amount > 0 && currentUser.transactions.some((trans) => trans >= amount * currentUser.interestRate)) {
    currentUser.transactions.push(Number(amount));
    currentUser.transactionDates.push(new Date().toISOString());
    calculateBalanceAndStore(req, currentUsername);
    res.json(currentUser);
  }
});

app.post("/api/accountClose", function (req, res) {
  const accountClosingUser = users.find((user) => user.username === req.body.username);

  if (accountClosingUser && accountClosingUser.username !== req.session.user.username) {
    res.statusMessage = "You cannot delete other accounts!";
    res.status(200).send(false);
  } else {
    if (accountClosingUser) {
      bcrypt.compare(String(req.body.password), accountClosingUser.pin, function (err, result) {
        if (result) {
          const newUsers = users.filter((acc) => acc.username !== accountClosingUser.username);
          setUsers(newUsers);
          console.log(newUsers);
        }
        res.statusMessage = "Account is successfully closed!";
        res.status(200).send(true);
      });
    } else {
      res.statusMessage = "User does not exist!";
      res.status(200).send(false);
    }
  }
});

app.post("/api/sort", function (req, res) {
  const { sort, currentUsername } = req.body;
  let currentUser;
  if (sort) {
    currentUser = { ...users.find((user) => user.username === currentUsername) };
    const arr = currentUser.transactions.map((trans, index) => [trans, currentUser.transactionDates[index]]).sort((a, b) => b[0] - a[0]);
    currentUser.transactions = arr.map((val) => val[0]);
    currentUser.transactionDates = arr.map((val) => val[1]);
  } else {
    currentUser = users.find((user) => user.username === currentUsername);
  }
  res.json(currentUser);
});

const calculateBalanceAndStore = function (req, currentUsername) {
  const newUsers = users.map((user) => {
    user.balance = user.transactions.reduce((acc, cur) => acc + cur, 0);
    return user;
  });

  req.session.user = newUsers.find((user) => user.username === currentUsername);
  setUsers(newUsers);
};
