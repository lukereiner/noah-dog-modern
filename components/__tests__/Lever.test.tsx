import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Lever } from '../Lever';

describe('Lever', () => {
    test('lever should be disabled while spinning', async () => {
        let isSpinning = false;
        const leverSpin = () => {isSpinning = true}

        render(<Lever onClick={leverSpin} disabled={isSpinning} isSpinning={isSpinning} />)

        const user = userEvent.setup();

        const leverUI = screen.getByRole('button', {name: /Pull lever to spin/})

        await user.click(leverUI);

        expect(isSpinning).toBe(true);
    });
});