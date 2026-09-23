import { useSelector } from 'react-redux'
import { coloresClaro, coloresOscuro } from '../../global/colors'

export const useColors = () => {
    const isDark = useSelector(state => state.themeReducer.value.isDark)
    return isDark ? coloresOscuro : coloresClaro
}
