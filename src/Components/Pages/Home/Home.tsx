
import Navbar from '../../Navbar/Navbar'
import { Search } from '../Search/Search'
import CategoryList from '../../CategoryList/CategoryList'
import { Card } from '../../Card/Card'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store'
import type { AppDispatch } from '../../../store'
import { useDispatch } from 'react-redux'
import { deleteCategory, getCategory } from '../../../Features/category'
import { editCategory } from '../../../Features/category'
import { useEffect } from 'react'


export const Home = () => {
    const category = useSelector((state: RootState) => state.category)
    const dispatch = useDispatch<AppDispatch>();
    const userId = useSelector((state: RootState) => state.login.user?.id ? String(state.login.user.id) : "");

    let User = useSelector((state: RootState) => state.login.user);
    if (!User) {
        const savedUser = localStorage.getItem('user');
        if (savedUser) User = JSON.parse(savedUser);
    }

    //    const userId = User?.id ? String(User.id) : "";

    useEffect(() => {
        if (userId.trim() !== '') {
            dispatch(getCategory(userId));
        }
    }, [dispatch, userId]);

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
