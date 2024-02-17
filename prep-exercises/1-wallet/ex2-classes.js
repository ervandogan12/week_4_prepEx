import eurosFormatter from "./euroFormatter.js";

class Wallet {
  #name;
  #cash;
  #dailyAllowance = 40;
  #dayTotalWithdrawals = 0;

  constructor(name, cash,dailyAllowance, dayTotalWithdrawals) {
    this.#name = name;
    this.#cash = cash;
    this.#dailyAllowance=dailyAllowance;
    this.#dayTotalWithdrawals=dayTotalWithdrawals
  }

  get name() {
    return this.#name;
  }

  deposit(amount) {
    this.#cash += amount;
  }

  withdraw(amount) {
    if (this.#cash - amount < 0) {
      console.log(`Insufficient funds!`);
      return 0;
    }

    this.#cash -= amount;
    return amount;
  }

  transferInto(wallet, amount) {
    console.log(
      `Transferring ${eurosFormatter.format(amount)} from ${this.name} to ${
        wallet.name
      }`
    );
    const withdrawnAmount = this.withdraw(amount);
    wallet.deposit(withdrawnAmount);
  }

  reportBalance() {
    console.log(
      `Name: ${this.name}, balance: ${eurosFormatter.format(this.#cash)}`
    );
  }

  setDailyAllowance(newAllowance) {
    this.#dailyAllowance = newAllowance;
    console.log(
      `Daily allowance set to: ${eurosFormatter.format(newAllowance)}`
    );
  }

  resetDailyAllowance() {
    this.#dayTotalWithdrawals = 0;
  }
}

function main() {
  const walletJack = new Wallet("Jack", 100);
  const walletJoe = new Wallet("Joe", 10);
  const walletJane = new Wallet("Jane", 20);

  walletJack.transferInto(walletJoe, 50);
  walletJack.setDailyAllowance(80);
  walletJane.transferInto(walletJoe, 25);

  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();
}

main();
