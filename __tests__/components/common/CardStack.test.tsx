import { render, screen } from '@testing-library/react'
import CardStack from '@/components/common/CardStack'

describe('CardStack', () => {
  const items = ['Item 1', 'Item 2', 'Item 3']

  it('renders all items', () => {
    render(
      <CardStack
        items={items}
        renderItem={(item) => <div>{item}</div>}
      />
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

  it('applies correct stacking offsets', () => {
    const { container } = render(
      <CardStack
        items={items}
        renderItem={(item) => <div>{item}</div>}
      />
    )
    const cards = container.querySelectorAll('div > div')
    expect(cards[0]).toHaveStyle({ transform: 'translateY(0px)' })
    expect(cards[1]).toHaveStyle({ transform: 'translateY(8px)' })
    expect(cards[2]).toHaveStyle({ transform: 'translateY(16px)' })
  })

  it('handles empty array', () => {
    const { container } = render(
      <CardStack items={[]} renderItem={() => <div>Item</div>} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('calls renderItem with correct props', () => {
    const renderItem = jest.fn((item, index) => <div key={index}>{item}</div>)
    render(<CardStack items={items} renderItem={renderItem} />)
    
    expect(renderItem).toHaveBeenCalledTimes(3)
    expect(renderItem).toHaveBeenCalledWith('Item 1', 0)
    expect(renderItem).toHaveBeenCalledWith('Item 2', 1)
    expect(renderItem).toHaveBeenCalledWith('Item 3', 2)
  })
})

