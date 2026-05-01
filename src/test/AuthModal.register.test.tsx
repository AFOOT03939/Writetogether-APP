import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StoryCard from '../features/stories/components/storyCard';
import { describe, test, expect, vi } from 'vitest';

vi.mock('../features/stories/api/story.api', () => ({
  getFragments: vi.fn(() => Promise.resolve([])),
  getUser: vi.fn(() => Promise.resolve({
    userId: 1,
    userName: 'Victor'
  })),
  createFragment: vi.fn(() => Promise.resolve({
    fragmentId: 123
  })),
  updateFragment: vi.fn(),
  deleteFragment: vi.fn()
}));

vi.mock('react-router-dom', () => ({
  useParams: () => ({ storyId: '1' })
}));

describe('StoryCard Fragment', () => {

  test('crea un fragmento correctamente', async () => {

    render(<StoryCard isFinished={false} role="creator" isCreator={true} />);

    await waitFor(() => {
      expect(screen.getByText('Write next fragment')).toBeTruthy();
    });

    await new Promise(r => setTimeout(r, 100));

    fireEvent.change(screen.getByPlaceholderText('Type your text here...'), {
      target: { value: 'Fragmento de prueba IA' }
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Fragmento de prueba IA')).toBeTruthy();
    });

  });

});