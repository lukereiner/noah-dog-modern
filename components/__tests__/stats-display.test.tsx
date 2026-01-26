import { render, screen } from '@testing-library/react';
import { StatsDisplay } from '../StatsDisplay';

describe('StatsDisplay', () => {
    test('should display wins and losses correctly', () => {
        render(<StatsDisplay wins={5} losses={3} />);

        // check if the numbers are displayed in the element
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    test('should calculate win rate correctly', () => {
        render(<StatsDisplay wins={7} losses={3} />);

        // 7 wins out of 10 games is 70%
        expect(screen.getByText('70.0%')).toBeInTheDocument();
    });

    test('should show 0.0% win rate when no games have been played', () => {
        render(<StatsDisplay wins={0} losses={0} />);

        expect(screen.getByText('0.0%')).toBeInTheDocument();
    });

    test('should display the correct total number of games played', () => {
        render(<StatsDisplay wins={5} losses={3} />);

        expect(screen.getByText(/8 games played/i)).toBeInTheDocument();
    });

    test('should display "game played" for a single game', () => {
        render(<StatsDisplay wins={1} losses={0} />);

        expect(screen.getByText(/1 game played/i)).toBeInTheDocument();
    });
});