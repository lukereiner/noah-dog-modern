import { render, screen } from '@testing-library/react';
import { WalletDisplay } from '../WalletDisplay';

describe('WalletDisplay', () => {
    test('should display the word "balance" and "wager" in all caps', () => {
        render(<WalletDisplay wallet={1000} wager={100} onWagerChange={() => {}} disabled={false} />);

        expect(screen.getByText(/Balance/)).toBeInTheDocument();
    });

    test('should disable the plus button when balance is less than or equal to wager', () => {
        render(<WalletDisplay wallet={600} wager={700} onWagerChange={() => {}} disabled={false} />);

        const plusButton = screen.getByRole('button', { name: /Increase wager/})

        expect(plusButton).toBeDisabled();
    });

    test('should disable the minus button when wager equals 100', () => {
        render(<WalletDisplay wallet={600} wager={100} onWagerChange={() => {}} disabled={false} />);

        const minusButton = screen.getByRole('button', { name: /Decrease wager/})

        expect(minusButton).toBeDisabled();
    });

})