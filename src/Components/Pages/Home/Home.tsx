
import Navbar from '../../Navbar/Navbar'
import { Search } from '../Search/Search'
import CategoryList from '../../CategoryList/CategoryList'
import { Card } from '../../Card/Card'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store'
import type { AppDispatch } from '../../../store'
import { useDispatch } from 'react-redux'
import { deleteCategory } from '../../../Features/category'
import { editCategory } from '../../../Features/category'


export const Home = () => {
    const category = useSelector((state: RootState) => state.category)
    const dispatch = useDispatch<AppDispatch>();
    const handleSearch = (query: string) => {
        console.log("User searched for:", query);
    };
    return (
        <div>
            <Navbar />
            <Search onSearch={handleSearch} />
            <CategoryList onDelete={() => { }} onEdit={() => { }} />
            <div>
                {
                    category.category.map((link) => (
                        <Card key={link.id}
                            category={link}
                            onView={() => ({})}
                            onShare={() => ({})}
                            onDelete={() => {
                                if (link.id) dispatch(deleteCategory(link.id))
                            }} />
                    ))
                }
            </div>


        </div>
    )
}
