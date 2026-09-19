// Lab 2: Functions, this & Object Modelling — Private Store Account
// ShelfWise customer store-credit account

var outputEl = document.getElementById('output');

function log(message) {
    console.log(message);
    const line = document.createElement('div');
    line.textContent = message;
    outputEl.append(line);
}

function runAccount() {
    log('\n=== Step 4: Private Store Account ===');

    function createAccount(owner, initialBalance) {
        let balance = initialBalance;
        const history = [];

        return {
            getOwner() { return owner; },
            deposit(amount) {
                if (amount <= 0) return false;
                balance += amount;
                history.push({ type: 'deposit', amount, balance });
                return true;
            },
            withdraw(amount) {
                if (amount <= 0 || amount > balance) return false;
                balance -= amount;
                history.push({ type: 'withdrawal', amount, balance });
                return true;
            },
            getBalance() { return balance; },
            getHistory() { return [...history]; }
        };
    }

    const account = createAccount('Anshu', 1000);
    account.deposit(500);
    account.withdraw(200);
    account.deposit(50);

    log(`Owner: ${account.getOwner()}`);
    log(`Balance: $${account.getBalance()}`);
    log(`History: ${JSON.stringify(account.getHistory())}`);

    log(`Direct access account.balance: ${account.balance}`);
    log(`Direct access account.history: ${account.history}`);
    log(`getHistory() returns a copy — mutating it cannot change the account:`);
    account.getHistory().length = 0;
    log(`History after tampering attempt: ${JSON.stringify(account.getHistory())}`);
}