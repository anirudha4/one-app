export const prepareDataForWalletAdjustmentTransaction = (
    previousAmount,
    newAmount,
    walletId,
    categoryId,
    date,
    description
) => {
    const amount = previousAmount - newAmount;
    const type = amount > 0 ? 'income' : 'expense';
}