// import { motion } from 'framer-motion'
// import { useState } from 'react'
// import './Pagination.css'


// const Pagination = ({ page, setPage, totalPages }) => {

//     const [input, setInput] = useState(1)

//     const nextPage = () => {
//         setInput(parseInt(input) + 1)
//         setPage(parseInt(page) + 1)
//     }

//     const previousPage = () => {
//         setInput(parseInt(input) - 1)
//         setPage(parseInt(page) - 1)
//     }

//     const onkeyDown = (e) => {
//         if (e.keyCode === 13) {
//             const value = Number(e.target.value.trim());
//             if (
//                 isNaN(value) ||
//                 value < 1 ||
//                 value > Math.ceil(totalPages)
//             ) {
//                 setPage(1);
//                 setInput(1);
//             } else {
//                 setPage(value);
//                 setInput(value);
//             }
//         }
//     };

//     const onChange = (e) => {
//         setInput(e.target.value);
//     };


//     return (
//         <div className='pagination__container'>
//             <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 disabled={!page || isNaN(page) || page <= 1}
//                 onClick={previousPage}><i className='bx bx-left-arrow-alt'></i></motion.button>
//             <input
//                 onChange={(e) => onChange(e)}
//                 onKeyDown={(e) => onkeyDown(e)}
//                 name='page'
//                 autoComplete='off'
//                 value={input} />
//             <p>de {totalPages}</p>
//             <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 disabled={page == Math.ceil(totalPages) || page > totalPages}
//                 onClick={nextPage}><i className='bx bx-right-arrow-alt' ></i></motion.button>
//         </div>
//     )
// }

// export default Pagination

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import './Pagination.css'

const Pagination = ({ page, setPage, totalPages }) => {
    const [input, setInput] = useState(page.toString())

    const nextPage = () => {
        const newPage = Math.min(page + 1, totalPages)
        setInput(newPage.toString())
        setPage(newPage)
    }

    const previousPage = () => {
        const newPage = Math.max(page - 1, 1)
        setInput(newPage.toString())
        setPage(newPage)
    }

    const onkeyDown = (e) => {
        if (e.keyCode === 13) {
            const value = Number(e.target.value.trim())
            if (isNaN(value) || value < 1 || value > totalPages) {
                setPage(1)
                setInput('1')
            } else {
                setPage(value)
                setInput(value.toString())
            }
        }
    }

    const onChange = (e) => {
        setInput(e.target.value)
    }

    useEffect(() => {
        setInput(page.toString())
    }, [page])

    return (
        <div className='pagination__container'>
            <motion.button
                whileHover={{ scale: 1.1 }}
                disabled={page <= 1}
                onClick={previousPage}>
                <i className='bx bx-left-arrow-alt'></i>
            </motion.button>

            <input
                onChange={onChange}
                onKeyDown={onkeyDown}
                name='page'
                autoComplete='off'
                value={input}
            />
            <p>de {totalPages}</p>
            <motion.button
                whileHover={{ scale: 1.1 }}
                disabled={page >= totalPages}
                onClick={nextPage}
            >
                <i className='bx bx-right-arrow-alt'></i>
            </motion.button>
        </div>
    )
}

export default Pagination
