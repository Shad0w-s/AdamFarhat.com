import { renderHook, act } from '@testing-library/react'
import { useSticky } from '@/hooks/useSticky'

describe('useSticky', () => {
  it('returns false initially', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() => useSticky(ref))
    expect(result.current).toBe(false)
  })

  it('updates sticky state on scroll', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() => useSticky(ref))

    // Mock getBoundingClientRect
    jest.spyOn(ref.current, 'getBoundingClientRect').mockReturnValue({
      top: -10,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
    } as DOMRect)

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe(true)
  })
})

