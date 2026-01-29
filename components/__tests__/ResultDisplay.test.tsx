import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { ResultDisplay } from "../ResultDisplay";

expect.extend(toHaveNoViolations);

describe('ResultDisplay Accessibility', () => {
    test('should have no accessibility violations when displaying result', async () => {
        const mockResult = { type: 'noah' as const, image: '/noah/noah-1.jpg', outcome: 'win' as const };

        // Render the component with necessary props
        const { container } = render(
            <ResultDisplay result={mockResult} isSpinning={false} />
        );

        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });

    test('should have no accessibility violations when spinning', async () => {
        const { container } = render(
            <ResultDisplay result={null} isSpinning={true} />
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    test('should have descriptive alt text for the image', () => {
        const mockResult = { type: 'noah' as const, image: '/noah/noah-1.jpg', outcome: 'win' as const };
        const { getByRole } = render(
            <ResultDisplay result={mockResult} isSpinning={false} />
        );

        // Find the image element
        const img = getByRole('img');

        // Check that alt text is present and descriptive
        expect(img).toHaveAttribute('alt', 'Noah');
    });

    test('should announce outcome via ARIA live region', async () => {
        const mockResult = { type: 'noah' as const, image: '/noah/noah-1.jpg', outcome: 'win' as const };
        const { getByRole } = render(
            <ResultDisplay result={mockResult} isSpinning={false} />
        );

        // Find the status element (visually hidden)
        const statusElement = getByRole('status');

        // Check that the correct text is present for the 'win' outcome
        expect(statusElement).toHaveTextContent('GOT THAT DOG!');
    });
});