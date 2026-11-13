
import Navbar from '../../Navbar/Navbar'
import { Search } from '../Search/Search'
import CategoryList from '../../CategoryList/CategoryList'
import { Card } from '../../Card/Card'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../../../store'
import { deleteCategory, getCategory } from '../../../Features/category'
import { getAllUserItemsThunk } from '../../../Features/List'
import { useEffect, useState } from 'react'
import styles from './Home.module.css'

export const Home = () => {
    const category = useSelector((state: RootState) => state.category)

    const allUserItems = useSelector(
        (state: RootState) => state.list.allUserItems || []
    )

    const dispatch = useDispatch<AppDispatch>()

    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('')

    const reduxUser = useSelector((state: RootState) => state.login.user)

    let savedUser = null

    try {
        const storedUser = localStorage.getItem('user')
        savedUser = storedUser ? JSON.parse(storedUser) : null
    } catch {
        savedUser = null
    }

    const currentUser = reduxUser || savedUser
    const userId = currentUser?.id ? String(currentUser.id) : ''

    useEffect(() => {
        if (userId.trim() !== '') {
            dispatch(getCategory(userId))
            dispatch(getAllUserItemsThunk(userId))
        }
    }, [dispatch, userId])

    // Search categories
    const filteredCategories = category.category.filter((link) =>
        link.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    )

    // Sort categories alphabetically
    const sortedCategories = [...filteredCategories].sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name)
        }

        return 0
    })

    return (
        <div className={styles.home}>
            <Navbar />

            <Search onSearch={setSearchQuery} />

            <CategoryList
                onDelete={() => { }}
                onEdit={() => { }}
                onSort={setSortBy}
            />

            <div className={styles.cardContainer}>
                {sortedCategories.length > 0 ? (
                    sortedCategories.map((link) => {

                        const itemCount = allUserItems.filter(
                            (item) => item.listId === String(link.id)
                        ).length

                        return (
                            <Card
                                key={link.id}
                                category={link}
                                itemCount={itemCount}
                                onView={() => ({})}
                                onShare={() => ({})}
                                onDelete={() => {
                                    if (link.id) {
                                        dispatch(deleteCategory(link.id))
                                    }
                                }}
                            />
                        )
                    })
                ) : (
                    <p>
                        {searchQuery.trim()
                            ? `No categories found for "${searchQuery}".`
                            : 'You have no categories yet.'}
                    </p>
                )}
            </div>
        </div>
    )
}
