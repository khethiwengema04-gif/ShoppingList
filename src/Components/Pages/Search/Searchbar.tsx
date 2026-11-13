
import style from './Search.module.css'
import { Text } from '../../Text/Text'
import SearchIcon from '../../../Assets/SearchIcon.png'

type Props = {
    onSearch: (query: string) => void
}

export const Searchbar: React.FC<Props> = ({ onSearch }) => {
    return (
        <div className={style['search-bar']}>
            <Text
                varient={'span'}
                style={{
                    color: 'rgb(20, 20, 20)',
                    padding: 10
                }}
            >
                Search
            </Text>

            <input
                type="text"
                placeholder="Search your categories..."
                aria-label="Search categories"
                onChange={(e) => onSearch(e.target.value)}
                className={style['search-input']}
            />

            <img
                src={SearchIcon}
                alt="Search"
                className={style['SearchIcon']}
            />
        </div>
    )
}
