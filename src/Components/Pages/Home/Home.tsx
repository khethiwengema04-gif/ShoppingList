
import Navbar from '../../Navbar/Navbar'
import { Search } from '../Search/Search'
import CategoryList from '../../CategoryList/CategoryList'

export const Home = () => {
    return (
        <div>
            <Navbar />
            <Search />
            <CategoryList onDelete={() => { }} onEdit={() => { }} />

        </div>
    )
}
