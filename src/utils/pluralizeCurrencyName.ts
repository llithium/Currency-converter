export default function pluralizeCurrencyName(
  currencyName: string,
  amount: number,
): string {
  if (amount == 1) {
    return currencyName;
  } else {
    switch (currencyName) {
      case "Australian Dollar":
        return currencyName + "s";
        break;
      case "Bulgarian Lev":
        return currencyName + "a";
        break;
      case "Brazilian Real":
        return currencyName + "s";
        break;
      case "":
        return currencyName + "s";
        break;
      case "Canadian Dollar":
        return currencyName + "s";
        break;
      case "Swiss Franc":
        return currencyName + "s";
        break;
      case "Czech Koruna":
        return currencyName.slice(0, -1) + "y";
        break;
      case "Danish Krone":
        return currencyName + "r";
        break;
      case "Euro":
        return currencyName + "s";
        break;
      case "British Pound":
        return currencyName + "s";
        break;
      case "Hong Kong Dollar":
        return currencyName + "s";
        break;
      case "Hungarian Forint":
        return currencyName + "s";
        break;
      case "Israeli New Sheqel":
        return "Israeli New Sheqalim";
        break;
      case "Indian Rupee":
        return currencyName + "s";
        break;
      case "Icelandic Króna":
        return currencyName.slice(0, -1) + "ur";
        break;
      case "Mexican Peso":
        return currencyName + "s";
        break;
      case "Norwegian Krone":
        return currencyName + "r";
        break;
      case "New Zealand Dollar":
        return currencyName + "s";
        break;
      case "Philippine Peso":
        return currencyName + "s";
        break;
      case "Polish Złoty":
        return currencyName + "ch";
        break;
      case "Romanian Leu":
        return currencyName.slice(0, -1) + "i";
        break;
      case "Swedish Krona":
        return currencyName.slice(0, -1) + "or";
        break;
      case "Singapore Dollar":
        return currencyName + "s";
        break;
      case "Thai Baht":
        return currencyName + "s";
        break;
      case "United States Dollar":
        return currencyName + "s";
        break;
      default:
        return currencyName;
        break;
    }
  }
}
