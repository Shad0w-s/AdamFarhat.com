import { renderHook, act } from '@testing-library/react'
import { useTilt } from '@/hooks/useTilt'

describe('useTilt', () => {
  it('returns initial style', () => {
    const { result } = renderHook(() => useTilt())
    expect(result.current.style).toEqual({})
  })

  it('resets style on mouse leave', () => {
    const { result } = renderHook(() => useTilt())
    
    act(() => {
      result.current.onMouseLeave()
    })

    expect(result.current.style).toEqual({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'all 0.5s ease',
    })
  })
})

