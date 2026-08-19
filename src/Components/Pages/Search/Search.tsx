import React from 'react'
//  import ContentContainer  from './ContentContainer'
import style from './Search.module.css'
import { Searchbar } from './Searchbar'

export const Search = () => {
    return (
        <div className={style['search-container']}>

            <Searchbar />

        </div>
    )
}
