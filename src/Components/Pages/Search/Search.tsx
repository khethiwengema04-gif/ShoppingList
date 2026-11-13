
import style from './Search.module.css'
import { Searchbar } from './Searchbar'

type Props = {
    onSearch: (query: string) => void
}

export const Search: React.FC<Props> = ({ onSearch }) => {
    return (
        <div className={style['search-container']}>
            <div className={style['searchbar-container']}>
                <Searchbar onSearch={onSearch} />
            </div>
        </div>
    )
}
