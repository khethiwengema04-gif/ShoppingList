
import style from './Search.module.css'
import { Text } from '../../Text/Text'
import SearchIcon from '../../assets/SearchIcon.png'

export const Searchbar = () => {
    return (
        <div className={style['search-bar']}>
            <Text varient={'span'} style={{ color: 'rgb(20, 20, 20)', padding: 10 }}>Search</Text>
            <input type='text' className={style['search-input']} />
            {/* onChange={(e) => onSearch(e.target.value)} */}
            <img src={SearchIcon} alt='search icon on search bar' className={style['SearchIcon']} />

        </div>
    )
}
