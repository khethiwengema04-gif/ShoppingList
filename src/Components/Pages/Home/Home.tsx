
import Navbar from '../../Navbar/Navbar'
import { Search } from '../Search/Search'
import CategoryList from '../../CategoryList/CategoryList'
import { Card } from '../../Card/Card'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store'


export const Home = () => {
    const category = useSelector((state: RootState) => state.category)

    return (
        <div>
            <Navbar />
            <Search />
            <CategoryList onDelete={() => { }} onEdit={() => { }} />
            <div>
                {
                    category.category.map((link) => (
                        <Card key={link.id} category={link}
                            onView={() => ({})}
                            onDelete={() => ({})} />
                    ))
                }
            </div>


        </div>
    )
}
